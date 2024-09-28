import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../user_manager/user_mg_nav/user_fill_form.css";
import Navbar from "../user_manager/user_mg_nav/user_mg_nav";

function add_user() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [age, setAge] = useState();
  const [address, setAddress] = useState();
  const [contact_no, setContact] = useState();
  const [user_type, setUserType] = useState("Supplier");

  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8020/createUser", {
        name,
        email,
        password,
        address,
        contact_no, // Ensure this key matches your model
        user_type,
        age, // Convert to number if necessary
      })
      .then((result) => {
        console.log(result);
        alert("User added successfully");
        setTimeout(() => {
          navigate("/supplierInv");
        }, 2000);
      })
      .catch((err) => {
        console.error(err.response ? err.response.data : err.message);
      });
  };

  return (
    <>
      <form id="userForm" onSubmit={Submit}>
        <label htmlFor="name" id="lable">
          Name:
        </label>
        <input
          type="text"
          id="inputs"
          name="name"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email" id="lable">
          Email:
        </label>
        <input
          type="text"
          id="inputs"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" id="lable">
          Password:
        </label>
        <input
          type="text"
          id="inputs"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="age" id="lable">
          Age:
        </label>
        <input
          type="number"
          id="inputs"
          name="age"
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <label htmlFor="address" id="lable">
          Address:
        </label>
        <input
          type="text"
          id="inputs"
          name="address"
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <label htmlFor="contact" id="lable">
          Contact:
        </label>
        <input
          type="tel"
          id="inputs"
          name="contact"
          onChange={(e) => setContact(e.target.value)}
          required
        />

        <label htmlFor="user_type" id="lable">
          User Type:
        </label>
        <select
          id="inputs"
          name="user_type"
          onChange={(e) => setUserType(e.target.value)}
          required
        >
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
          <option value="supplier">Supplier</option>
        </select>

        <button type="submit" id="s_btn">
          Submit
        </button>
      </form>
    </>
  );
}

export default add_user;
