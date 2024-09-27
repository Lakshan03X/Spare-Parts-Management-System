
import  { useState } from 'react'
import {useNavigate} from 'react-router-dom'





function Dashboard() {

    // Get user data from local storage
    const delManager = JSON.parse(localStorage.getItem('delManager'));
    
    // Access the username
    const username = delManager ? delManager.username : null;

    return (
        <div>
            <div className="dash-header">
                <button className="btn">+ New Order</button>
                <a href=""><i class="fa-regular fa-bell icon-size"></i></a>
                <div>Hi , {username}</div>
                <a href=""><i class="fa-solid fa-user icon-size profile-bg"></i> </a>
            </div>
            <div>
                <h1 className="heading1">Dashboard</h1>
            </div>
            <div className="dash-sec1">
            <div className="stat-area">
                <div className="stat">
                    <i class="fa-solid fa-users icon-size i-color-purple"></i>
                    <div>
                    <p className="stat-name">Total Users</p>
                    <p className="stat-amount">7,500</p>
                    </div>
                </div>
                <div className="stat">
                    <i class="fa-solid fa-cart-shopping icon-size i-color-yellow "></i>
                    <div>
                    <p className="stat-name">Order Amount</p>
                    <p className="stat-amount">15,500</p>
                    </div>
                </div>
                <div className="stat">
                    <i class="fa-solid fa-dollar icon-size i-color-green"></i>
                    <div>
                    <p className="stat-name">Total Sales</p>
                    <p className="stat-amount">1,200</p>
                    </div>
                </div>
                <div className="stat">
                    <i class="fa-solid fa-motorcycle icon-size i-color-blue "></i>
                    <div>
                    <p className="stat-name">Active Riders</p>
                    <p className="stat-amount">80</p>
                    </div>
                </div>
            </div>
            <div className="sales-area">
                <h3 className="heading1">Sales Summary</h3>
                <table className="summary-table">
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Delivery Status</th>
                    </tr>

                    <tr>
                        <td>P0001</td>
                        <td>Shutters</td>
                        <td>10pcs</td>
                        <td>Rs. 1000.00</td>
                        <td>Delivered</td>
                    </tr>
                    <tr>
                        <td>P0002</td>
                        <td>Blinds</td>
                        <td>15pcs</td>
                        <td>Rs. 1500.00</td>
                        <td>Pending</td>
                    </tr>
                    <tr>
                        <td>P0003</td>
                        <td>Windows</td>
                        <td>5pcs</td>
                        <td>Rs. 2500.00</td>
                        <td>Shipped</td>
                    </tr>
                    <tr>
                        <td>P0004</td>
                        <td>Doors</td>
                        <td>7pcs</td>
                        <td>Rs. 3500.00</td>
                        <td>Delivered</td>
                    </tr>
                    <tr>
                        <td>P0005</td>
                        <td>Frames</td>
                        <td>20pcs</td>
                        <td>Rs. 2000.00</td>
                        <td>Processing</td>
                    </tr>
                </table>
            </div>
            </div>
            <div className="order-area">
                <h3 className="heading1">Order Summary</h3>
                <div className="order-area-layout">
                <table className="order-table">
                    <tr>
        <th>Category</th>
        <th>Total Orders</th>
        <th>Pending</th>
        <th>Shipped</th>
        <th>Delivered</th>
        <th>Processing</th>
                    </tr>

                    <tr>
        <td>Shutters</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
                    </tr>
                    <tr>
        <td>Blinds</td>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
                    </tr>
                    <tr>
        <td>Windows</td>
        <td>1</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
                    </tr>
                </table>
                <img className="dash-img" src="./src/assets/dash-img.svg" alt="" srcset="" />
                </div>
            </div>
        </div>
    );
}


export default Dashboard;



