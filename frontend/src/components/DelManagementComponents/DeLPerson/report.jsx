




import  { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Report() {
    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState()
    const [issue, setIssue] = useState()

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userName && userEmail && issue) {  
            axios.post('http://localhost:8020/addReport', { userName, userEmail, issue })
                .then(result => {
                    toast("Issue Submitted !!!")
                    setUserName('');
                    setUserEmail('');
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

    return (
        <div>
            <div className="dash-header">
                Hi, Chirath
                <a href=""><i class="fa-regular fa-bell icon-size"></i></a>
                <a href=""><i class="fa-solid fa-user icon-size profile-bg"></i> </a>
            </div>
            <div>
                <h1 className="heading1">Reports</h1>
            </div>

            <div className="report-sec">
            <form method='post' onSubmit={handleSubmit}>
                <label htmlFor="userName">User Name</label>
                <input type="text"
                className='report-input'
                 name="userName"
                 id="userName"
                 placeholder='Enter Username'
                 value={userName}
                 onChange={(e) => setUserName(e.target.value)} />

                <label htmlFor="userEmail">User Email</label>
                <input type="email"
                className='report-input'
                 name="userEmail"
                 id="userEmail"
                 value={userEmail}
                 placeholder='Enter Email'
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
                
            <ToastContainer />
        </div>
    );
}

export default Report