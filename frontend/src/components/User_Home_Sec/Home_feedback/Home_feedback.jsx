import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Home_navbar";
import Footer from "../Home_nav_footers/home_footer";
import "./home_feedback.css";

function Home_feedback() {
  const [fed_full_name, setfed_full_name] = React.useState();
  const [fed_item_name, setfed_item_name] = React.useState();
  const [fed_item_id, setfed_item_id] = React.useState();
  const [fed_rating, setfed_rating] = React.useState();
  const [fed_feedback, setfed_feedback] = React.useState();

  const [feedbacks, setfeedbacks] = useState([]); // Original items
  const [filteredfeedbacks, setFilteredfeedbacks] = useState([]); // Filtered items

  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8020/addFeedback", {
        fed_full_name,
        fed_item_name,
        fed_item_id,
        fed_rating,
        fed_feedback,
      })
      .then((result) => {
        console.log(result);
        alert("added");
        setTimeout(() => {
          navigate("/home_feedback");
        }, 2000); // Show success notification
        // navigate('/'); // Navigate to the homepage after adding the user
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8020/get_feedback")
      .then((result) => {
        setfeedbacks(result.data); // Store original data
        setFilteredfeedbacks(result.data); // Initialize filteredItems with the same data
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8020/delete_feedback/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload(); // optional one for reload page
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div id="main_div">
        <tr id="tr">
          <td id="col_30">
            <div id="column_30">
              <form action="" id="feedback_form" onSubmit={Submit}>
                <label htmlFor="">
                  <h3>- Name -</h3>
                  <input
                    type="text"
                    id="input"
                    onChange={(e) => setfed_full_name(e.target.value)}
                  />
                </label>
                <label htmlFor="">
                  <h3>- Item Name -</h3>
                  <input
                    type="text"
                    id="input"
                    onChange={(e) => setfed_item_name(e.target.value)}
                  />
                </label>
                <label htmlFor="">
                  <h3>- Item ID -</h3>
                  <input
                    type="text"
                    id="input"
                    onChange={(e) => setfed_item_id(e.target.value)}
                  />
                </label>

                <div id="star_rating">
                  <h3>- Rating - </h3>
                  <input
                    type="radio"
                    id="star5"
                    name="rating"
                    value="5"
                    onChange={(e) => setfed_rating(e.target.value)}
                  />
                  <label for="star5" title="5 stars">
                    ★
                  </label>

                  <input
                    type="radio"
                    id="star4"
                    name="rating"
                    value="4"
                    onChange={(e) => setfed_rating(e.target.value)}
                  />
                  <label for="star4" title="4 stars">
                    ★
                  </label>

                  <input
                    type="radio"
                    id="star3"
                    name="rating"
                    value="3"
                    onChange={(e) => setfed_rating(e.target.value)}
                  />
                  <label for="star3" title="3 stars">
                    ★
                  </label>

                  <input
                    type="radio"
                    id="star2"
                    name="rating"
                    value="2"
                    onChange={(e) => setfed_rating(e.target.value)}
                  />
                  <label for="star2" title="2 stars">
                    ★
                  </label>

                  <input
                    type="radio"
                    id="star1"
                    name="rating"
                    value="1"
                    onChange={(e) => setfed_rating(e.target.value)}
                  />
                  <label for="star1" title="1 star">
                    ★
                  </label>
                </div>
                <label htmlFor="">
                  <h3>- Feedback -</h3>
                  <input
                    type="text"
                    id="input"
                    onChange={(e) => setfed_feedback(e.target.value)}
                  />
                </label>
                <button id="submit_button" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </td>
          <td id="col_70">
            <div id="column_70">
              {filteredfeedbacks.map((feedback, index) => (
                <div id="feedback_display" key={index}>
                  <h2>
                    {" "}
                    {feedback.fed_full_name} : Thank you for your feedback!
                  </h2>
                  <p>Item Name : {feedback.fed_item_name}</p>
                  <p>Item ID : {feedback.fed_item_id}</p>
                  <p>Your feedback</p>
                  <div id="user_rating">
                    <textarea
                      id="feedback"
                      name="feedback"
                      rows="5"
                      cols="50"
                      placeholder={feedback.fed_feedback}
                      readOnly
                    ></textarea>
                  </div>
                  <p id="feedback_message">Rating - 5 out of {feedback.fed_rating}</p>
                  <Link to={`/feedback_update/${feedback._id}`}>
                    <button className="edit_btn">
                      <i className="fa fa-pencil-square">&ensp;</i>
                      Edit
                    </button>
                  </Link>

                  <br />
                  <button
                    className="delete_btn"
                    onClick={() => handleDelete(feedback._id)}
                  >
                    <i className="fa fa-trash">&ensp;</i>
                    Delete
                  </button>
                </div>
              ))}
              <div id="feedback_display">
                <h2>Thank you for your feedback!</h2>
                <p>Your feedback</p>
                <div id="user_rating">
                  <textarea
                    id="feedback"
                    name="feedback"
                    rows="5"
                    cols="50"
                    placeholder="Its ok but i did not expect that..."
                    readOnly
                  ></textarea>
                </div>
                <p id="feedback_message">Your rating: 5 out of 1</p>
              </div>
            </div>
          </td>
        </tr>
      </div>
      <Footer />
    </>
  );
}

export default Home_feedback;
