import React, { useEffect, useState } from "react";
import "../sup_navbar/sup_nav.css";
import { Link,useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const userData = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.clear()
        navigate('/mLogin') //aDD Navigation
    }

  const [username, setUsername] = useState(""); // State for storing username

  useEffect(() => {
    // Get the stored user data from local storage
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUsername(userData.username); // Set the username from stored data
      console.log(userData.username)
    }
  }, []);

  return (
    <div className="sidebar">
      <h2>The Racers Edge</h2>
      <ul>
        <Link to="/supplierDashboard" className="link">
          <li>
            <a href="#">Dashboard</a>
          </li>
        </Link>
        <li>
          <a href="#">Statistics</a>
        </li>
        <Link to="/supplierinv" className="link">
          <li>
            <a>Inventory</a>
          </li>
        </Link>
        <li>
          <a href="#">Requests</a>
        </li>
        <Link to="/supplierReport" className="link">
          <li>
            <a>Reports</a>
          </li>
        </Link>
      </ul>
      <div className="logout">
        <img
          src="https://img.icons8.com/ios/50/000000/user"
          className="user_img"
          alt="User"
        />
        <button onClick={logOut}>{username && <p>{username}</p>} {/* Display the username here */} Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
