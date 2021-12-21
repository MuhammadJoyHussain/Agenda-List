import React, { useContext } from "react";
import { Heading } from "./Heading";
import { Link } from "react-router-dom";
import { UserList } from "./UserList";
import * as XLSX from "xlsx";
import { GlobalContext } from "../context/GlobalState";

export const Home = () => {
  const { users } = useContext(GlobalContext);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const users = XLSX.utils.sheet_to_json(ws);

        resolve(users);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then(users);
  };

  return (
    <div className="py-4 container">
      <h1 className="text-center mt-3">Agenda List</h1>
      <div className="row col-4">
        <Link className="btn btn-primary mb-3" to="/add">
          Add User
        </Link>
        <input
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
          className="btn btn-light"
          type="file"
        />
      </div>
      <UserList />
    </div>
  );
};
