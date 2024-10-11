import React, { useEffect, useState } from "react";
import Homenav from "../Home_navbar";
import Footer from "../Home_nav_footers/home_footer";
import "./survey_view.css";
import axios from "axios";

function Home_survay_view() {
  const user = JSON.parse(localStorage.getItem("user"));
  // Access the username
  const username = user ? user.username : null;
  const u_email = user ? user.email : null;

  const [surveys, setSurvays] = useState([]); // Original items
  const [filteredSurveys, setFilteredSurveys] = useState([]); // Filtered items

  useEffect(() => {
    axios
      .get("http://localhost:8020/getToHomeSurveysToView")
      .then((result) => {
        setSurvays(result.data); // Store original data
        setFilteredSurveys(result.data); // Initialize filteredItems with the same data
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Homenav />
      <div>
        {filteredSurveys.map((suvey) => (
          <div id="survey-container">
            <h1 id="form-title">{suvey.title}</h1>
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
              <div key={suvey.id}>
                <label for="age">{suvey.questions} ? </label>
                <input
                  type="text"
                  id="ans"
                  name="ans"
                  placeholder="Enter your Ansewer"
                  required
                />
              </div>

              <button type="submit" id="submit-btn">
                Submit
              </button>
            </form>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Home_survay_view;
