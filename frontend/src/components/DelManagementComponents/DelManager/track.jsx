import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Track() {
    const [dels, setDels] = useState([]); 
    const [filteredItems, setFilteredItems] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8020/readDeliveries')
            .then(response => {
                console.log(response.data);
                setDels(response.data);
                setFilteredItems(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelivery = (order) => {
        navigate('../delPerson', { state: { order } });
    };

    return (
        <div>
            <div className="dash-header">
                <button className="btn">+ New Order</button>
                <a href=""><i className="fa-regular fa-bell icon-size"></i></a>
                <a href=""><i className="fa-solid fa-user icon-size profile-bg"></i></a>
            </div>
            <div>
                <h1 className="heading1">Track</h1>
            </div>
            
            <div className="order-area">
                <h3 className="heading1">Track Orders</h3>

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
                            </tr>
                        </thead>

                        <tbody className='report-table-body'>
                            {
                                filteredItems.map((dels) => (
                                    <tr key={dels._id}>
                                        <td>{dels.cus_name}</td>
                                        <td>{dels.delP_name}</td>
                                        <td>{dels.item_name}</td>
                                        <td>{dels.item_quantity}</td>
                                        <td>{dels.cus_address}</td>
                                        <td>Rs. {dels.total_price}</td>
                                        <td>{dels.delivery_status}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <img className="dash-img" src="./src/assets/dash-img.svg" alt="" />
            </div>
        </div>
    );
}

export default Track;
