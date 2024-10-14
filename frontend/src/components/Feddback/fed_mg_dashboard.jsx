import React, { useEffect, useState, useRef } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import Navbar from "./feedback_nav/feedback_nav";
import "./fed_mg_dash.css";

function fed_mg_dashboard() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [feedbacks, setfeedbacks] = useState([]); // Original feedbacks
  const [searchKey, setSearchKey] = useState(""); // Search key
  const [filteredfeedbacks, setFilteredfeedbacks] = useState([]); // Filtered feedbacks
  const componentPDF = useRef();

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
        feedback.fed_item_name.toLowerCase().includes(searchKey.toLowerCase())
      );
      setFilteredfeedbacks(filteredData);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Feedback History", 10, 10);
    // Table headers
    const headers = [
      [
        "Full Name",
        "Email",
        "Item Name",
        "Item ID",
        "Rating",
        "Feedback Description",
      ],
    ];

    // Map data to table rows
    const data = filteredfeedbacks.map((feedback) => [
      feedback.fed_full_name, // Change this to order.delivery_person_name or similar
      feedback.fed_email,
      feedback.fed_item_name,
      feedback.fed_item_id,
      feedback.fed_rating,
      feedback.fed_feedback,
    ]);

    // Generate the table in the PDF
    doc.autoTable({
      head: headers,
      body: data,
    });

    doc.save("Feedback History.pdf"); // Save the PDF
  };

  return (
    <>
      <Navbar />
      <h2 style={{ textAlign: "center" }}>Feedback & Rating Management</h2>
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
        <button
          onClick={generatePDF}
          disabled={isGeneratingPDF} // Disable button while generating PDF
          className="pdf_btn"
          id="pdf_btn"
        >
          {isGeneratingPDF ? "Generating PDF..." : "Generate Report"}
          &ensp;<i className="fa fa-download"></i>
        </button>
      </header>
      <div id="main_table_fed">
        <table id="tbl">
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
