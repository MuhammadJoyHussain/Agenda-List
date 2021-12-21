import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import { Link } from "react-router-dom";
import { RiCloseCircleLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

export const UserList = () => {
  const { users, removeUser } = useContext(GlobalContext);

  return (
    <section className="mt-4">
      {users.length > 0 ? (
        <>
          <ReactHtmlTableToExcel
            className="btn btn-success mb-3"
            table="table"
            filename="Emp Excel file"
            sheet="sheet"
            buttonText="Export to Excel"
          />
          <table className="table table-striped" id="table">
            <thead>
              <tr>
                <td>Name</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              <>
                {users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.Name}</td>
                      <td>
                        <Link to={`/edit/${user.id}`} color="warning">
                          <BiEdit />
                        </Link>
                        <RiCloseCircleLine
                          onClick={() => removeUser(user.id)}
                          color="red"
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </>
            </tbody>
          </table>
        </>
      ) : (
        <h4 className="text-center">No Users</h4>
      )}
    </section>
  );
};
