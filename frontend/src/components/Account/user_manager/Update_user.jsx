import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Update_user() {
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [age, setAge] = React.useState();
  const [address, setAddress] = React.useState();
  const [contact, setContact] = React.useState();
  const [user_type, setUserType] = React.useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/getUser/" + id)
      .then((result) => {
        console.log(result);
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
      })
      .catch((err) => console.log(err));
  }, []);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/updateUser/" + id, { name, email, age })
      .then((result) => {
        console.log(result);
        setTimeout(() => {
          navigate("/");
        }, 1500); // Show success notification
        // navigate('/'); // Navigate to the homepage after adding the user
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div id="userMainContainer">
        <form action="" id="userForm">
          <div id="sec"></div>
          <button type="submit" id="user_submit_btn">
            Create User
          </button>
        </form>
      </div>
    </>
  );
}

export default Update_user;
