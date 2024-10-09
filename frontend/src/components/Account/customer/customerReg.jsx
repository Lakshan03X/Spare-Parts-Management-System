







import { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import axios from "axios";
import "../../../css/delManagerLog.css";
import {useCustomerSignUp} from "../../../hook/useCustomerSIgnUp";


    function CustomerSignUp() {

        const [name, setName] = useState()
        const [email, setEmail] = useState()
        const [address, setAddress] = useState()
        const [phone, setPhone] = useState()
        const [password, setPass] = useState()

        const {signUp, error, isLoading} = useCustomerSignUp()

        const navigate = useNavigate()

        const handleSubmit = async (e) => {
          e.preventDefault(); 
          if (!name || !email || !address || !phone || !password) {
              alert("All fields are required.");
              return;
          }
          try {
              await signUp(name,email, address, phone,password);
              navigate('/customerLogin');
          } catch (err) {
              console.log(err);
              
          }
      };

    return (
        <>
            <div className="account-form">
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
                    <button type="submit" disabled={isLoading} >Register</button>
                    {error && <div>{error}</div>}
                </form>
                <Link to="/customerLogin">Login</Link>
            </div>
        </>
    );
    }
export default CustomerSignUp;
