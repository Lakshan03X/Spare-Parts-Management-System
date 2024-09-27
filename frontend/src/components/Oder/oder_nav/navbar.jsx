import React from "react";
import { Link } from "react-router-dom";
import  "../oder_nav/navbar.css";

function navbar() {
  return (
    <div className="sidebar">
      <h2>The Racers Edge</h2>
      <ul>
        <Link to="/" className="link">
          <li>
            <a href="#">Dashboard</a>
          </li>
        </Link>
        <li>
          <a href="#">Oder</a>
        </li>
        <Link to="/" className="link">
          <li>
            <a href="#">Payment</a>
          </li>
        </Link>
        <Link to="/" className="link">
          <li>
            <a href="#">Reports</a>
          </li>
        </Link>
      </ul>
      <div className="logout">
        <img
          src="https://img.icons8.com/ios/50/000000/user"
          className="user_img"
        />
        <button>Logout</button>
      </div>
    </div>
  );
}

export default navbar;
