import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../../css/delManagerReg.css";

function CustomerLogin() {
  const [email, setEmail] = useState();
  const [password, setPass] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8020/customerLogin", { email, password })
      .then((result) => {
        const userData = result.data.user;
        console.log(userData);

        // Check if login was successful based on the message
        if (result.data.message === "Success") {
          localStorage.setItem("user", JSON.stringify(userData)); // Store user data in local storage
          navigate("/");
        } else {
          alert(result.data.error || "Invalid! Please check again."); // Show appropriate error
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred during login. Please try again.");
      });
  };

  return (
    <>
      {/* this is left side */}
      <div className="main_container">
        <div className="left_side">
          <h1>
            The Racers <br />
            Edge
          </h1>
        </div>

        <div className="right_side">
          <form method="post" onSubmit={handleSubmit}>
            <h2>Customer Login</h2>
            <label htmlFor="cusEmail">Email </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              name="cusEmail"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="cusPass">Password</label>
            <input
              type="password"
              placeholder="*************"
              name="cusPass"
              onChange={(e) => setPass(e.target.value)}
            />
            <button type="submit">LOGIN</button>
            <br />
            <span>
              Don't have an account ? :
              <Link to="/customerReg"> Register here</Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

export default CustomerLogin;
