import React from 'react';
import QuestionForm from './QuestionForm';
import { addData as addQuestion } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddQuestion = () => {
  const navigate = useNavigate();
  const handleSubmit = async (questionData) => {
    try {
      await addQuestion(questionData); // Use the addQuestion API function
	  console.log('Question added successfully'); // Debug log for success
      navigate('/'); // Navigate to home page after successful addition
    } catch (error) {
      console.error("Error adding question", error);
    }
  };

  return (
    <div>
	  <h2 className="text-center">Adding</h2>
      <QuestionForm onSubmit={handleSubmit}/>
    </div>
  );
};

export default AddQuestion;