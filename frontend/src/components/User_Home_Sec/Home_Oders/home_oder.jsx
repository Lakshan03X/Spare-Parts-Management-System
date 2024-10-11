import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Navbar from "../Home_navbar";
import Footer from "../Home_nav_footers/home_footer";
import "./home_oder.css";

function Home_oder() {
  // Get user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  // Access the username
  const username = user ? user.username : null;
  const u_address = user ? user.address : null;
  const u_email = user ? user.email : null;

  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [full_name, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [item_name, setitemName] = useState("");
  const [item_price, setitemPrice] = useState(1);
  const [item_quantity, setQuantity] = useState(1);
  const deliveryFee = 10;
  const [total_price, settotal_price] = useState(0);
  const [payment_methord, setPaymentMethod] = useState("cash");

  // Calculate total price based on item price, quantity, and delivery fee
  useEffect(() => {
    const totalPrice = item_price * item_quantity + deliveryFee;
    settotal_price(totalPrice);
  }, [item_price, item_quantity]);

  // Fetch data
  useEffect(() => {
    axios
      .get("http://localhost:8020/get_item/" + id)
      .then((result) => {
        setitemName(result.data.item_name);
        setitemPrice(result.data.item_price);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Post data to the database
  const Submit = (e) => {
    e.preventDefault();
    const delivery_fee = deliveryFee; // Set delivery fee
    const full_name = username;
    const email = u_email;
    const address = u_address;

    axios
      .post("http://localhost:8020/add_order", {
        full_name,
        email,
        address,
        item_name,
        item_price,
        delivery_fee,
        item_quantity,
        total_price,
        payment_methord,
      })
      .then((result) => {
        alert("Order added successfully!");
        console.log(result);
        setTimeout(() => {
          navigate("/home_inventory");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <>
      <Navbar />
      <form id="full_form" onSubmit={Submit}>
        <div id="details_container">
          <h3>Details Form</h3>
          <input
            type="text"
            id="input_view"
            value={"Name : " + username}
            readOnly
          />
          <input
            type="text"
            id="input_view"
            value={"Email : " + u_email}
            readOnly
          />
          <input
            type="text"
            id="input_view"
            value={"Address : " + u_address}
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
            onChange={(e) => setQuantity(e.target.value)}
            id="input_view"
            placeholder="Enter quantity"
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
            <select
              value={payment_methord}
              onChange={handlePaymentMethodChange}
              id="paymentMethod"
              name="paymentMethod"
              required
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </select>
            <br />
            <br />
          </div>

          {payment_methord === "card" && (
            <div id="cardDetails">
              <label htmlFor="cardName">Cardholder Name:</label>
              <input
                type="text"
                id="input_view"
                name="cardName"
                value={formData.cardName || ""}
                onChange={handleChange}
                required
              />
              <label htmlFor="cardNumber">Card No:</label>
              <input
                type="text"
                id="input_view"
                name="cardNumber"
                value={formData.cardNumber || ""}
                pattern="\d{16}" // Enforces exactly 16 digits
                title="Card number must be 16 digits long"
                maxLength="16" // Limits input to 16 digits
                onChange={handleChange}
                required
              />

              <label htmlFor="expireDate">Expiration Date:</label>
              <input
                type="month"
                id="input_view"
                name="expireDate"
                value={formData.expireDate || ""}
                onChange={handleChange}
                required
              />

              <label htmlFor="cvv">CVV:</label>
              <input
                type="text"
                id="input_view"
                name="cvv"
                value={formData.cvv || ""}
                pattern="\d{3}" // Enforces exactly 3 digits
                title="CVV must be 3 digits long"
                maxLength="3" // Limits input to 3 digits
                onChange={handleChange}
                required
              />
            </div>
          )}
        </div>
        <button type="submit" id="submit_btn">
          Place Order
        </button>
      </form>
      <Footer />
    </>
  );
}

export default Home_oder;
