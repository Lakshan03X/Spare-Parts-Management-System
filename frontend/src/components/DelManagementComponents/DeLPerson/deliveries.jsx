




import axios from 'axios'
import  { useEffect, useState, useRef } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { useReactToPrint } from "react-to-print";



function Deliveries() {

    const [dels, setDels] = useState([]); 
    const [searchKey, setSearchKey] = useState();
    const [filteredItems, setFilteredItems] = useState([]);
    // const componentPDF = useRef();
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [loggedUserName, setLoggedUserName] = useState('');
    const [track, setTracking] = useState([]);

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
    

    return <>
    
    <div>
            <div className="dash-header">
                <button className="btn">+ New Order</button>
                <a href=""><i class="fa-regular fa-bell icon-size"></i></a>
                <a href=""><i class="fa-solid fa-user icon-size profile-bg"></i> </a>
            </div>
            <div>
                <h1 className="heading1">Deliveries</h1>
            </div>
            
            <div className="order-area">
                <h3 className="heading1">Assigned Deliveries</h3>

                {/* <div className="search-bar">
                    <input type="text"
                     name="searchID" 
                     id="searchID" 
                     value={searchKey}
                     onChange={(e) => setSearchKey(e.target.value)} 
                     className='search-input'
                     placeholder='Enter Email'
                     />
                     <i class="fa-solid fa-magnifying-glass i-color-blue" onClick={handleSearch}></i>
                </div> */}

                {/* <button onClick={generatePDF} className="pdf_btn">
                    Download Report &ensp; <i className="fa fa-download"></i>
                </button> */}

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


                <img className="dash-img" src="./src/assets/dash-img.svg" alt="" srcset="" />
                </div>
            </div>
        </div>
    </>;
}


export default Deliveries