import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// import "../../../css/delManagerReg.css";

function SupplierManagerLogin() {
  const [email, setEmail] = useState();
  const [password, setPass] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8020/supLogin", { email, password })
      .then((result) => {
        const userData = result.data.user; // Access the user data from the response
        console.log(userData); // Log user data for debugging

        // Check if login was successful based on the message
        if (result.data.message === "Success") {
          localStorage.setItem("user", JSON.stringify(userData)); // Store user data in local storage
          navigate("/supplierInv");
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
            <h3>Supplier Manager Login</h3>
            <label htmlFor="delManagerEmail">Email </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              name="delManagerEmail"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="delManagerPass">Password</label>
            <input
              type="password"
              placeholder="*************"
              name="delManagerPass"
              onChange={(e) => setPass(e.target.value)}
            />
            <button type="submit">LOGIN</button>
            <br />
            <Link to="/SupRegister">Don't have an account : Register here</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default SupplierManagerLogin;
