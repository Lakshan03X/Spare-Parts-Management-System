import React, { useEffect, useState } from "react";
import Homenav from "../Home_navbar";
import Footer from "../Home_nav_footers/home_footer";
import "./survey_view.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function HomeSurveyView() {
  const { id } = useParams(); // Get survey ID from the URL
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user ? user.username : "Anonymous";
  const u_email = user ? user.email : "No Email Provided";

  const [survey, setSurvey] = useState(null); // Single survey object
  const [answers, setAnswers] = useState({
    Q1: "",
    Q2: "",
    Q3: "",
    Q4: "",
    Q5: "",
  }); // User's answers

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8020/getqnstoHome/` + id)
      .then((result) => {
        console.log("Survey data:", result.data);
        setSurvey(result.data);
      })
      .catch((err) => console.error("API Error:", err));
  }, [id]);

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send answers to the backend
    console.log("User Answers:", answers);
    // You can use axios.post to submit the answers
    // axios.post('http://localhost:8020/api/submitSurvey', { surveyId: id, answers })
    //   .then(response => { /* Handle success */ })
    //   .catch(error => { /* Handle error */ });
  };

  return (
    <>
      <Homenav />
      <div className="survey-container">
        {survey ? (
          <form className="survey-block" onSubmit={handleSubmit}>
            <div className="survey-user-info">
              <h2>Survey - {survey.title}</h2>
              <br />
              <input type="text" value={`Name : ${username}`} readOnly />
              <br />
              <input type="text" value={`Email : ${u_email}`} readOnly />
              <br />
              {/* Render each question */}
              {Object.keys(answers).map((key, index) => (
                <div key={index}>
                  <h3>
                    Question {index + 1}: {survey[key]}
                  </h3>
                  <input
                    type="text"
                    name={key}
                    placeholder={`Answer ${index + 1}`}
                    value={answers[key]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>
            <button type="submit" id="submitbtn">
              Submit
            </button>
          </form>
        ) : (
          <p>Loading survey...</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default HomeSurveyView;
