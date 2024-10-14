import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Deliveries() {
    const [track, setTracking] = useState([]); 
    const [searchKey, setSearchKey] = useState('');
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [loggedUserName, setLoggedUserName] = useState('');
    const [filteredDels, setFilteredDels] = useState([]); 

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

    useEffect(() => {
        const filteredData = track.filter(del => del.delP_email === loggedUserName && del.delivery_status != "Completed");
        setFilteredDels(filteredData);
    }, [track, loggedUserName]);

    const handleSearch = () => {
        if (searchKey.trim() === "") {
            setFilteredDels(track.filter(del => del.delP_email === loggedUserName));
        } else {
            const filtered = track.filter(del => 
                del.delP_email === loggedUserName && 
                del.cus_name && del.cus_name.toLowerCase().includes(searchKey.toLowerCase())
            );
            setFilteredDels(filtered);
        }
    };

    return (
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
                <h3 className="heading1">Assigned Deliveries</h3>

                <div className="search-bar">
                    <input 
                        type="text"
                        name="searchID" 
                        id="searchID" 
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)} 
                        className='search-input'
                        placeholder='Enter Customer Name'
                    />
                    <i className="fa-solid fa-magnifying-glass i-color-blue" onClick={handleSearch}></i>
                </div>

                <div className="order-area-layout">
                    <table className="report-table">
                        <thead className='report-table-head'>
                            <tr>
                                <th>Customer Name</th>
                                <th>Item Name</th>
                                <th>Item Quantity</th>
                                <th>Address</th>
                                <th>Total Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody className='report-table-body'>
                            {
                                filteredDels.map((dels) => (
                                    <tr key={dels._id}>
                                        <td>{dels.cus_name}</td>
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

                    <img className="dash-img" src="./src/assets/dash-img.svg" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Deliveries;
