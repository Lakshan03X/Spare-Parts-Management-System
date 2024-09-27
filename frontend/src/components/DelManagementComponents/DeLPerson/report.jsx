import  { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Report() {
    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState()
    const [issue, setIssue] = useState()
    const [loggedUserName, setLoggedUserName] = useState('');
    const [delIssue, setDelIssue] = useState([]);


    // Get user data from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    // Access the username
    const username = user ? user.username : null;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userName && userEmail && issue) {  
            axios.post('http://localhost:8020/addReport', { userName, userEmail, issue, status: 'Pending'  })
                .then(result => {
                    toast("Issue Submitted !!!")
                    setIssue('');
                    navigate('/deliveryPerson/report');
                })
                .catch(err => {
                    toast("Failed to Submit!!")
                    console.log(err);
                });
        } else {
            toast("Please fill in all fields!")
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8020/readReport')
            .then(response => {
                setDelIssue(response.data);
                const userData = JSON.parse(localStorage.getItem('user'));
                if (userData && userData.email) {
                    setUserName(userData.name);
                    setUserEmail(userData.email);
                    setLoggedUserName(userData.email);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const filteredReports = delIssue.filter(report => report.userEmail === loggedUserName);

    return (
        <div>
            <div className="dash-header">
            <div>Hi , {username}</div>
                <a href=""><i class="fa-regular fa-bell icon-size"></i></a>
                <a href=""><i class="fa-solid fa-user icon-size profile-bg"></i> </a>
            </div>
            <div>
                <h1 className="heading1">Reports</h1>
            </div>

            <div className="reports">
            <div className="report-sec">
            <form method='post' onSubmit={handleSubmit}>
                <label htmlFor="userName">User Name</label>
                <input type="text"
                
                className='report-input'
                 name="userName"
                 id="userName"
                 value={userName}
                 onChange={(e) => setUserName(e.target.value)} />

                <label htmlFor="userEmail">User Email</label>
                <input type="email"
                disabled
                className='report-input'
                 name="userEmail"
                 id="userEmail"
                 value={userEmail}
            
                 onChange={(e) => setUserEmail(e.target.value)} />

                <label htmlFor="issue">Issue</label>
                <textarea 
                className='report-issue'
                name="issue"
                 id="issue"
                 value={issue}
                 placeholder='Enter Your Issue Here...'
                 onChange={(e) => setIssue(e.target.value)}/>

                 <button type="submit"  className='report-sum-btn'>Send</button>

            </form>
            </div>

            <div className="report-table-sec">
                <h3 className="heading1">Issues and Reports</h3>
                <div className="order-area-layout">
                <table className="report-table">
                    <thead className='report-table-head'>
                        <tr>
                            <th>Issue ID</th>
                            <th>Delivery Person Name</th>
                            <th>Issue Description</th>
                            <th>Status</th>
                         </tr>
                    </thead>

                    <tbody className='report-table-body'>
                        {
                            filteredReports.map((report, index) => (
                                <tr key={index}>
                                    <td>{report.userName}</td>
                                    <td>{report.userEmail}</td>
                                    <td>{report.issue}</td>
                                    <td>
                                        <button>{report.status}</button>
                                    </td>
                                </tr>
                            ))

                        }
                    
                    </tbody>
   
</table>


                <img className="dash-img" src="./src/assets/dash-img.svg" alt="" srcset="" />
                </div>
                </div>
            </div>
                
            <ToastContainer />
        </div>
    );
}

export default Report