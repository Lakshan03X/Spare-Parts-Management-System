import React, { useEffect, useState } from "react";
import Homenav from "../Home_navbar";
import Footer from "../Home_nav_footers/home_footer";
import "./survey_view.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Consolidated imports

function HomeSurveyView() {
  const { id } = useParams(); // Get survey ID from the URL
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user ? user.username : "Anonymous";
  const u_email = user ? user.email : "No Email Provided";

  const [surveys, setSurveys] = useState([]); // Original items
  const [filteredSurveys, setFilteredSurveys] = useState([]); // Filtered items
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8020/getqnstoHome/" + id)
      .then((result) => {
        console.log("Survey data:", result.data); // Log the result
        setSurveys(result.data);
        setFilteredSurveys(result.data); // Set survey data
      })
      .catch((err) => console.error("API Error:", err));
  }, [id]);

  return (
    <>
      <Homenav />
      <div className="survey-container">
        {surveys.length > 0 ? ( // Check if surveys array has items
          <form className="survey-block">
            <div className="survey-user-info">
              <h2>{"Survey - " + surveys[0]?.title}</h2>{" "}
              {/* Assuming the title is in the first survey */}
              <br />
              <input type="text" value={"Name : " + username} readOnly />
              <br />
              <input type="text" value={"Email : " + u_email} readOnly />
              <br />
              {filteredSurveys.map(
                (
                  survey,
                  index // Map over filteredSurveys
                ) => (
                  <div key={index}>
                    <h3>Question - {survey.Q1}.</h3>
                    <input type="text" placeholder="Answer 1" />
                    <input type="text" placeholder="Answer 2" />
                    <input type="text" placeholder="Answer 3" />
                    <input type="text" placeholder="Answer 4" />
                    <input type="text" placeholder="Answer 5" />
                  </div>
                )
              )}
            </div>
            <button type="submit" id="submitbtn">
              Submit
            </button>
          </form>
        ) : (
          <p>No surveys available to display.</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default HomeSurveyView;
