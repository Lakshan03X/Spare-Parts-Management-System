import React, { useEffect, useState } from "react";
import Navbar from "../Home_navbar";
import Footer from "../Home_nav_footers/home_footer";
// import sparePartImage from "./";
import axios from "axios";
import { Link } from "react-router-dom";

function Home_inventory() {
  const [items, setItems] = useState([]); // Original items
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items

  useEffect(() => {
    axios
      .get("http://localhost:8020/home_inventory_view")
      .then((result) => {
        setItems(result.data); // Store original data
        setFilteredItems(result.data); // Initialize filteredItems with the same data
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Navbar />
      <div>
        <div class="scroll_container">
          {filteredItems.map((item) => (
            <div class="item" key={item.id}>
              {/* <img src={sparePartImage} alt="V8 Engine" /> */}
              <h3>
                <p>{"Item Name - " + item.item_name}</p>
                <p>{"Item Price - Rs." + item.item_price}</p>
              </h3>
              <Link to={`/home_order/${item._id}`}>
                <button class="view-btn">Add To Cart</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home_inventory;
