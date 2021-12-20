import React, { useState } from "react";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import * as XLSX from "xlsx";

const Home = () => {
  const [data, setData] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((data) => setData(data));
  };

  return (
    <section className="py-4 container">
      <div className="row justify-content-center">
        <div className="row col-4">
          <ReactHtmlTableToExcel
            className="btn btn-success mb-3"
            table="table"
            filename="Emp Excel file"
            sheet="sheet"
            buttonText="Export to Excel"
          />

          <input
            onChange={(e) => {
              const file = e.target.files[0];
              readExcel(file);
            }}
            className="btn btn-light"
            type="file"
          />
        </div>
        <table className="table table-striped" id="table">
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Age</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.Id}</td>
                  <td>{item.Name}</td>
                  <td>{item.Age}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Home;
