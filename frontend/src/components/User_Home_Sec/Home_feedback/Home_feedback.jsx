import React from "react";
import Navbar from "../Home_navbar";
import Footer from "../Home_nav_footers/home_footer";
import "./home_feedback.css";

function Home_feedback() {
  return (
    <>
      <Navbar />
      <div id="main_div">
        <tr id="tr">
          <td id="col_30">
            <div id="column_30">
              <form action="" id="feedback_form">
                <label htmlFor="">
                  <h3>- Name -</h3>
                  <input type="text" id="input" />
                </label>
                <label htmlFor="">
                  <h3>- Item Name -</h3>
                  <input type="text" id="input" />
                </label>
                <label htmlFor="">
                  <h3>- Item ID -</h3>
                  <input type="text" id="input" />
                </label>

                <div id="star_rating">
                  <h3>- Rating - </h3>
                  <input type="radio" id="star5" name="rating" value="5" />
                  <label for="star5" title="5 stars">
                    ★
                  </label>

                  <input type="radio" id="star4" name="rating" value="4" />
                  <label for="star4" title="4 stars">
                    ★
                  </label>

                  <input type="radio" id="star3" name="rating" value="3" />
                  <label for="star3" title="3 stars">
                    ★
                  </label>

                  <input type="radio" id="star2" name="rating" value="2" />
                  <label for="star2" title="2 stars">
                    ★
                  </label>

                  <input type="radio" id="star1" name="rating" value="1" />
                  <label for="star1" title="1 star">
                    ★
                  </label>
                </div>
                <label htmlFor="">
                  <h3>- Feedback -</h3>
                  <input type="text" id="input" />
                </label>
                <button id="submit_button" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </td>
          <td id="col_70">
            <div id="column_70">
              <div id="feedback_display">
                <h2>Thank you for your feedback!</h2>
                <p>Your feedback</p>
                <div id="user_rating">
                  <textarea
                    id="feedback"
                    name="feedback"
                    rows="5"
                    cols="50"
                    placeholder="Enter your feedback here..."
                    readOnly
                  ></textarea>
                </div>
                <p id="feedback_message">Your rating: 5 out of 4</p>
              </div>
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
