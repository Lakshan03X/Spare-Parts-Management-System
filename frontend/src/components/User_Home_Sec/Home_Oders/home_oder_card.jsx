import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function home_oder_card() {
  const [card_holder_name, setCardHolderName] = useState("");
  const [card_holder_no, setCardHolderNo] = useState("");
  const [card_date, setCardDate] = useState("");
  const [card_cvv, setCardCvv] = useState("");
  const navigate = useNavigate(); // Correct initialization of navigate

  const saveCardDetails = (e) => {
    e.preventDefault();

    const cardData = {
      card_holder_name,
      card_holder_no,
      card_date,
      card_cvv,
    };

    axios
      .post("http://localhost:8020/add_order_card", cardData)
      .then((result) => {
        alert("Card details saved successfully!");
        console.log(result);
        const cardId = result.data._id;
        navigate(-1);
        // navigate(`/home_order/${cardId}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form onSubmit={saveCardDetails}>
        <div id="cardDetails">
          <label htmlFor="cardName">Cardholder Name:</label>
          <input
            type="text"
            id="input_view"
            name="cardName"
            value={card_holder_name}
            onChange={(e) => setCardHolderName(e.target.value)}
            required
          />
          <label htmlFor="cardNumber">Card No:</label>
          <input
            type="text"
            id="input_view"
            name="cardNumber"
            pattern="\d{16}"
            title="Card number must be 16 digits long"
            maxLength="16"
            value={card_holder_no}
            onChange={(e) => setCardHolderNo(e.target.value)}
            required
          />
          <label htmlFor="expireDate">Expiration Date:</label>
          <input
            type="month"
            id="input_view"
            name="expireDate"
            value={card_date}
            onChange={(e) => setCardDate(e.target.value)}
            required
          />
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="input_view"
            name="cvv"
            pattern="\d{3}"
            title="CVV must be 3 digits long"
            maxLength="3"
            value={card_cvv}
            onChange={(e) => setCardCvv(e.target.value)}
            required
          />
          <button type="submit">Save Card Details</button>{" "}
          {/* Corrected button type */}
        </div>
      </form>
    </>
  );
}

export default home_oder_card;
