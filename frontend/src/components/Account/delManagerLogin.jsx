





import { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import axios from "axios";
import "../../css/delManagerReg.css";



function DelManagerLogin() {

    const [email, setEmail] = useState()
    const [password, setPass] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8020/login', { email, password})
        .then(result => {console.log(result)
            if(result.data === "Success") {
                navigate('/home')
            } 
          
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="account-form">
                <form method="post" onSubmit={handleSubmit}>
                    
                    <label htmlFor="delManagerEmail">Email </label>
                    <input 
                    type="email"
                    placeholder="Enter Your Email"
                    name="delManagerEmail"
                    onChange={(e) => setEmail(e.target.value)}
                      />

                    <label htmlFor="delManagerPass">Password </label>
                    <input 
                    type="password"
                    placeholder="*************"
                    name="delManagerPass"
                    onChange={(e) => setPass(e.target.value)}
                      />
                    <button type="submit" >Register</button>
                </form>
                <Link to="/delManagerLogin">Login</Link>
            </div>
    )
}

export default DelManagerLogin;