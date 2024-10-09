import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { Link } from "react-router-dom";
import "./user_main.css";
import Navbar from "../user_manager/user_mg_nav/user_mg_nav";

function user_rept() {
  const [users, setUsers] = useState([]); // State for all users
  const [searchKey, setSearchKey] = useState(""); // Search key
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items
  const componentPDF = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:8020/get_user")
      .then((result) => {
        setUsers(result.data);
        setFilteredItems(result.data); // Show all users initially
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8020/deleteUser/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "user Report",
    // onAfterPrint: () => alert("PDF generated successfully"),
    onPrintError: (err) => console.error("PDF generation error:", err),
  });

  // Search function
  const handleSearch = () => {
    if (searchKey.trim() === "") {
      // Reset to original users if search key is empty
      setFilteredItems(users);
    } else {
      const filteredData = users.filter((user) =>
        user.name.toLowerCase().includes(searchKey.toLowerCase())
      );
      setFilteredItems(filteredData);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    const filteredData = users.filter((user) =>
      user.name.toLowerCase().includes(suggestion.toLowerCase())
    );
    setFilteredItems(filteredData);
  };

  return (
    <>
      <div id="main_div">
        <tr id="tr">
          <td id="col_30">
            <div id="column_30">
              <Navbar />
            </div>
          </td>
          <td id="col_70">
            <div id="column_70">
              <h2 id="hh">Manage Customers</h2>
              <Link to="/createUser" id="add_btn">
                Create User&ensp;
                <i className="fa fa-plus" aria-hidden="true"></i>
              </Link>
              <div id="input_wrapper">
                <input
                  type="search"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder="Search here . . ."
                  id="search_bar"
                />
                <button id="search_bar_btn" onClick={handleSearch}>
                  <i className="fa fa-search"></i>
                </button>
              </div>
              <button onClick={generatePDF} id="user_pdf_btn">
                Download Report &ensp; <i className="fa fa-download"></i>
              </button>
              <div ref={componentPDF}>
                <table id="user_Table">
                  <thead>
                    <tr>
                      <th id="nameHeader">Name</th>
                      <th id="emailHeader">Email</th>

                      <th id="passwordHeader">Password</th>
                      <th id="emailHeader">Age</th>
                      <th id="addressHeader">Address</th>
                      <th id="contactHeader">Contact</th>
                      <th id="userTypeHeader">User Type</th>
                      <th id="userTypeHeader">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((user, index) => (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.age}</td>
                        <td>{user.address}</td>
                        <td>{user.contact_no}</td>
                        <td>{user.user_type}</td>
                        <td>
                          <Link to={`/user_update/${user._id}`}>
                            <button className="edit_btn">
                              <i className="fa fa-pencil-square">&ensp;</i>
                              Edit
                            </button>
                          </Link>
                          <br />
                          <button
                            className="delete_btn"
                            onClick={() => handleDelete(user._id)}
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
            </div>
          </td>
        </tr>
      </div>
    </>
  );
}

export default user_rept;
