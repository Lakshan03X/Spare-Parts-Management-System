import axios from 'axios';
import { useEffect, useState } from 'react';

import {useNavigate, Link, useLocation} from 'react-router-dom'

function DelPerson() {
    const [del, setDel] = useState([]); 
    const [filteredItems, setFilteredItems ] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const order = location.state?.order;

    console.log(order)

    useEffect(() => {
        axios.get('http://localhost:8020/readDelPerson')
            .then(response => {
                console.log('Data:', response.data); 
                setDel(response.data);
                setFilteredItems(response.data);
            })
            .catch(err => console.log(err));
    }, []);



    const handleAssign = (del) => {
    const deliveryData = {
        cus_name: order.full_name,
        cus_email: order.email,
        cus_phone: order.phone,
        cus_address: order.address,
        delP_name: del.name,
        delP_email: del.email,
        item_name: order.item_name,
        item_quantity: order.item_quantity,
        total_price: order.total_price,
        delivery_status: 'Assigned'
    };

    // Save delivery data
    axios.post('http://localhost:8020/addDelivery', deliveryData)
        .then(response => {
            console.log('Delivery created:', response.data);

            // After successfully creating the delivery, delete the order
            return axios.delete(`http://localhost:8020/incomingDelDelete/${order._id}`); 
        })
        .then(() => {
            console.log('Order deleted successfully');
            navigate('../order'); // Navigate to the order page
        })
        .catch(err => {
            console.error(err);
            
        });


    }

    return (
        <div>
            <div className="dash-header">
                <button className="btn">+ New Order</button>
                <a href=""><i className="fa-regular fa-bell icon-size"></i></a>
                <a href=""><i className="fa-solid fa-user icon-size profile-bg"></i> </a>
            </div>
            <div>
                <h1 className="heading1">Deliver Persons</h1>
            </div>
            
            <div className="order-area">
                <h3 className="heading1">Assign Delivery</h3>

                <div className="order-area-layout">
                    <table className="report-table">
                        <thead className='report-table-head'>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Vehicle Type</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='report-table-body'>
                            {filteredItems.length > 0 ? (
                                filteredItems.map((del) => (
                                    <tr>
                                        <td>{del.name}</td>
                                        <td>{del.email}</td>
                                        <td>{del.phone}</td>
                                        <td>{del.vehicleType}</td>
                                        <td>{del.address}</td>
                                        <td>
                                            {/* Action buttons or links */}
                                            <button 
                                            className='delIssuebtn'
                                            onClick={() => handleAssign(del)}>Assign</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <img className="dash-img" src="./src/assets/dash-img.svg" alt="Dashboard" />
                </div>
            </div>
        </div>
    );
}

export default DelPerson;
