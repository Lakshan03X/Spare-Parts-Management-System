import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import "./all_Ser_mg.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

function ViewEachSurvey() {
  const { id } = useParams(); // Get the ID from the URL params
  const [survey, setSurvey] = useState(null); // State to store survey data
  const [loading, setLoading] = useState(true); // Loading state
  const [ans, setans] = useState([]); // Original items
  const [filteredans, setFilteredans] = useState([]); // Filtered items
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8020/view_quations`)
      .then((response) => {
        setSurvey(response.data); // Store the survey data
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching survey:", error);
        setLoading(false); // Stop loading even if there’s an error
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8020/getanswers")
      .then((result) => {
        setans(result.data); // Store original data
        setFilteredans(result.data); // Initialize filteredItems with the same data
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  if (!survey) {
    return <div>No survey found</div>; // If no survey is found
  }

  const generateReport = () => {
    const doc = new jsPDF();

    // Set title for the report
    doc.text("Survey Report", 10, 10);
    doc.text(`Survey Title: ${survey.title}`, 10, 20);
    doc.text(`Name: `, 10, 30); // Assuming you'll fill this out later
    doc.text(`E-Mail: `, 10, 40); // Assuming you'll fill this out later

    // Add survey questions and answers
    doc.text(`Question 01: ${survey.Q1}`, 10, 50);
    doc.text(`Answer: ans`, 10, 60); // Replace 'ans' with actual answer if available

    doc.text(`Question 02: ${survey.Q2}`, 10, 70);
    doc.text(`Answer: ans`, 10, 80); // Replace 'ans' with actual answer if available

    doc.text(`Question 03: ${survey.Q3}`, 10, 90);
    doc.text(`Answer: ans`, 10, 100); // Replace 'ans' with actual answer if available

    doc.text(`Question 04: ${survey.Q4}`, 10, 110);
    doc.text(`Answer: ans`, 10, 120); // Replace 'ans' with actual answer if available

    doc.text(`Question 05: ${survey.Q5}`, 10, 130);
    doc.text(`Answer: ans`, 10, 140); // Replace 'ans' with actual answer if available

    doc.save("survey_report.pdf");
  };
  const back = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const filteredReports = survey.filter(survey => survey.userEmail === loggedUserName);


  return (
    <>
      <button className="btn" onClick={generateReport}>
        Generate Report
      </button>
      <button className="btn" onClick={back}>
        go Back
      </button>
        <div className="survey-container">
          <h1 className="survey-title">Survey Title - {survey.title}</h1>

          <p className="survey-question">Name - </p>
          <p className="survey-question">E-Mail - </p>

          <p className="survey-question">Question 01 - {survey.Q1} ?</p>
          <input type="text" className="survey-ans" readOnly />

          <p className="survey-question">Question 02 - {survey.Q2} ?</p>
          <input type="text" value="ans" className="survey-ans" readOnly />

          <p className="survey-question">Question 03 - {survey.Q3} ?</p>
          <input type="text" value="ans" className="survey-ans" readOnly />

          <p className="survey-question">Question 04 - {survey.Q4} ?</p>
          <input type="text" value="ans" className="survey-ans" readOnly />

          <p className="survey-question">Question 05 - {survey.Q5} ?</p>
          <input type="text" value="ans" className="survey-ans" readOnly />
        </div>
    </>
  );
}

export default ViewEachSurvey;
