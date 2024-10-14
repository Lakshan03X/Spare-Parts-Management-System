import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Home_navbar";
import Footer from "../Home_nav_footers/home_footer";
import "./home_oder.css";

function Home_oder() {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user ? user.username : null;
  const u_address = user ? user.address : null;
  const u_email = user ? user.email : null;

  const { id } = useParams();
  const navigate = useNavigate();
  const [item_name, setitemName] = useState("");
  const [item_price, setitemPrice] = useState(0); // Set initial price to 0
  const [item_quantity, setQuantity] = useState(1);
  const deliveryFee = 10;
  const [filteredItems, setFilteredItems] = useState([]);
  const [cards, setcards] = useState([]);
  const [total_price, settotal_price] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const totalPrice = item_price * item_quantity + deliveryFee;
    settotal_price(totalPrice);
  }, [item_price, item_quantity]);

  useEffect(() => {
    axios
      .get(`http://localhost:8020/get_item/${id}`)
      .then((result) => {
        setitemName(result.data.item_name);
        setitemPrice(Number(result.data.item_price)); // Ensure price is a number
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios
      .get("http://localhost:8020/get_order_card")
      .then((result) => {
        setcards(result.data);
        setFilteredItems(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Submit = (e) => {
    e.preventDefault();

    const full_name = username;
    const email = u_email;
    const address = u_address;
    const delivery_fee = deliveryFee;

    const orderData = {
      full_name,
      email,
      address,
      item_name,
      item_price: item_price.toString(), // Convert to string for storage
      delivery_fee: delivery_fee.toString(),
      item_quantity: item_quantity.toString(),
      total_price: total_price.toString(),
      payment_method: paymentMethod,
    };

    axios
      .post("http://localhost:8020/add_order", orderData) // Include orderData
      .then((result) => {
        alert("Order added successfully!");
        setTimeout(() => {
          navigate("/home_inventory");
        }, 2000);
      })
      .catch((err) => {
        console.log("AxiosError:", err);
      });
  };

  const handleCardSelect = (card) => {
    if (selectedCard && selectedCard._id === card._id) {
      setSelectedCard(null);
      setPaymentMethod("cash");
    } else {
      setSelectedCard(card);
      setPaymentMethod("card");
    }
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8020/delete_order_card/" + id)
      .then((res) => {
        console.log(res);
        setFilteredItems(filteredItems.filter((card) => card._id !== id)); // Update state to remove deleted card
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div id="flex_box">
        <form id="full_form" onSubmit={Submit}>
          <div id="details_container">
            <h3>Details Form</h3>
            <input
              type="text"
              value={"Name : " + username}
              id="input_view"
              readOnly
            />
            <input
              type="text"
              value={"Email : " + u_email}
              id="input_view"
              readOnly
            />
            <input
              type="text"
              value={"Address : " + u_address}
              id="input_view"
              readOnly
            />
            <input
              type="text"
              value={"Item Name : " + item_name}
              id="input_view"
              readOnly
            />
            <input
              type="text"
              value={"Item Price : Rs. " + item_price + " /="}
              id="input_view"
              readOnly
            />
            <input
              type="text"
              value={"Delivery Fee : " + deliveryFee + " /="}
              id="input_view"
              readOnly
            />
            <input
              type="number"
              onChange={(e) => setQuantity(Number(e.target.value))}
              id="input_view"
              placeholder="Enter quantity"
              min="1"
              required
            />
            <input
              type="text"
              value={"Total Price : Rs. " + total_price + " /="}
              id="input_view"
              readOnly
            />
          </div>

          <div id="payment_container">
            <h3>Payment Form</h3>
            <div id="payment-method">
              <label htmlFor="paymentMethod">Payment Method : </label>
              <input
                type="text"
                value={paymentMethod === "cash" ? "Cash" : "Card"}
                readOnly
                style={{ border: "none", padding: "5px" }}
              />
            </div>
            <br />
            <Link to="/add_card_page">
              <button id="add_card">Add Card</button>
            </Link>
          </div>
          <button type="submit" id="submit_btn">
            Place Order
          </button>
        </form>

        <div id="save-card-details">
          {filteredItems.map((cardDetail, index) => (
            <div key={index} id="card_details">
              <input
                type="text"
                placeholder="Card Holder Name"
                value={cardDetail.card_holder_name}
                readOnly
              />
              <br />
              <input
                type="text"
                placeholder="Card Number"
                value={cardDetail.card_holder_no}
                readOnly
              />
              <br />
              <input
                type="text"
                placeholder="Expiration Date"
                value={cardDetail.card_date}
                readOnly
              />
              <br />
              <input
                type="password"
                placeholder="cvv"
                value={cardDetail.card_cvv}
                readOnly
              />
              <br />
              <input
                type="checkbox"
                name="select"
                id="select"
                value="card"
                checked={selectedCard && selectedCard._id === cardDetail._id}
                onChange={() => handleCardSelect(cardDetail)}
              />{" "}
              Select
              <br />
              <Link to={`/card_update/${cardDetail._id}`}>
                <button className="edit_btn" id="edit_card">
                  <i className="fa fa-pencil-square">&ensp;</i>
                  Edit
                </button>
              </Link>
              <button
                className="delete_btn"
                id="delete_card"
                onClick={() => handleDelete(cardDetail._id)}
              >
                <i className="fa fa-trash">&ensp;</i>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home_oder;
