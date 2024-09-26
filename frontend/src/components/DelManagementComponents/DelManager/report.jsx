




import axios from 'axios'
import  { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Report() {

    const [delIssue, setDelIssue] = useState([]); // Initialize as an empty array

    useEffect(() => {
        axios.get('http://localhost:8020/readReport')
            .then(response => {
                setDelIssue(response.data); // Set the state with the data from response
            })
            .catch(err => console.log(err));
    }, []);

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
                            delIssue.map((delIssue) => {
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