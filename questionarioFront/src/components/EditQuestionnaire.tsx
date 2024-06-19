import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditQuestionnaire = () => {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);

  useEffect(() => {
    // Mock fetch questionnaire data by id
    const fetchQuestionnaire = async () => {
      // Simulate API call or database query
      const fetchedQuestionnaire = {
        id: id,
        title: 'Questionnaire ' + id,
        category: 'General',
        questions: [
          { id: 1, question: 'Sample question 1', correctAnswer: 'Sample answer 1' },
          { id: 2, question: 'Sample question 2', correctAnswer: 'Sample answer 2' },
        ],
      };
      setQuestionnaire(fetchedQuestionnaire);
    };
    fetchQuestionnaire();
  }, [id]);

  const handleSave = () => {
    // Save logic would be implemented here
    alert('Questionnaire saved!');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Questionnaire {id}</h2>
      {questionnaire ? (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              value={questionnaire.title}
              onChange={(e) => setQuestionnaire({ ...questionnaire, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="px-6 py-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <input
              type="text"
              value={questionnaire.category}
              onChange={(e) => setQuestionnaire({ ...questionnaire, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="px-6 py-4">
            <h3 className="text-lg font-bold mb-4">Questions</h3>
            {questionnaire.questions.map((question, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Question {index + 1}</label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) => {
                    const newQuestions = [...questionnaire.questions];
                    newQuestions[index].question = e.target.value;
                    setQuestionnaire({ ...questionnaire, questions: newQuestions });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <label className="block text-gray-700 text-sm font-bold mt-2">Correct Answer</label>
                <input
                  type="text"
                  value={question.correctAnswer}
                  onChange={(e) => {
                    const newQuestions = [...questionnaire.questions];
                    newQuestions[index].correctAnswer = e.target.value;
                    setQuestionnaire({ ...questionnaire, questions: newQuestions });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            ))}
          </div>
          <div className="px-6 py-4">
            <button
              onClick={handleSave}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
            >
              Save Questionnaire
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default EditQuestionnaire;
