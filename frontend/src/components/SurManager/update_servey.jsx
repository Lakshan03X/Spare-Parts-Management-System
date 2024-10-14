import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function update_servey() {
  const { id } = useParams();
  const [title, settitle] = useState("");
  const [Q1, setQ1] = useState(0);
  const [Q2, setQ2] = useState("");
  const [Q3, setQ3] = useState("");
  const [Q4, setQ4] = useState("");
  const [Q5, setQ5] = useState("");

  const navigate = useNavigate();

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8020/survey_update/" + id, {
        title,
        Q1,
        Q2,
        Q3,
        Q4,
        Q5,
      })
      .then((result) => {
        console.log(result);
        setTimeout(() => {
          alert("updated");
          navigate(-1); // Navigate to the homepage after adding the user
        }, 500); // Show success notification
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8020/get_quations/" + id)
      .then((result) => {
        console.log(result);
        settitle(result.data.title);
        setQ1(result.data.Q1);
        setQ2(result.data.Q2);
        setQ3(result.data.Q3);
        setQ4(result.data.Q4);
        setQ5(result.data.Q5);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const back = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="addSur">
        <button onClick={back}>Go Back</button>
        <h1>Create a Survey</h1>
        <form onSubmit={Update}>
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
            value={Q1}
            onChange={(e) => setQ1(e.target.value)}
            required
            className="report-input"
          />

          <label htmlFor="q2ans">Question 02</label>
          <input
            type="text"
            name="q2ans"
            id="q2ans"
            value={Q2}
            onChange={(e) => setQ2(e.target.value)}
            required
            className="report-input"
          />

          <label htmlFor="q3ans">Question 03</label>
          <input
            type="text"
            name="q3ans"
            id="q3ans"
            value={Q3}
            onChange={(e) => setQ3(e.target.value)}
            required
            className="report-input"
          />

          <label htmlFor="q4ans">Question 04</label>
          <input
            type="text"
            name="q4ans"
            id="q4ans"
            value={Q4}
            onChange={(e) => setQ4(e.target.value)}
            required
            className="report-input"
          />

          <label htmlFor="q5ans">Question 05</label>
          <input
            type="text"
            name="q5ans"
            id="q5ans"
            value={Q5}
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
    </>
  );
}

export default update_servey;
