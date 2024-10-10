import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../customer/customerReg.css";
import { useCustomerSignUp } from "../../../hook/useCustomerSIgnUp";

function CustomerSignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [password, setPass] = useState();

  const { signUp, error, isLoading } = useCustomerSignUp();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !address || !phone || !password) {
      alert("All fields are required.");
      return;
    }
    try {
      await signUp(name, email, address, phone, password);
      navigate("/customerLogin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div id="main_container">
        <div id="left_side">
          <h1>
            The Racers <br />
            Edge
          </h1>
        </div>
        <div id="right_side">
          <h2>Customer Registration</h2>
          <form method="post" onSubmit={handleSubmit}>
            <label htmlFor="cusName">Name </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              name="cusName"
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="cusAddress">Address </label>
            <input
              type="text"
              placeholder="Enter Your Address"
              name="cusAddress"
              onChange={(e) => setAddress(e.target.value)}
            />

            <label htmlFor="cusEmail">Email </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              name="cusEmail"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="cusPhone">Phone </label>
            <input
              type="phone"
              placeholder="Enter Your Phone"
              name="cusPhone"
              onChange={(e) => setPhone(e.target.value)}
            />

            <label htmlFor="cusPass">Password </label>
            <input
              type="password"
              placeholder="*************"
              name="cusPass"
              onChange={(e) => setPass(e.target.value)}
            />
            <button type="submit" disabled={isLoading}>
              Register
            </button>
            {error && <div>{error}</div>}
            <span>
              Already have an account ? :{" "}
              <Link to="/customerLogin">Login Here</Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
export default CustomerSignUp;
