import React, { useMemo, useRef, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import { ReactTabulator } from "react-tabulator";
import "tabulator-tables/dist/css/tabulator.min.css";
import { useDispatch, useSelector } from "react-redux";
import { selectRow } from "../../store/rowStore";

const getData = (ticker) => {
  return fetch(`http://127.0.0.1:8000/stock_data/${ticker.toUpperCase()}`).then(
    (response) => response.json()
  );
};

export default function MainContent() {
  const [data, setData] = useState();
  const [selectedRow, setSelectedRow] = useState();
  const dispatch = useDispatch();
  const test = useSelector((state) => state.selectedRow);
  const actualState = useSelector((state) => state);
  const onRowClick = (e, row) => {
    const rowObj = Object.assign({}, row.getData());
    dispatch(selectRow(rowObj));
  };

  console.log(test);
  const columns = [
    { title: "Ticker", field: "Ticker" },
    { title: "Date", field: "record_date" },
    { title: "Closing Price", field: "Close" },
    { title: "Industry", field: "Industry" },
    { title: "Sector", field: "Sector" },
  ];

  useEffect(() => {
    getData("AAPL").then((data) => setData(data));
  }, []);

  return (
    <div className="main-content">
      <input placeholder="insert ticker"></input>
      <div style={{ height: "500px", width: "300px", overflow: "auto" }}>
        {data && (
          <div>
            <ReactTabulator
              height={"300px"}
              data={data}
              columns={columns}
              layout={"fitData"}
              events={{
                rowClick: onRowClick,
              }}
            />
          </div>
        )}
      </div>
      <div>
        {selectedRow &&
          Object.entries(selectedRow).map(([k, v]) => {
            return (
              <div key={Math.random}>
                <span>{k}</span> <span>{v}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
