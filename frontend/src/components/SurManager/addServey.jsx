import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/survey/addServey.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddSurvey() {
  const [title, setTitle] = useState("");
  const [Q1, setQ1] = useState("");
  const [Q2, setQ2] = useState("");
  const [Q3, setQ3] = useState("");
  const [Q4, setQ4] = useState("");
  const [Q5, setQ5] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8020/addqns", {
        title,
        Q1,
        Q2,
        Q3,
        Q4,
        Q5,
      })
      .then((result) => {
        console.log(result);
        toast.success("Survey added successfully");
        setTimeout(() => {
          navigate("/surManagerDash");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to add survey");
      });
  };
  const back = () => {
    navigate(-1)
  }
  return (
    <div className="addSur">
      <button onClick={back}>Go Back</button>
      <h1>Create a Survey</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Survey Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="report-input"
        />

        <label htmlFor="q1ans">Question 01</label>
        <input
          type="text"
          name="q1ans"
          id="q1ans"
          onChange={(e) => setQ1(e.target.value)}
          required
          className="report-input"
        />

        <label htmlFor="q2ans">Question 02</label>
        <input
          type="text"
          name="q2ans"
          id="q2ans"
          onChange={(e) => setQ2(e.target.value)}
          required
          className="report-input"
        />

        <label htmlFor="q3ans">Question 03</label>
        <input
          type="text"
          name="q3ans"
          id="q3ans"
          onChange={(e) => setQ3(e.target.value)}
          required
          className="report-input"
        />

        <label htmlFor="q4ans">Question 04</label>
        <input
          type="text"
          name="q4ans"
          id="q4ans"
          onChange={(e) => setQ4(e.target.value)}
          required
          className="report-input"
        />

        <label htmlFor="q5ans">Question 05</label>
        <input
          type="text"
          name="q5ans"
          id="q5ans"
          onChange={(e) => setQ5(e.target.value)}
          required
          className="report-input"
        />

        <button type="submit" className="report-sum-btn">
          Submit Survey
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddSurvey;
