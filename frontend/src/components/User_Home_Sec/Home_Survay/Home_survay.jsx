import React, { useEffect, useState } from "react";
import Homenav from "../Home_navbar";
import Footer from "../Home_nav_footers/home_footer";
import "./home_survay.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Home_survay() {
  const [surveys, setSurveys] = useState([]); // Corrected the variable name
  const [filteredSurveys, setFilteredSurveys] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8020/getqnstoHome")
      .then((result) => {
        console.log("Fetched surveys:", result.data); // Log the fetched data
        setSurveys(result.data);
        setFilteredSurveys(result.data);
      })
      .catch((err) => console.log("Error fetching surveys:", err));
  }, []);

  return (
    <>
      <Homenav />
      <div id="survay-section">
        {filteredSurveys.map((survey) => (
          <div id="card-container" key={survey._id}>
            {" "}
            {/* Use a unique key here */}
            <div className="card">
              <h2>{survey.title}</h2>
              <h4>You can respond to this survey</h4> {/* Fixed typo */}
              <Link
                to={`/home_survey/view_survey/${survey._id}`}
                className="link"
              >
                <button className="card-btn">Respond</button>
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
