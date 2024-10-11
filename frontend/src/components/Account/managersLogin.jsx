




import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../css/mLogin.css";

function ManagersLogin() {


  return (
    <>
        <div className="select-type">
            <h1>Please Select Your Account Type</h1>

            <div className="type-container">
            <div className="account-types">
                <Link className="account-types-link" to="/delManagerLogin"> 
                    <img className="account-type-img" src="./src/assets/images/del.png" alt="" />
                    <span>Delivery Manager</span>
                </Link>
            </div>

            <div className="account-types">
                <Link className="account-types-link" to="/surManagerLogin"> 
                    <img className="account-type-img" src="./src/assets/images/sur.png" alt="" />
                    <span>Survey Manager</span>
                </Link>
            </div>

            <div className="account-types">
                <Link className="account-types-link" to="/delManagerLogin"> 
                    <img className="account-type-img" src="./src/assets/images/inv.png" alt="" />
                    <span>Inventory Manager</span>
                </Link>
            </div>
            </div>
        </div>
    </>
  );
}

export default ManagersLogin;
