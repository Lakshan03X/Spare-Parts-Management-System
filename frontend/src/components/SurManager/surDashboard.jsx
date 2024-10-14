import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

const SurveyComponent = () => {
  const [survey, setSurvey] = useState();

  const [filteredItems, setFilteredItems] = useState([]); // Filtered items

  useEffect(() => {
    axios
      .get("http://localhost:8020/getqns")
      .then((result) => {
        setSurvey(result.data); // Store original data
        setFilteredItems(result.data); // Initialize filteredItems with the same data
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <h1>Survey Manager</h1>
      <Link to="/addSurvey">
        <button className="add_btn" id="addbtn">
          Add Survey
        </button>
      </Link>
      {filteredItems.map((survey, index) => (
        <div className="survey-item" key={index}>
          <h1 className="survey-item-title">{survey.title}</h1>
          <Link to={`/view_quations/${survey._id}`}>
            <button className="survey-item-button">View</button>
          </Link>
          <button className="survey-item-button">Edit</button>
          <button className="survey-item-button">Delete</button>
        </div>
      ))}
    </>
  );
};

export default SurveyComponent;
