import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

const SurveyComponent = () => {
  const [surveys, setSurvey] = useState([]);
  const [searchKey, setSearchKey] = useState(""); // Search key
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

  const handleSearch = () => {
    if (searchKey.trim() === "") {
      // If the search key is empty, reset to original items
      setFilteredItems(surveys);
    } else {
      const filteredData = surveys.filter((survey) =>
        survey.title.toLowerCase().includes(searchKey.toLowerCase())
      );
      setFilteredItems(filteredData); // Use the filtered data
    }
  };

  return (
    <>
      <Navbar />
      <h1>Survey Manager</h1>
      <div id="input_wrapperFed">
        <input
          type="search"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)} // Update search key
          placeholder="Search here . . ."
          id="search_bar1"
        />
        <button id="search_bar_btn1" onClick={handleSearch}>
          Search &ensp; <i className="fa fa-search"></i>
        </button>
      </div>
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
