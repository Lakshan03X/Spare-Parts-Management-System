import React from "react";
import "./user_mg_nav.css";
import { Link } from "react-router-dom";

function user_mg_nav() {
  return (
    <div className="sidebar">
      {/* <Link to="/create" className="add_btn">
          Create User&ensp;<i class="fa fa-plus" aria-hidden="true"></i>{" "}
        </Link> */}
      <h2>The Racers Edge</h2>
      <ul>
        <li>
          <a href="#">Dashboard</a>
        </li>
        <li>
          <a href="#">Manage Users</a>
        </li>
        <li>
          <a href="#">Send Notifications</a>
        </li>
        <li>
          <a href="#">Requests</a>
        </li>
        <Link to="/user_rept" style={{ textDecoration: "none" }}>
          <li>
            <a className="active">User - Reports</a>
          </li>
        </Link>
      </ul>
      <div className="logout">
        <button>Logout</button>
      </div>
    </div>
  );
}

export default user_mg_nav;
