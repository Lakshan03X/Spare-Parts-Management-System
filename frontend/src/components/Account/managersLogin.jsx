import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../css/mLogin.css";

function ManagersLogin() {
  return (
    <>
      <h1>Please Select Your Account Type</h1>
      <div className="select-type">
        <div className="type-container">
          <div className="account-types">
            <Link className="account-types-link" to="/delManagerLogin">
              <img
                className="account-type-img"
                src="./src/assets/images/del.png"
                alt=""
              />
              <span>Delivery Manager</span>
            </Link>
          </div>

          <div className="account-types">
            <Link className="account-types-link" to="/surManagerLogin">
              <img
                className="account-type-img"
                src="./src/assets/images/sur.png"
                alt=""
              />
              <span>Survey Manager</span>
            </Link>
          </div>

          <div className="account-types">
            <Link className="account-types-link" to="/supplierInv">
              <img
                className="account-type-img"
                src="./src/assets/images/inv.png"
                alt=""
              />
              <span>Supplier Manager</span>
            </Link>
          </div>

          <div className="account-types">
            <Link className="account-types-link" to="/supplierInv">
              <img
                className="account-type-img"
                src="./src/assets/images/account.png"
                style={{ width: '150px' , height: "100px"}}
                alt=""
              />
              <span>User Manager</span>
            </Link>
          </div>

          <div className="account-types">
            <Link className="account-types-link" to="/supplierInv">
              <img
                className="account-type-img"
                src="./src/assets/images/order.png"
                alt=""
              />
              <span>Order Manager</span>
            </Link>
          </div>

          <div className="account-types">
            <Link className="account-types-link" to="/supplierInv">
              <img
                className="account-type-img"
                src="./src/assets/images/feedback.png"
                alt=""
              />
              <span>Feedback Manager</span>
            </Link>
          </div>

          <div className="account-types">
            <Link className="account-types-link" to="/supplierInv">
              <img
                className="account-type-img"
                src="./src/assets/images/employee.png"
                alt=""
              />
              <span>Emplooye Manager</span>
            </Link>
          </div>

          <div className="account-types">
            <Link className="account-types-link" to="/supplierInv">
              <img
                className="account-type-img"
                src="./src/assets/images/service.png"
                alt=""
              />
              <span>Service Manager</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagersLogin;
