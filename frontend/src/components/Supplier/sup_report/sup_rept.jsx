import axios from "axios";
import Navbar from "../sup_navbar/sup_nav";
import { Link } from "react-router-dom";
import "./sup_rept.css";
import React, { useEffect, useState, useRef } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function SupRept() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [items, setItems] = useState([]); // Original items
  const [searchKey, setSearchKey] = useState(""); // Search key
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items

  useEffect(() => {
    axios
      .get("http://localhost:8020/supplierReport")
      .then((result) => {
        setItems(result.data); // Store original data
        setFilteredItems(result.data); // Initialize filteredItems with the same data
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8020/delete_item/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload(); // optional one for reload page
      })
      .catch((err) => console.log(err));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Supplier Report", 10, 10);
    // Table headers
    const headers = [
      [
        "Item Name",
        "Item Quantity",
        "Item Model",
        "Item Price",
        "Item Weight",
        "Supplier ID",
        "Supplier Company",
        "Item Description",
      ],
    ];

    // Map data to table rows
    const data = filteredItems.map((item) => [
      item.item_name, // Change this to order.delivery_person_name or similar
      item.item_quantity,
      item.item_model,
      item.item_price,
      item.item_weight,
      item.supplier_id,
      item.supplier_company,
      item.item_description,
    ]);

    // Generate the table in the PDF
    doc.autoTable({
      head: headers,
      body: data,
    });

    doc.save("Supplier report.pdf"); // Save the PDF
  };

  // Search function
  const handleSearch = () => {
    if (searchKey.trim() === "") {
      // If the search key is empty, reset to original items
      setFilteredItems(items);
    } else {
      const filteredData = items.filter((item) =>
        item.item_name.toLowerCase().includes(searchKey.toLowerCase())
      );
      setFilteredItems(filteredData);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    // Filter data based on the selected suggestion
    const filteredData = items.filter((item) =>
      item.supplier_name.toLowerCase().includes(suggestion.toLowerCase())
    );
    setFilteredItems(filteredData);
  };
  return (
    <>
      <Navbar />
      <div className="report_section">
        <header id="head_rept">
          <Link to="/item_create" id="add_btn1">
            Add Item&ensp;<i className="fa fa-plus" aria-hidden="true"></i>
          </Link>
          <h2 id="h22">Manage Items</h2>
          <div id="input_wrapper1">
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
        <button
          onClick={generatePDF}
          disabled={isGeneratingPDF} // Disable button while generating PDF
          className="pdf_btn"
        >
          {isGeneratingPDF ? "Generating PDF..." : "Generate Report"}
          &ensp;<i className="fa fa-download"></i>
        </button>

        <table className="report_table">
          <thead className="report_table_head">
            <tr className="report_table_tr">
              <th>Item Name</th>
              <th>Item Quantity</th>
              <th>Item Model</th>
              <th>Item Price</th>
              <th>Item Weight</th>
              <th>Supplier ID</th>
              <th>Supplier Company</th>
              <th>Item Description</th>
              <th className="no-print">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={index}>
                <td>{item.item_name}</td>
                <td>{item.item_quantity}</td>
                <td>{item.item_model}</td>
                <td>{item.item_price}</td>
                <td>{item.item_weight}</td>
                <td>{item.supplier_id}</td>
                <td>{item.supplier_company}</td>
                <td>{item.item_description}</td>
                <td className="no-print">
                  <Link to={`/item_update/${item._id}`}>
                    <button className="edit_btn">
                      <i className="fa fa-pencil-square">&ensp;</i>
                      Edit
                    </button>
                  </Link>

                  <br />
                  <button
                    className="delete_btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    <i className="fa fa-trash">&ensp;</i>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SupRept;
