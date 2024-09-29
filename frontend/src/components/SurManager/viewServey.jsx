import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SurveyView() {
    const { id } = useParams(); 
    const [survey, setSurvey] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                const response = await axios.get(`http://localhost:8020/getSurveys/${id}`);
                setSurvey(response.data);
            } catch (error) {
                console.error('There was an error fetching the survey!', error);
                setError('Could not fetch survey data. Please try again later.');
            }
        };

        fetchSurvey();
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!survey) {
        return <p>Loading survey details...</p>; 
    }

    return (
        <div>
            <h1>{survey.title}</h1>
            <h2>Questions</h2>
            <ul>
                {survey.questions.map((question) => (
                    <li key={question.question}>
                        <strong>{question.question}</strong>
                        {question.answerType === 'multiple-choice' && (
                            <ul>
                                {question.options.map((option, idx) => (
                                    <li key={idx}>{option}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            <p>Created At: {new Date(survey.createdAt).toLocaleString()}</p>
        </div>
    );
}

export default SurveyView;
