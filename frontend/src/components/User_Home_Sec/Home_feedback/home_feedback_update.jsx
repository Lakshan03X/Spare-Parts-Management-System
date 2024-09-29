import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./home_feedback.css";

function HomeFeedbackUpdate() {
  const { id } = useParams();
  const [fed_full_name, setfed_full_name] = React.useState("");
  const [fed_item_name, setfed_item_name] = React.useState("");
  const [fed_item_id, setfed_item_id] = React.useState("");
  const [fed_rating, setfed_rating] = React.useState("");
  const [fed_feedback, setfed_feedback] = React.useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8020/get_feedbacks/" + id)
      .then((result) => {
        console.log(result);
        setfed_full_name(result.data.fed_full_name);
        setfed_item_name(result.data.fed_item_name);
        setfed_item_id(result.data.fed_item_id);
        setfed_rating(result.data.fed_rating);
        setfed_feedback(result.data.fed_feedback);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Updating new data to database
  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8020/feedback_update/" + id, {
        fed_full_name,
        fed_item_name,
        fed_item_id,
        fed_rating,
        fed_feedback,
      })
      .then((result) => {
        console.log(result);
        setTimeout(() => {
          alert("updated");
          navigate("/home_feedback"); // Navigate to the homepage after updating
        }, 500); // Show success notification
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div id="update_fed_main">
        <td id="col_30">
          <div id="column_30">
            <form id="feedback_form" onSubmit={Update}>
              <label htmlFor="fed_full_name">
                <h3>- Edit Name -</h3>
                <input
                  type="text"
                  id="fed_full_name"
                  value={fed_full_name}
                  onChange={(e) => setfed_full_name(e.target.value)}
                />
              </label>
              <label htmlFor="fed_item_name">
                <h3>- Edit Item Name -</h3>
                <input
                  type="text"
                  id="fed_item_name"
                  value={fed_item_name}
                  onChange={(e) => setfed_item_name(e.target.value)}
                />
              </label>
              <label htmlFor="fed_item_id">
                <h3>- Edit Item ID -</h3>
                <input
                  type="text"
                  id="fed_item_id"
                  value={fed_item_id}
                  onChange={(e) => setfed_item_id(e.target.value)}
                />
              </label>

              <div id="star_rating">
                <h3>- Edit Rating - </h3>
                <input
                  type="radio"
                  id="star5"
                  name="rating"
                  value="5"
                  checked={fed_rating === "5"}
                  onChange={(e) => setfed_rating(e.target.value)}
                />
                <label htmlFor="star5" title="5 stars">
                  ★
                </label>

                <input
                  type="radio"
                  id="star4"
                  name="rating"
                  value="4"
                  checked={fed_rating === "4"}
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
                  checked={fed_rating === "3"}
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
                  checked={fed_rating === "2"}
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
                  checked={fed_rating === "1"}
                  onChange={(e) => setfed_rating(e.target.value)}
                />
                <label htmlFor="star1" title="1 star">
                  ★
                </label>
              </div>
              <label htmlFor="fed_feedback">
                <h3>- Edit Feedback -</h3>
                <input
                  type="text"
                  id="fed_feedback"
                  value={fed_feedback}
                  onChange={(e) => setfed_feedback(e.target.value)}
                />
              </label>
              <button id="submit_button" type="submit">
                Update Feedback
              </button>
            </form>
          </div>
        </td>
      </div>
    </>
  );
}

export default HomeFeedbackUpdate;
