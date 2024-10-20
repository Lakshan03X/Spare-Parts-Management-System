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

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8020/delete_serveyss/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload(); // optional one for reload page
      })
      .catch((err) => console.log(err));
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
          <Link to={`/survey_update/${survey._id}`}>
            <button className="edit_btn" id="editbtn">
              <i className="fa fa-pencil-square">&ensp;</i>
              Edit
            </button>
          </Link>
          {/* <button className="survey-item-button">Delete</button> */}
          <button
            className="delete_btn"
            id="deletebtn"
            onClick={() => handleDelete(survey._id)}
          >
            <i className="fa fa-trash">&ensp;</i>
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default SurveyComponent;
