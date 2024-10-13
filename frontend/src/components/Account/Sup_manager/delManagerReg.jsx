import { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import axios from "axios";
import "../../../css/delManagerLog.css";



    function SupManagerSignUp() {

        const [name, setName] = useState()
        const [email, setEmail] = useState()
        const [phone, setPhone] = useState()
        const [password, setPass] = useState()



        const navigate = useNavigate()

        const handleSubmit = async (e) => {
          e.preventDefault();
      
          // Check if all fields are filled
          if (!name || !email || !phone || !password) {
              alert("All fields are required.");
              return;
          }
      
          try {
              
      
              // Send the supplier manager data to the server
              const result = await axios.post('http://localhost:8020/SupRegister', { name, email, phone, password });
      
              // Log the result (optional)
              console.log(result);
      
              // Navigate to the login page for supplier managers
              navigate('/supManagerLogin');
          } catch (err) {
              // Log the error to the console
              console.log(err);
              alert("Failed to register. Please try again."); // Optionally inform the user about the error
          }
      };
      

    return (
        <>
            <div className="account-form">
                <form method="post" onSubmit={handleSubmit}>
                    <label htmlFor="delManagerName">Name </label>
                    <input 
                    type="text"
                    placeholder="Enter Your Name"
                    name="delManagerName"
                    onChange={(e) => setName(e.target.value)}
                      />

                    <label htmlFor="delManagerEmail">Email </label>
                    <input 
                    type="email"
                    placeholder="Enter Your Email"
                    name="delManagerEmail"
                    onChange={(e) => setEmail(e.target.value)}
                      />

                    <label htmlFor="delManagerPhone">Phone </label>
                    <input 
                    type="phone"
                    placeholder="Enter Your Phone"
                    name="delManagerPhone"
                    onChange={(e) => setPhone(e.target.value)}
                      />

                    <label htmlFor="delManagerPass">Password </label>
                    <input 
                    type="password"
                    placeholder="*************"
                    name="delManagerPass"
                    onChange={(e) => setPass(e.target.value)}
                      />
                    <button type="submit"  >Register</button>
                  
                </form>
                <Link to="/delManagerLogin">Login</Link>
            </div>
        </>
    );
    }
export default SupManagerSignUp;
