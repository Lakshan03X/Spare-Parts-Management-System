import React, { useEffect, useState } from "react";
import Homenav from "../Home_navbar";
import Footer from "../Home_nav_footers/home_footer";
import "./home_survay.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Home_survay() {
  const [surveys, setSurvays] = useState([]); // Original items
  const [filteredSurveys, setFilteredSurveys] = useState([]); // Filtered items

  useEffect(() => {
    axios
      .get("http://localhost:8020/getToHomeSurveys")
      .then((result) => {
        setSurvays(result.data); // Store original data
        setFilteredSurveys(result.data); // Initialize filteredItems with the same data
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Homenav />
      <div id="survay-section">
        {filteredSurveys.map((suvey) => (
          <div id="card-container">
            <div class="card" key={suvey.id}>
              <h2>{suvey.title}</h2>
              <h4>You can respond this survay</h4>
              <Link to={`/home_survey/view_survey/${suvey._id}`} className="link">
                <button class="card-btn">Respond</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Home_survay;
