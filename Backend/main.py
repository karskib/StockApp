from fastapi import FastAPI
import pandas as pd
import psycopg2
from fastapi.middleware.cors import CORSMiddleware
import json
connection = psycopg2.connect(user="postgres",
                                  password="password",
                                  host="127.0.0.1",
                                  port="5432",
                                  database="stock-db")

def get_stock_data(ticker):
    df = pd.read_sql(f"""SELECT b."Ticker", b."record_date", b."Close", a."Industry", a."Sector"
	FROM "stock-data".basic_info a
	join "stock-data".stocks_data b
	on a."Symbol" = b."Ticker"
    where b."Ticker" = '{ticker}'""",connection)

    df['record_date'] = df["record_date"].astype(str)
    temp  = df.to_json(orient='records')
    parsed = json.loads(temp)
    return parsed

print(get_stock_data('AAPL'))
app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/stock_data/{ticker_code}")
async def get_stock(ticker_code:str):
    return get_stock_data(ticker = ticker_code)

