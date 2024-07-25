import React, { useState, useEffect } from "react";
import "./App.css";
import Pagination from "./pagination";
import RawDataFromJson from "./sampledata.json"

const staticNumbers = [3, 5, 9, 1, 4, 7, 2, 8, 6, 0];
const App = () => {
  const [columnHeader, setColumnHeader] = useState("");
  const [rawData, setRawData] = useState(RawDataFromJson);
  const [rowHeader, setRowHeader] = useState("");
  const [rowHeaderOptions, setRowHeaderOptions] = useState([]);

  const [counter, setCounter] = useState(1);
  const [showparPage, setShowparPage] = useState(10);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showparPage,
  });
  const options = ["Status", "Priority", "Assigned Employees"];

  useEffect(() => {
    const value = showparPage * counter;
    paginationChange(value - showparPage, value);
    console.log("pagination values", value - showparPage, value);
  }, [counter, showparPage]);

  const randomIndex = Math.floor(Math.random() * staticNumbers.length);


  const paginationChange = (a, b) => {
    setPagination({ start: a, end: b });
  };

  const showPerPageHandler = (val) => {
    console.log("getting value in show per page", val);
    setShowparPage(val);
  };



  const handleColumnHeaderChange = (e) => {
    const selectedOption = e.target.value;
    setColumnHeader(selectedOption);
    setRowHeader("");
    setRowHeaderOptions(options.filter((option) => option !== selectedOption));
  };

  const handleRowHeaderChange = (e) => {
    setRowHeader(e.target.value);
  };

  const getDataArray = (type) => {
    switch (type) {
      case "Status":
        return rawData.statuses;
      case "Priority":
        return rawData.priorities;
      case "Assigned Employees":
        return rawData.employees;
      default:
        return [];
    }
  };

  const columnData = getDataArray(columnHeader);
  const rowData = getDataArray(rowHeader);

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  return (
    <>
      <div className="App">
        <div className="header">
          <label>Column Headers:</label>
          <select value={columnHeader} onChange={handleColumnHeaderChange}>
            <option value="" disabled>
              Select Column Header
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
  
          <label>Row Headers:</label>
          <select value={rowHeader} onChange={handleRowHeaderChange}>
            <option value="" disabled>
              Select Row Header
            </option>
            {rowHeaderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
  
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>{rowHeader}</th>
                {columnData.map((col) => (
                  <th key={col.id}>{col.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowData.length > 0 ? (
                rowData
                  .slice(pagination.start, pagination.end)
                  .map((row, index) => (
                    <tr key={row.id}>
                      <td className="row-header">{row.name}</td>
                      {columnData.map((col) => (
                        <td key={col.id}>{row.value}</td>
                      ))}
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={columnData.length + 1} className="no-data">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mainpaginationBox">
          <Pagination
            showparPage={showparPage}
            paginationChange={paginationChange}
            total={rowData.length}
            counter={counter}
            setCounter={setCounter}
            showPerPageHandler={showPerPageHandler}
          />
        </div>
      </div>
    </>
  );
};

export default App;
