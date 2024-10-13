import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

function Track() {
    const [dels, setDels] = useState([]); 
    const [searchKey, setSearchKey] = useState('');
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

    const handleSearch = () => {
        if (searchKey.trim() === "") {
            setFilteredItems(dels);
        } else {
            const filteredData = dels.filter(dels => 
                dels.delP_email && dels.delP_email.toLowerCase().includes(searchKey.toLowerCase())
            );
            setFilteredItems(filteredData);
        }
    };

    const generateReport = () => {
        const completedOrders = dels.filter(del => del.delivery_status === 'Completed').length;
        const assignedOrders = dels.length - completedOrders;

        const doc = new jsPDF();

        doc.text('Delivery Report', 10, 10);
        doc.text(`Total Orders: ${dels.length}`, 10, 20);
        doc.text(`Completed Orders: ${completedOrders}`, 10, 30);
        doc.text(`Assigned Orders: ${assignedOrders}`, 10, 40);

        doc.save('delivery_report.pdf');
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

                <div className="search-bar">
                    <input 
                        type="text"
                        name="searchID" 
                        id="searchID" 
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)} 
                        className='search-input'
                        placeholder='Enter Email'
                    />
                    <i className="fa-solid fa-magnifying-glass i-color-blue" onClick={handleSearch}></i>
                </div>

                <button className="btn" onClick={generateReport}>Generate Report</button>

                <div className="table-container">
                    <table className="report-table">
                        <thead className='report-table-head'>
                            <tr>
                                <th>Customer Name</th>
                                <th>Deliver Person Name</th>
                                <th>Delivery Person Email</th>
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
                                        <td>{dels.delP_email}</td>
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
