import React, { useEffect, useState } from "react";
import axios from "axios";

function fed_mg_dashboard() {
  const [feedbacks, setfeedbacks] = useState([]); // Original feedbacks
  const [searchKey, setSearchKey] = useState(""); // Search key
  const [filteredfeedbacks, setFilteredfeedbacks] = useState([]); // Filtered feedbacks

  useEffect(() => {
    axios
      .get("http://localhost:8020/get_feedbackToAdmin")
      .then((result) => {
        setfeedbacks(result.data); // Store original data
        setFilteredfeedbacks(result.data); // Initialize filtered feedback
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = () => {
    if (searchKey.trim() === "") {
      // If the search key is empty, reset to original items
      setFilteredfeedbacks(feedback);
    } else {
      const filteredData = feedbacks.filter((feedback) =>
        feedback.fed_full_name.toLowerCase().includes(searchKey.toLowerCase())
      );
      setFilteredfeedbacks(filteredData);
    }
  };

  return (
    <>
      <div>
        <header id="hh">
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
        </header>

        <table>
          <tr>
            <th>Name</th>
            <th>email</th>
            <th>Item Name</th>
            <th>Item Id</th>
            <th>Rating </th>
            <th>Feedback</th>
          </tr>
          {filteredfeedbacks.map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.fed_full_name}</td>
              <td>{feedback.fed_email}</td>
              <td>{feedback.fed_item_name}</td>
              <td>{feedback.fed_item_id}</td>
              <td>{feedback.fed_rating}</td>
              <td>{feedback.fed_feedback}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}

export default fed_mg_dashboard;
