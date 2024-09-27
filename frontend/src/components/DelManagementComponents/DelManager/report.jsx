




import axios from 'axios'
import  { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Report() {

    const [delIssue, setDelIssue] = useState([]); // Initialize as an empty array
    const [searchKey, setSearchKey] = useState();
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8020/readReport')
            .then(response => {
                console.log(response.data);
                setDelIssue(response.data);
                setFilteredItems(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSearch = () => {
        if (searchKey.trim() === "") {
            setFilteredItems(delIssue);
        } else {
            const filteredData = delIssue.filter(issue => 
                issue.userEmail && issue.userEmail.toLowerCase().includes(searchKey.toLowerCase())
            );
            setFilteredItems(filteredData);
        }
    };

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
                            <th>Issue ID</th>
                            <th>Delivery Person Name</th>
                            <th>Issue Description</th>
                            <th>Action</th>
                         </tr>
                    </thead>

                    <tbody className='report-table-body'>
                    {
                            filteredItems.map((delIssue) => {
                                return <tr>
                                    <td>{delIssue.userName}</td>
                                    <td>{delIssue.userEmail}</td>
                                    <td>{delIssue.issue}</td>
                                    <td>
                                        <button >Resolved</button>
                                        <button>Pending</button>
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
    );
}

export default Report