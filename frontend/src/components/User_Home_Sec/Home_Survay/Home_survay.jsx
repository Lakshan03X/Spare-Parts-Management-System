import React from "react";
import Homenav from "../Home_navbar";
import Footer from "../Home_nav_footers/home_footer";
import "./home_survay.css";
import { Link } from "react-router-dom";

function Home_survay() {
  return (
    <>
      <Homenav />
      <div id="survay-section">
        <div id="card-container">
          <div class="card">
            <h2>Survey Title here</h2>
            <h4>Survay about text here</h4>
            <Link to="/home_survey/view_survey" className="link">
              <button class="card-btn">Respond</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home_survay;
