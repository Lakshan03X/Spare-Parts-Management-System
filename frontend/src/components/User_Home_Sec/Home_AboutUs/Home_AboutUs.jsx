import React from "react";
import Homenav from "../Home_navbar";
import Footer from "../Home_nav_footers/home_footer";
import "./aboutUs.css";
import { Link } from 'react-router-dom'

function Home_AboutUs() {
  return (
    <>
      <Homenav />
      <section class="about-hero">
        <div class="hero-content">
          <h2>About Us</h2>
          <p>Welcome to our website, your trusted partner for all your vehicle needs. 
      With years of experience in the automotive industry, we specialize in providing
       high-quality stock parts and exceptional vehicle repair services. Our mission 
       is to ensure that your vehicle runs smoothly and efficiently, whether it’s through 
       top-notch repairs or sourcing the right parts.</p>
        </div>
      </section>
      <section class="about-us-content">
      
        <br />
        <h3>Why Choose Us?</h3>
       Our team consists of certified technicians with extensive knowledge of various 
       vehicle makes and models. We stay updated on the latest industry trends and 
       technologies, allowing us to provide you with the most effective solutions for your
        automotive needs.
        <h3>Quality Stock Parts</h3>
We understand that using the right parts is crucial for the longevity and performance of your vehicle. That’s why we offer an extensive selection of OEM and aftermarket stock parts, all sourced from reputable manufacturers. Our commitment to quality means you can trust that every part we sell meets the highest standards of performance and durability.

<h3>Customer-Centric Approach</h3>
At our core, we prioritize our customers. We believe in transparent communication, fair pricing, and building long-term relationships. Our knowledgeable staff is always ready to assist you, answer your questions, and provide recommendations based on your unique needs.

<h3>Community Engagement</h3>
We are more than just a repair shop; we are a part of the community. We strive to create a supportive environment for automotive enthusiasts, offering workshops, informational resources, and a space to share experiences and knowledge.

Let Us Serve You
Thank you for considering us for your automotive needs. We invite you to explore our website to learn more about our services, browse our stock parts, and get in touch with our team. Whether you're in need of immediate repairs or planning a future project, we’re here to help ensure your vehicle is always road-ready.
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

export default Home_AboutUs;
