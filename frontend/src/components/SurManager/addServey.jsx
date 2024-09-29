import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/survey/addServey.css'
import axios from 'axios';

function AddSurvey() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', answerType: 'text', options: [''] }]);

  // Handle form input changes for questions
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  // Handle option change for multiple choice questions
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  // Add a new question to the form
  const addQuestion = () => {
    setQuestions([...questions, { question: '', answerType: 'text', options: [''] }]);
  };

  // Add a new option to a multiple-choice question
  const addOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push('');
    setQuestions(newQuestions);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && questions.length > 0) {
      axios.post('http://localhost:8020/addSurvey', { title, questions })
        .then(result => {
          toast("Survey Submitted Successfully!");
          setTitle('');
          setQuestions([{ question: '', answerType: 'text', options: [''] }]);
        })
        .catch(err => {
          toast("Failed to Submit Survey");
          console.log(err);
        });
    } else {
      toast("Please fill in all fields!");
    }
  };

  return (
    <div className='addSur'>
      <h1>Create a Survey</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Survey Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="report-input"
        />

        {questions.map((q, index) => (
          <div key={index}>
            <label>Question {index + 1}</label>
            <input
              type="text"
              className="report-input"
              value={q.question}
              onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
              required
            />

            <label>Answer Type</label>
            <select
              className="report-input"
              value={q.answerType}
              onChange={(e) => handleQuestionChange(index, 'answerType', e.target.value)}
            >
              <option value="text">Text</option>
              <option value="multiple-choice">Multiple Choice</option>
            </select>

            {q.answerType === 'multiple-choice' && q.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>Option {optionIndex + 1}</label>
                <input
                  type="text"
                  className="report-input"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                  required
                />
              </div>
            ))}

            {q.answerType === 'multiple-choice' && (
              <button type="button" onClick={() => addOption(index)}>
                Add Option
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addQuestion} className="report-sum-btn">
          Add Question
        </button>

        <button type="submit" className="report-sum-btn">Submit Survey</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddSurvey
