




import axios from 'axios'
import  { useEffect, useState, useRef } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { useReactToPrint } from "react-to-print";



function Orders() {

    const [dels, setDels] = useState([]); 
    const [searchKey, setSearchKey] = useState();
    const [filteredItems, setFilteredItems] = useState([]);
    

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8020/readDel')
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
                dels.email && dels.email.toLowerCase().includes(searchKey.toLowerCase())
            );
            setFilteredItems(filteredData);
        }
    };

    
const handleDelivery = (order) => {
    
    navigate('../delPerson', { state: { order } });
};
    

    return <>
    
    <div>
            <div className="dash-header">
                <button className="btn">+ New Order</button>
                <a href=""><i class="fa-regular fa-bell icon-size"></i></a>
                <a href=""><i class="fa-solid fa-user icon-size profile-bg"></i> </a>
            </div>
            <div>
                <h1 className="heading1">Orders</h1>
            </div>
            
            <div className="order-area">
                <h3 className="heading1">Incoming Orders</h3>

                <div className="search-bar">
                    <input type="text"
                     name="searchID" 
                     id="searchID" 
                     value={searchKey}
                     onChange={(e) => setSearchKey(e.target.value)} 
                     className='search-input'
                     placeholder='Enter Email'
                     />
                     <i class="fa-solid fa-magnifying-glass i-color-blue" onClick={handleSearch}></i>
                </div>

                

                <div className="order-area-layout">
                <table className="report-table">
                    <thead className='report-table-head'>
                        <tr>
                            <th>Customer Name</th>
                            <th>Customer Email</th>
                            <th>Item Name</th>
                            <th>Item Quantity</th>
                            <th>Address</th>
                            <th>Delivery Fee</th>
                            <th>Total Price</th>
                            <th>Status</th>
                         </tr>
                    </thead>

                    <tbody className='report-table-body'>
                    {
                            filteredItems.map((dels) => {
                                return <tr>
                                    <td>{dels.full_name}</td>
                                    <td>{dels.email}</td>
                                    <td>{dels.item_name}</td>
                                    <td>{dels.item_quantity}</td>
                                    <td>{dels.address}</td>
                                    <td>Rs. {dels.delivery_fee}</td>
                                    <td>Rs. {dels.total_price}</td>
                                    <td>
                                    <button 
                                            className='delIssuebtn'
                                            onClick={() => handleDelivery(dels)}
                                            // disabled={dels.delivery_status === 'Handed Over'}
                                        >
                                            Assign
                                        </button>
                                    </td>
                                    <td>
                                    {/* <Link onClick={() => handleDelete(dels._id)}><i className="fa-solid fa-trash space i-color-red"></i></Link> */}
                                    </td> 
                                </tr>
                            })
                        }
                    </tbody>
   
</table>


                <img className="dash-img" src="./src/assets/dash-img.svg" alt="" srcset="" />
                </div>
            </div>
        </div>
    </>;
}


export default Orders