// components/SurDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../css/survey/surDash.css';
import SurveyView from "./viewServey";

function SurDashboard() {
    const [surveys, setSurveys] = useState([]); // State to hold all surveys

   
    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const response = await axios.get('http://localhost:8020/getSurveys'); // Adjust this endpoint as necessary
                setSurveys(response.data); // Set the surveys data
            } catch (error) {
                console.error('There was an error fetching the surveys!', error);
            }
        };

        fetchSurveys(); // Call the function to fetch surveys
    }, []);

    return (
        <div className="surDash">
            
            {surveys.length === 0 ? (
                <p>No surveys available</p>
            ) : (
                surveys.map((survey) => (
                    <div key={survey._id} className="surveys-mini">
                        <h3 className="sur-head">{survey.title}</h3>
                        <Link to={`/survey/view/${survey._id}`}>
                            <button className="button-40" role="button">View</button>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
}

export default SurDashboard;
