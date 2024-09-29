// components/UpdateSurvey.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateSurvey() {
    const { id } = useParams();
    const [survey, setSurvey] = useState({
        title: '',
        questions: [{ question: '', options: [''], answerType: 'text' }]
    });
    const navigate = useNavigate();

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSurvey((prevSurvey) => ({
            ...prevSurvey,
            [name]: value
        }));
    };

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const questions = [...survey.questions];
        questions[index][name] = value;
        setSurvey({ ...survey, questions });
    };

    const handleOptionChange = (questionIndex, optionIndex, e) => {
        const questions = [...survey.questions];
        questions[questionIndex].options[optionIndex] = e.target.value;
        setSurvey({ ...survey, questions });
    };

    const addQuestion = () => {
        setSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: [...prevSurvey.questions, { question: '', options: [''], answerType: 'text' }]
        }));
    };

    const addOption = (questionIndex) => {
        const questions = [...survey.questions];
        questions[questionIndex].options.push('');
        setSurvey({ ...survey, questions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8020/updateSurvey/${id}`, survey);
            navigate('/surManager/surveys'); // Navigate to surveys page or any other page after update
        } catch (error) {
            console.error('There was an error updating the survey!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Update Survey</h1>
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={survey.title}
                    onChange={handleChange}
                    required
                />
            </label>
            <h2>Questions</h2>
            {survey.questions.map((question, index) => (
                <div key={index}>
                    <label>
                        Question:
                        <input
                            type="text"
                            name="question"
                            value={question.question}
                            onChange={(e) => handleQuestionChange(index, e)}
                            required
                        />
                    </label>
                    <label>
                        Answer Type:
                        <select
                            name="answerType"
                            value={question.answerType}
                            onChange={(e) => handleQuestionChange(index, e)}
                        >
                            <option value="text">Text</option>
                            <option value="multiple-choice">Multiple Choice</option>
                        </select>
                    </label>
                    <h3>Options</h3>
                    {/* Render options only if answerType is 'multiple-choice' */}
                    {question.answerType === 'multiple-choice' && question.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, optionIndex, e)}
                                required
                            />
                        </div>
                    ))}
                    {question.answerType === 'multiple-choice' && (
                        <button type="button" onClick={() => addOption(index)}>Add Option</button>
                    )}
                </div>
            ))}
            <button type="button" onClick={addQuestion}>Add Question</button>
            <button type="submit">Update Survey</button>
        </form>
    );
}

export default UpdateSurvey;
