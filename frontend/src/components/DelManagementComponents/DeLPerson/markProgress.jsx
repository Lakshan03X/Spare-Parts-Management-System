import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Track() {
    const [dels, setDels] = useState([]); 
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [loggedUserName, setLoggedUserName] = useState('');
    const [track, setTracking] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8020/readDeliveries')
            .then(response => {
                setTracking(response.data);
                const userData = JSON.parse(localStorage.getItem('user'));
                if (userData && userData.email) {
                    setUserName(userData.username);
                    setUserEmail(userData.email);
                    setLoggedUserName(userData.email);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const filteredDels = track.filter(track => track.delP_email === loggedUserName);

    const handleDelivery = (id) => {
        axios.put(`http://localhost:8020/updateDelivery/${id}`, { delivery_status: 'Completed' })
            .then(response => {
                setTracking(prev => 
                    prev.map(delivery => 
                        delivery._id === id ? { ...delivery, delivery_status: 'Completed' } : delivery
                    )
                );
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <div>
                <div className="dash-header">
                    <button className="btn">+ New Order</button>
                    <a href=""><i className="fa-regular fa-bell icon-size"></i></a>
                    <a href=""><i className="fa-solid fa-user icon-size profile-bg"></i></a>
                </div>
                <div>
                    <h1 className="heading1">Deliveries</h1>
                </div>
                
                <div className="order-area">
                    <h3 className="heading1">Mark Progress</h3>

                    <div className="order-area-layout">
                        <div className="table-container">
                            <table className="report-table">
                                <thead className='report-table-head'>
                                    <tr>
                                        <th>Customer Name</th>
                                        <th>Deliver Person Name</th>
                                        <th>Item Name</th>
                                        <th>Item Quantity</th>
                                        <th>Address</th>
                                        <th>Total Price</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody className='report-table-body'>
                                    {
                                        filteredDels.map((dels) => (
                                            <tr key={dels._id}>
                                                <td>{dels.cus_name}</td>
                                                <td>{dels.delP_name}</td>
                                                <td>{dels.item_name}</td>
                                                <td>{dels.item_quantity}</td>
                                                <td>{dels.cus_address}</td>
                                                <td>Rs. {dels.total_price}</td>
                                                <td>{dels.delivery_status}</td>
                                                <td>
                                                    <button 
                                                        className='delIssuebtn'
                                                        disabled={dels.delivery_status === "Completed"}
                                                        onClick={() => handleDelivery(dels._id)}
                                                    >
                                                        Complete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <img className="dash-img" src="./src/assets/dash-img.svg" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Track;
