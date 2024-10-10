import React from "react";
import Homenav from "../Home_navbar";
import Footer from "../Home_nav_footers/home_footer";
import './survey_view.css';

function Home_survay_view() {
  const user = JSON.parse(localStorage.getItem("user"));
  // Access the username
  const username = user ? user.username : null;
  const u_email = user ? user.email : null;

  return (
    <>
      <Homenav />
      <div>
        <div id="survey-container">
          <h1 id="form-title">Simple Survey</h1>
          <form id="survey-form">
            <label for="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={username}
              readOnly
            />

            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={u_email}
              readOnly
            />

            <label for="age">Q1 :</label>
            <input type="text" id="q1" name="q1" value="bbbbb qqq11" readonly />

            <label for="age">Answer :</label>
            <input
              type="text"
              id="ans"
              name="ans"
              placeholder="Enter your Ansewer"
              required
            />
            <button type="submit" id="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home_survay_view;
