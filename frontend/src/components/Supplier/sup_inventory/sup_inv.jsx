import React, { useEffect, useState } from "react";
import Navbar from "../sup_navbar/sup_nav";
import "./sup_inv.css";
import sparePartImage from "../sup_assets/spare_part.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

function sup_inv() {
  const [items, setItems] = useState([]); // Original items
  const [searchKey, setSearchKey] = useState(""); // Search key
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items

  useEffect(() => {
    axios
      .get("http://localhost:8020/supplierinv")
      .then((result) => {
        setItems(result.data); // Store original data
        setFilteredItems(result.data); // Initialize filteredItems with the same data
      })
      .catch((err) => console.log(err));
  }, []);

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

  return (
    <>
      <Navbar />
      <div className="supplier-container">
        <header>
          <Link to="/item_create" className="add_btn">
            Add Item&ensp;<i class="fa fa-plus" aria-hidden="true"></i>{" "}
          </Link>
          <h2>Supplier Inventory</h2>
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

        <div class="scroll_container">
          {filteredItems.map((item) => (
            <div class="item" key={item.id}>
              <img src={sparePartImage} alt="V8 Engine" />
              <h3>
                <p>{"Item Name - " + item.item_name}</p>
              </h3>
              <Link to={`/view_item/${item._id}`}>
                <button class="view-btn">View Item</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default sup_inv;
