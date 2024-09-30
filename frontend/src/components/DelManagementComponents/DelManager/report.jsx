




import axios from 'axios'
import  { useEffect, useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'

function Report() {

    const [delIssue, setDelIssue] = useState([]); 
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

    const handleDelete = (id) => {
        axios
          .delete("http://localhost:8020/delReportDelete/" + id)
          .then((res) => {
            console.log(res);
            window.location.reload();
          })
          .catch((err) => console.log(err));
    };

    const handleResolve = (id) => {
        axios.put(`http://localhost:8020/delReportupdate/${id}`, { status: 'Resolved' })
            .then(response => {
                setFilteredItems(filteredItems.map(item => 
                    item._id === id ? { ...item, status: 'Resolved' } : item
                ));
            })
            .catch(err => console.log(err));
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
                            <th>Delivery Person Name</th>
                            <th>Delivery Person Email</th>
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
                                    <button 
                                            className='delIssuebtn'
                                            onClick={() => handleResolve(delIssue._id)}
                                            disabled={delIssue.status === 'Resolved'}
                                        >
                                            {delIssue.status === 'Resolved' ? 'Resolved' : 'Resolve'}
                                        </button>
                                    </td>
                                    <td>
                                    <Link onClick={() => handleDelete(delIssue._id)}><i className="fa-solid fa-trash space i-color-red"></i></Link>
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