import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { v4 as uuid } from "uuid";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export const AddUser = () => {
  const [data, setData] = useState("");
  const { addUser } = useContext(GlobalContext);
  const history = useHistory();

  const { Name } = data;

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: uuid(),
      Name,
    };
    addUser(newUser);
    history.push("/");
    console.log(newUser);
  };

  const onChange = (e) => {
    setData({ [e.target.name]: e.target.value });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Control
        type="name"
        name="Name"
        value={Name}
        onChange={(e) => onChange(e)}
        placeholder="Enter user"
        required
      />
      <Button type="submit">Submit</Button>
      <Link to="/" className="btn btn-danger ml-2">
        Cancel
      </Link>
    </Form>
  );
};
