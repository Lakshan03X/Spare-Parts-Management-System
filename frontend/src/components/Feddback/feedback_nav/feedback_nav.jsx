import React from "react";
import { Link } from "react-router-dom";
import "../feedback_nav/feedback_nav.css"

function feedback_nav() {
  return (
    <>
      <div id="sidebar">
        <h2>The Racers Edge</h2>
        <ul>
          <Link to="/" className="link">
            <li>
              <a href="#">Dashboard</a>
            </li>
          </Link>
          <li>
            <a href="#" className="active">Feedbacks</a>
          </li>
          <Link to="/" className="link">
            <li>
              <a href="#">Analysys</a>
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
    </>
  );
}

export default feedback_nav;
