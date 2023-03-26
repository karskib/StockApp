# 
FROM python:3.9

WORKDIR /

COPY ./requirements.txt /app/requirements.txt

RUN pip install -r /app/requirements.txt

COPY ./Backend /app

CMD ["uvicorn", "app.main:app","--host","0.0.0.0","--port","80"]