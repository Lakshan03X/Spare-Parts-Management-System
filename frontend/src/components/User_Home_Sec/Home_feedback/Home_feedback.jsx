import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../Home_navbar";
import Footer from "../Home_nav_footers/home_footer";
import "./home_feedback.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home_feedback() {
  // Get user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  // Access the username and email
  const username = user ? user.username : null;
  const u_email = user ? user.email : null;

  // State variables to handle form inputs
  const [fed_item_name, setfed_item_name] = useState("");
  const [fed_item_id, setfed_item_id] = useState("");
  const [fed_rating, setfed_rating] = useState("");
  const [fed_feedback, setfed_feedback] = useState("");

  // State variables for feedback list
  const [feedbacks, setfeedbacks] = useState([]); // Original feedbacks
  const [filteredfeedbacks, setFilteredfeedbacks] = useState([]); // Filtered feedbacks

  const navigate = useNavigate();

  // Helper function to check if item name contains numbers
  const containsNumbers = (str) => /\d/.test(str);

  const Submit = (e) => {
    e.preventDefault();

    // Validation for item name and feedback length
    if (containsNumbers(fed_item_name)) {
      toast.error("Item name should not contain numbers.", { autoClose: 3000 });
      return;
    }

    if (fed_feedback.length < 10) {
      toast.error("Feedback should be at least 10 characters long.", {
        autoClose: 3000,
      });
      return;
    }

    // If validations pass, make API call
    axios
      .post("http://localhost:8020/addFeedback", {
        fed_full_name: username,
        fed_email: u_email,
        fed_item_name,
        fed_item_id,
        fed_rating,
        fed_feedback,
      })
      .then((result) => {
        toast.success("Feedback added successfully!", { autoClose: 3000 });
        setTimeout(() => {
          navigate("/home_feedback");
          window.location.reload();
        }, 1000); // Redirect after submission
      })
      .catch((err) => {
        toast.error("Error adding feedback.", { autoClose: 3000 });
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8020/get_feedback")
      .then((result) => {
        setfeedbacks(result.data); // Store original data
        setFilteredfeedbacks(result.data); // Initialize filtered feedback
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8020/delete_feedback/" + id)
      .then((res) => {
        toast.success("Feedback deleted successfully!", { autoClose: 3000 });
        window.location.reload(); // Reload page after deletion
      })
      .catch((err) => {
        toast.error("Error deleting feedback.", { autoClose: 3000 });
        console.log(err);
      });
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
                  <input type="text" id="input" value={username} readOnly />
                </label>
                <label htmlFor="">
                  <h3>- Email -</h3>
                  <input type="text" id="input" value={u_email} readOnly />
                </label>
                <label htmlFor="">
                  <h3>- Item Name -</h3>
                  <input
                    type="text"
                    id="input"
                    onChange={(e) => setfed_item_name(e.target.value)}
                    required
                  />
                </label>
                <label htmlFor="">
                  <h3>- Item ID -</h3>
                  <input
                    type="text"
                    id="input"
                    onChange={(e) => setfed_item_id(e.target.value)}
                    required
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
                    required
                  />
                  <label htmlFor="star5" title="5 stars">
                    ★
                  </label>

                  <input
                    type="radio"
                    id="star4"
                    name="rating"
                    value="4"
                    onChange={(e) => setfed_rating(e.target.value)}
                  />
                  <label htmlFor="star4" title="4 stars">
                    ★
                  </label>

                  <input
                    type="radio"
                    id="star3"
                    name="rating"
                    value="3"
                    onChange={(e) => setfed_rating(e.target.value)}
                  />
                  <label htmlFor="star3" title="3 stars">
                    ★
                  </label>

                  <input
                    type="radio"
                    id="star2"
                    name="rating"
                    value="2"
                    onChange={(e) => setfed_rating(e.target.value)}
                  />
                  <label htmlFor="star2" title="2 stars">
                    ★
                  </label>

                  <input
                    type="radio"
                    id="star1"
                    name="rating"
                    value="1"
                    onChange={(e) => setfed_rating(e.target.value)}
                  />
                  <label htmlFor="star1" title="1 star">
                    ★
                  </label>
                </div>
                <label htmlFor="">
                  <h3>- Feedback -</h3>
                  <input
                    type="text"
                    id="input"
                    onChange={(e) => setfed_feedback(e.target.value)}
                    minLength="10"
                    required
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
                  <h3>
                    {" "}
                    {feedback.fed_full_name} ! Thank you for your feedback!
                  </h3>
                  <h4>{u_email}</h4>
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
                  <p id="feedback_message">
                    Rating - 5 out of {feedback.fed_rating}
                  </p>
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
                <h3>Thank you for your feedback!</h3>
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <Footer />

      <ToastContainer />
    </>
  );
}

export default Home_feedback;
