




import  { useState, useEffect } from 'react'
import {useNavigate, Link, useParams} from 'react-router-dom'
import axios from 'axios';


function DelReportUpdate() {

    const { id } = useParams();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [issue, setIssue] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        axios
          .get("http://localhost:8020/getDel/" + id)
          .then((result) => {
            console.log(result);
            setUserName(result.data.userName),
            setUserEmail(result.data.userEmail),
            setIssue(result.data.issue)
          })
          .catch((err) => console.log(err));
      }, [id]);
    
  
    
    const Update = (e) => {
        e.preventDefault();
        axios
          .put("http://localhost:8020/delReportupdate/" + id, {
            userName,
            userEmail,
            issue,
          })
          .then((result) => {
            console.log(result);
            setTimeout(() => {
              alert("Report Updated Successfully !!");
              navigate("/deliveryPerson/report"); 
            }, 500); 
          })
          .catch((err) => {
            console.log(err);
          });
      };

    return <>
        <div className="update-report">
            <div className="update-from-head">
            <Link to={'/deliveryPerson/report'} className='remove-text-decor'>
                <i class="fa-solid fa-arrow-left"></i>
                <span className='space'>Back</span>
            </Link>
            </div>
        <div className="report-sec">
            <form method='post' onSubmit={Update}>
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

                 <button type="submit"  className='report-sum-btn '>Update</button>

            </form>
            </div>
        </div>
    </>
}

export default DelReportUpdate