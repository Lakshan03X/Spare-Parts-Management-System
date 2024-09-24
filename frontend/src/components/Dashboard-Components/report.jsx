




import  { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Report() {
    return (
        <div>
            <div className="dash-header">
                <button className="btn">+ New Order</button>
                <a href=""><i class="fa-regular fa-bell icon-size"></i></a>
                <a href=""><i class="fa-solid fa-user icon-size profile-bg"></i> </a>
            </div>
            <div>
                <h1 className="heading1">Reports</h1>
            </div>
            
            <div className="order-area">
                <h3 className="heading1">Issues and Reports</h3>
                <div className="order-area-layout">
                <table className="order-table">
    <tr>
        <th>Issue ID</th>
        <th>Delivery Person Name</th>
        <th>Issue Description</th>
        <th>Action</th>
    </tr>

    <tr>
        <td>is0001</td>
        <td>John Doe</td>
        <td>Damaged during transport</td>
        <td>
            <button>Resolved</button>
            <button>Pending</button>
        </td>
    </tr>
    <tr>
        <td>is0002</td>
        <td>Jane Smith</td>
        <td>Missing parts</td>
        <td>
            <button>Resolved</button>
            <button>Pending</button>
        </td>
    </tr>
    <tr>
        <td>is0003</td>
        <td>Mike Johnson</td>
        <td>Incorrect size</td>
        <td>
            <button>Resolved</button>
            <button>Pending</button>
        </td>
    </tr>
</table>


                <img className="dash-img" src="./src/assets/dash-img.svg" alt="" srcset="" />
                </div>
            </div>
        </div>
    );
}

export default Report