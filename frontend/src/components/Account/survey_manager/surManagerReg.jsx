







import { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import axios from "axios";
import "../../../css/delManagerLog.css";
import { useSignUp } from "../../../hook/useSignUp";


    function SurManagerSignUp() {

        const [name, setName] = useState()
        const [email, setEmail] = useState()
        const [phone, setPhone] = useState()
        const [password, setPass] = useState()

        const {signUp, error, isLoading} = useSignUp()

        const navigate = useNavigate()

        const handleSubmit = async (e) => {
          e.preventDefault();
  
          
          if (!name || !email || !phone || !password) {
              alert("All fields are required.");
              return;
          }
  
          try {
              
              await signUp(email, password);
  
              
              const result = await axios.post('http://localhost:8020/surManregister', { name, email, phone, password });
              console.log(result);
              navigate('/surManagerLogin');
          } catch (err) {
              console.log(err);
              
          }
      };

    return (
        <>
            <div className="account-form">
                <form method="post" onSubmit={handleSubmit}>
                    <label htmlFor="surManagerName">Name </label>
                    <input 
                    type="text"
                    placeholder="Enter Your Name"
                    name="surManagerName"
                    onChange={(e) => setName(e.target.value)}
                      />

                    <label htmlFor="surManagerEmail">Email </label>
                    <input 
                    type="email"
                    placeholder="Enter Your Email"
                    name="surManagerEmail"
                    onChange={(e) => setEmail(e.target.value)}
                      />

                    <label htmlFor="surManagerPhone">Phone </label>
                    <input 
                    type="phone"
                    placeholder="Enter Your Phone"
                    name="surManagerPhone"
                    onChange={(e) => setPhone(e.target.value)}
                      />

                    <label htmlFor="surManagerPass">Password </label>
                    <input 
                    type="password"
                    placeholder="*************"
                    name="surManagerPass"
                    onChange={(e) => setPass(e.target.value)}
                      />
                    <button type="submit" disabled={isLoading} >Register</button>
                    {error && <div>{error}</div>}
                </form>
                <Link to="/surManagerLogin">Login</Link>
            </div>
        </>
    );
    }
export default SurManagerSignUp;
