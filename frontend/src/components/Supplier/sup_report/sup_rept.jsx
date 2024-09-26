import axios from "axios";
import Navbar from "../sup_navbar/sup_nav";
import { Link } from "react-router-dom";
import "./sup_rept.css";
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

function SupRept() {
  const [items, setItems] = useState([]); // Original items
  const [searchKey, setSearchKey] = useState(""); // Search key
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items
  const componentPDF = useRef();

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

  const generatePDF = useReactToPrint({
    content: () => {
      if (!componentPDF.current) {
        console.error("componentPDF is not defined!"); // Log if the ref is not defined
        return null;
      }
      return componentPDF.current; // Return the ref for printing
    },
    documentTitle: "Supplier Report",
    onAfterPrint: () => alert("PDF generated successfully"),
    onPrintError: (err) => console.error("PDF generation error:", err), // Added error logging
  });

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
        <header>
          <Link to="/item_create" className="add_btn">
            Create User&ensp;<i className="fa fa-plus" aria-hidden="true"></i>
          </Link>
          <h2>Manage Customers</h2>
          <div className="input_wrapper">
            <input
              type="search"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)} // Update search key
              placeholder="Search here . . ."
              className="search_bar"
            />
            <button className="search_bar_btn" onClick={handleSearch}>
              Search &ensp; <i className="fa fa-search"></i>
            </button>
          </div>
        </header>
        <button onClick={generatePDF} className="pdf_btn">
        Download Report &ensp; <i className="fa fa-download"></i>
      </button>
        <table className="report_table" ref={componentPDF}>
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
              <th>Actions</th>
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
                <td>
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
