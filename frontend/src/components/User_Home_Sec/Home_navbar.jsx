import React from 'react'
import "./Home_navbar.css"
import { Link } from 'react-router-dom'

function Home_navbar() {
  return (
   <>
   <header>
        <nav>
            <div class="logo">
                <h1>Spare Parts Management</h1>
            </div>
            <ul class="nav-links">
                <Link to="/home" className="link"><li>Home</li></Link>
                <Link to="/home_inventory" className="link"><li>Inventory</li></Link>
                <Link to="/home_feedback" className="link"><li>Suppliers</li></Link>
                <Link to="/home_orders" className="link"><li>Orders</li></Link>
                <Link to="/home_contact" className="link"><li>Contact Us</li></Link>
            </ul>
        </nav>
    </header>
   </>
  )
}

export default Home_navbar
