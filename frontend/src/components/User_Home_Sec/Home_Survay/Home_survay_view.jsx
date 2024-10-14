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
    // Make an Axios request to retrieve survey data
    const fetchSurveyData = async () => {
      try {
        const response = await axios.get(`http://localhost:8020/getqnstoHome/${id}`);
        console.log("Survey data:", response.data);
        setSurvey(response.data); // Set the survey data
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchSurveyData(); // Call the function to fetch data
  }, [id]);

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare data to be submitted
    const submissionData = {
      cus_email: u_email,
      Q1ans: answers.Q1,
      Q2ans: answers.Q2,
      Q3ans: answers.Q3,
      Q4ans: answers.Q4,
      Q5ans: answers.Q5,
    };
  
    try {
      const response = await axios.post(`http://localhost:8020/submitSurvey/${id}`, submissionData);
      console.log("Submission successful:", response.data);
      navigate('/'); // Example: navigate to a success page
    } catch (error) {
      console.error("Submission Error:", error);
    }
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
