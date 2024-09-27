import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function add_user() {
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [age, setAge] = React.useState();
  const [address, setAddress] = React.useState();
  const [contact, setContact] = React.useState();
  const [user_type, setUserType] = React.useState();

  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/createUser", {
        name,
        email,
        password,
        address,
        contact,
        user_type,
        age,
      })
      .then((result) => {
        console.log(result);
        setTimeout(() => {
          navigate("/");
        }, 1000); // Show success notification
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

export default add_user;
