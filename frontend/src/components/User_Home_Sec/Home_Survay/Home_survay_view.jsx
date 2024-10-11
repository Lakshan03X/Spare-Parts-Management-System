import React, { useEffect, useState } from "react";
import Homenav from "../Home_navbar";
import Footer from "../Home_nav_footers/home_footer";
import "./survey_view.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function HomeSurveyView() {
  const { id } = useParams(); // Get survey ID from the URL
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user ? user.username : "Anonymous";
  const u_email = user ? user.email : "No Email Provided";

  const [survey, setSurvey] = useState(null); // Store survey data

  useEffect(() => {
    // Fetch the survey from the backend API
    axios
      .get("http://localhost:8020/getToHomeSurveysToView/" + id)
      .then((result) => {
        console.log("Survey data:", result.data); // Log the result
        setSurvey(result.data); // Set survey data
      })
      .catch((err) => console.error("API Error:", err));
  }, [id]);

  return (
    <>
      <Homenav />
      <div className="survey-container">
        {survey ? (
          <div className="survey-block">
            <div className="survey-user-info">
              <h2>{survey.title}</h2>
              <br />
              <input
                type="text"
                value={"Name : " + username}
                id="abcinput"
                readOnly
              />
              <br />
              <input
                type="text"
                value={"Email : " + u_email}
                id="abcinput"
                readOnly
              />
              <br />
            </div>

            {survey.questions.map((questionObj, index) => (
              <div key={questionObj._id}>
                <label htmlFor={`question-${index}`} className="survey-question">
                  {"Question : " + questionObj.question}?
                </label>

                {/* Render options for multiple-choice and input for text */}
                {questionObj.answerType === "multiple-choice" &&
                  questionObj.options &&
                  questionObj.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="option-container">
                      <input
                        type="radio"
                        id={`option-${optionIndex}`}
                        name={`question-${index}`}
                        value={option}
                      />
                      <label htmlFor={`option-${optionIndex}`}>{option}</label>
                    </div>
                  ))}

                {questionObj.answerType === "text" && (
                  <input
                    type="text"
                    id={`question-${index}`}
                    name={`question-${index}`}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No surveys available to display.</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default HomeSurveyView;
