


import { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import axios from "axios";
import "../../css/delManagerLog.css";


    function DelPersonSignUp() {

        const [name, setName] = useState()
        const [email, setEmail] = useState()
        const [phone, setPhone] = useState()
        const [address, setAddress] = useState()
        const [vehicleType, setVehicleType] = useState()
        const [password, setPass] = useState()

        const navigate = useNavigate()

        const handleSubmit = (e) => {
            e.preventDefault()
            axios.post('http://localhost:8020/delPersonRegister', {name, email, phone, address, vehicleType,password})
            .then(result => {console.log(result)
              navigate('/delManagerLogin')
            })
            .catch(err => console.log(err))
        }

    return (
        <>
            <div className="account-form">
                <form method="post" onSubmit={handleSubmit}>
                    <label htmlFor="delPersonName">Name </label>
                    <input 
                    type="text"
                    placeholder="Enter Your Name"
                    name="delPersonName"
                    onChange={(e) => setName(e.target.value)}
                      />

                    <label htmlFor="delPersonEmail">Email </label>
                    <input 
                    type="email"
                    placeholder="Enter Your Email"
                    name="delPersonEmail"
                    onChange={(e) => setEmail(e.target.value)}
                      />

                    <label htmlFor="delPersonPhone">Phone </label>
                    <input 
                    type="phone"
                    placeholder="Enter Your Phone"
                    name="delPersonPhone"
                    onChange={(e) => setPhone(e.target.value)}
                      />

                    <label htmlFor="delPersonAddress">Address </label>
                    <input 
                    type="text"
                    placeholder="Enter Your Address"
                    name="delPersonAddress"
                    onChange={(e) => setAddress(e.target.value)}
                      />

                    <label htmlFor="delPersonVehicle">Vehicle </label>
                    <select 
                    name="delPersonVehicle" 
                    id="delPersonVehicle" 
                    onChange={(e) => setVehicleType(e.target.value)}>
                    <option value="motorCycle">MotorCycle</option>
                    <option value="car">Car</option>
                    <option value="threewheel">Threewheel</option>
                    <option value="van">Van</option>
                    </select>

                    <label htmlFor="delPersonPass">Password </label>
                    <input 
                    type="password"
                    placeholder="*************"
                    name="delPersonPass"
                    onChange={(e) => setPass(e.target.value)}
                      />
                    <button type="submit" >Register</button>
                </form>
                <Link to="/delManagerLogin">Login</Link>
            </div>
        </>
    );
    }
export default DelPersonSignUp;
