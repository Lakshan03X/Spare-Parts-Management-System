import React from "react";
import Homenav from "../Home_navbar";
import Footer from "../Home_nav_footers/home_footer";
import "./Home_page.css";
import { Link } from 'react-router-dom'

function Home_page() {
  return (
    <>
      <Homenav />
      <section class="hero">
        <div class="hero-content">
          <h2>Manage Your Spare Parts with Ease</h2>
          <p>
            Seamlessly track inventory, manage suppliers, handle orders, and
            generate reports.
          </p>
          <a href="#inventory" class="cta-btn">
            Get Started
          </a>
        </div>
      </section>
      <section class="features">
        <div class="feature" id="inventory">
          <h3>Inventory Management</h3>
          <p>
            Keep track of your spare parts, stock levels, and availability in
            real time.
          </p>
          <a href="#">Explore Inventory</a>
        </div>
        <div class="feature" id="suppliers">
          <h3>Supplier Management</h3>
          <p>
            Add, manage, and track your suppliers' performance and part
            deliveries.
          </p>
          <a href="#">Manage Suppliers</a>
        </div>
        <div class="feature" id="orders">
          <h3>Order Processing</h3>
          <p>
            Handle all your customer orders and ensure timely delivery with
            ease.
          </p>
          <a href="#">View Orders</a>
        </div>
        <div class="feature" id="reports">
          <h3>Appoinments and Services</h3>
          <p>
            Generate detailed monthly or annual reports to gain insights into
            performance.
          </p>
          <a href="#">Generate Reports</a>
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

export default Home_page;
