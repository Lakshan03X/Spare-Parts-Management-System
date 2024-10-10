import React from "react";
import "./Home_navbar.css";
import { useNavigate, Link } from "react-router-dom";

function Home_navbar() {
  const navigate = useNavigate(); 

  // Get user data from local storage
  const user = JSON.parse(localStorage.getItem('user'));
  // Access the username
  const username = user ? user.username : null;
  // console.log(user.address)

  // Log Out function
  const logOut = () => {
    localStorage.clear(); // Clear local storage
    navigate('/customerLogin'); // Redirect to the customer login page
  };

  return (
    <>
      <header>
        <nav>
          <div className="logo">
            <h1>Spare Parts Management</h1>
          </div>
          <ul className="nav-links">
            <Link to="/home" className="link">
              <li>Home</li>
            </Link>
            <Link to="/home_inventory" className="link">
              <li>Inventory</li>
            </Link>
            <Link to="/home_feedback" className="link">
              <li>Feedbacks</li>
            </Link>
            <Link to="/home_contact" className="link">
              <li>Contact Us</li>
            </Link>
            <Link to="/home_aboutUs" className="link">
              <li>About Us</li>
            </Link>
          </ul>
          <div className="profile-sec">
            {username ? (
              <>
                <span>Hi, {username}</span>
                <button onClick={logOut}>Log Out</button>
              </>
            ) : (
              <div>
                <Link to="/customerLogin" className="link">
                <Link to="">
              <i className="fa-solid fa-user icon-size profile-bg"></i>
                </Link>
                  <button>Login</button>
                </Link>
                <Link to="/customerReg" className="link">
                  <button>Sign Up</button>
                </Link>
              </div>
            )}
            
          </div>
        </nav>
      </header>
    </>
  );
}

export default Home_navbar;
