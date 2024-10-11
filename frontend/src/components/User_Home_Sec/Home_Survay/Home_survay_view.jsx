import React, { useEffect, useState } from "react";
import Homenav from "../Home_navbar";
import Footer from "../Home_nav_footers/home_footer";
import "./survey_view.css";
import axios from "axios";

function Home_survay_view() {
  const user = JSON.parse(localStorage.getItem("user"));
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
      <div className="survey-container">
        {filteredSurveys.map((survey) => (
          <div key={survey.id} className="survey-block">
            {survey.questions.map((questionObj, index) => (
              <div key={questionObj._id}>
                <div className="survey-user-info">
                  <h2>{survey.title}</h2>
                  <br />
                  <input type="text" value={"Name : " + username} id="abcinput" />
                  <br />
                  <input type="text" value={"Email : " + u_email} id="abcinput" />
                  <br />
                </div>
                <label
                  htmlFor={`question-${index}`}
                  className="survey-question"
                >
                  {"Question : " + questionObj.question}?
                </label>

                {questionObj.options &&
                  questionObj.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="option-container">
                      <input
                        type={
                          questionObj.answerType === "text" ? "text" : "radio"
                        }
                        id={`option-${optionIndex}`}
                        name={`question-${index}`}
                        value={option}
                      />
                      <label htmlFor={`option-${optionIndex}`}>{option}</label>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Home_survay_view;
