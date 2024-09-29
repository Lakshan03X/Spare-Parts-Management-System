import React, { useState, useEffect } from "react"; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../../css/survey/surDash.css';

function Survey() {
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('http://localhost:8020/getSurveys')
      .then((response) => {
        setSurveys(response.data);

      })
      .catch((error) => {
        console.error('There was an error fetching the surveys!', error);
      });
  }, []);

  // Handle survey deletion
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8020/surveys/${id}`)
      .then((response) => {
        setSurveys(surveys.filter(survey => survey._id !== id));
        navigate(0)
      })
      .catch((error) => {
        console.error('There was an error deleting the survey!', error);
      });
  };

  const handleAddSurvey = () => {
    navigate('/addSurvey'); 
  };
  return <>
    <div><button onClick={handleAddSurvey} className="button-40 padding-30">Add Survey</button></div>
    <div className="surDash">
        
      {surveys.length === 0 ? (
        <p>No surveys available</p>
      ) : (
        surveys.map((survey) => (
          <div key={survey._id} className="surveys">
            <div className="surveys-mini">
              <h3 className="sur-head">{survey.title}</h3>
              <Link to={`/survey/view/${survey._id}`}>
                <button className="button-40" role="button">View</button>
              </Link>
            </div>
            <div className="options">
              <Link to={`/survey/edit/${survey._id}`}>
                <i className="fa-regular fa-pen-to-square"></i>
              </Link>
              <Link onClick={() => handleDelete(survey._id)}>
                <i className="fa-solid fa-trash"></i>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
    </>
}

export default Survey;
