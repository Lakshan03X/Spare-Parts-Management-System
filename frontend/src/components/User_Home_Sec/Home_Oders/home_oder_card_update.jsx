import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function HomeOrderCardUpdate() {
  const { id } = useParams();
  const [card_holder_name, setcard_holder_name] = useState("");
  const [card_holder_no, setcard_holder_no] = useState("");
  const [card_date, setcard_date] = useState("");
  const [card_cvv, setcard_cvv] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8020/get_card_d/" + id)
      .then((result) => {
        console.log(result);
        setcard_holder_name(result.data.card_holder_name);
        setcard_holder_no(result.data.card_holder_no);
        setcard_date(result.data.card_date);
        setcard_cvv(result.data.card_cvv);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8020/card_update/" + id, {
        card_holder_name,
        card_holder_no,
        card_date,
        card_cvv,
      })
      .then((result) => {
        console.log(result);
        setTimeout(() => {
          alert("Card details updated successfully");
          navigate(-1); // Navigate to the previous page
        }, 500); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={Update}> {/* Fixed form submission */}
        <div id="cardDetails">
          <label htmlFor="cardName">Cardholder Name:</label>
          <input
            type="text"
            id="input_view"
            name="cardName"
            value={card_holder_name}
            onChange={(e) => setcard_holder_name(e.target.value)}
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
            onChange={(e) => setcard_holder_no(e.target.value)}
            required
          />
          <label htmlFor="expireDate">Expiration Date:</label>
          <input
            type="month"
            id="input_view"
            name="expireDate"
            value={card_date}
            onChange={(e) => setcard_date(e.target.value)}
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
            onChange={(e) => setcard_cvv(e.target.value)}
            required
          />
          <button type="submit">Save Card Details</button> {/* Fixed button type */}
        </div>
      </form>
    </>
  );
}

export default HomeOrderCardUpdate;
