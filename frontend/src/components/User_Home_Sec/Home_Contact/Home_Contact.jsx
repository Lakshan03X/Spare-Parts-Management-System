import React from "react";
import Homenav from "../Home_navbar";




import Footer from "../Home_nav_footers/home_footer";
import "../Home_AboutUs/aboutUs.css";
import { Link } from 'react-router-dom'

function Home_Contact() {
  return (
    <>
      <Homenav />
      <section class="about-hero">
        <div class="hero-content">
          <h2>Contact Us</h2>
        </div>
      </section>
      <section class="contact-sec">

      <div className="contacr-sec-left">

<h1>Meet Us</h1>
<div className="contact-us-mini">
<i class="fa-solid fa-phone-volume i-color-purple "></i>
<span>+94 117 544 801</span>
</div>

<div className="contact-us-mini">
<i class="fa-solid fa-envelope i-color-purple "></i>
<span>customers@raceredge.com</span>
</div>

<div className="contact-us-mini">
<i class="fa-solid fa-location-dot i-color-purple "></i>
<span>SLIIT, Malabe</span>
</div>


</div>

        <div className="contacr-sec-right">

            <h1>Contact Us</h1>
            <form action="">

                <label htmlFor="">Enter Your Username : </label>
                <input type="text" className="con-input" />

                <label htmlFor="">Enter Your Email : </label>
                <input type="email" className="con-input"  />

                <label htmlFor="">Enter Your Phone : </label>
                <input type="phone" className="con-input"  />

                <label htmlFor="">Message :</label>
                <textarea name="" id="" ></textarea>

                <button className="btn">Send </button>
            </form>

        </div>
        
      </section>
      <Link to="/home_contact" className="floating-btn">
        <span class="floating-btn-icon">
          <i className="fa fa-plus-circle"></i>
        </span>
        <span class="floating-btn-text">Renspond a Survey</span>
      </Link>

      <Footer />
    </>
  );
}

export default Home_Contact;
