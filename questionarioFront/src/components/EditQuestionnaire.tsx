import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditQuestionnaire = () => {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [theme, setTheme] = useState('light'); // Estado para controlar o tema

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

  const toggleTheme = () => {
    // Toggle between light and dark theme
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Função auxiliar para obter o placeholder conforme o tema
  const getPlaceholder = (field) => {
    return theme === 'light' ? `Enter ${field}` : `Enter ${field} (${theme} mode)`;
  };

  // Estilos baseados no tema selecionado
  const containerClass = theme === 'light' ? 'container mx-auto p-4 bg-gray-100' : 'container mx-auto p-4 bg-gray-800 text-white';
  const cardClass = theme === 'light' ? 'max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden' : 'max-w-md mx-auto bg-gray-700 shadow-md rounded-lg overflow-hidden';

  const inputClass = theme === 'light' ? 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black' : 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black';

  const labelClass = theme === 'light' ? 'block text-gray-700 text-sm font-bold mb-2' : 'block text-gray-300 text-sm font-bold mb-2';

  const buttonClass = theme === 'light' ? 'w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none' : 'w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none';

  return (
    <div className={containerClass}>
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleTheme}
          className={theme === 'light' ? 'text-gray-600 hover:text-gray-800 focus:outline-none' : ' hover:text-gray-200 focus:outline-none'}
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
      <h2 className={theme === 'light' ? 'text-3xl font-bold mb-6 text-center' : 'text-3xl font-bold mb-6 text-center text-white'}>
        Edit Questionnaire {id}
      </h2>
      {questionnaire ? (
        <div className={cardClass}>
          <div className="px-6 py-4">
            <label className={labelClass}>Title</label>
            <input
              type="text"
              placeholder={getPlaceholder('title')}
              value={questionnaire.title}
              onChange={(e) => setQuestionnaire({ ...questionnaire, title: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="px-6 py-4">
            <label className={labelClass}>Category</label>
            <input
              type="text"
              placeholder={getPlaceholder('category')}
              value={questionnaire.category}
              onChange={(e) => setQuestionnaire({ ...questionnaire, category: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="px-6 py-4">
            <h3 className={theme === 'light' ? 'text-lg font-bold mb-4' : 'text-lg font-bold mb-4 text-white'}>Questions</h3>
            {questionnaire.questions.map((question, index) => (
              <div key={index} className="mb-4">
                <label className={labelClass}>Question {index + 1}</label>
                <input
                  type="text"
                  placeholder={getPlaceholder(`question ${index + 1}`)}
                  value={question.question}
                  onChange={(e) => {
                    const newQuestions = [...questionnaire.questions];
                    newQuestions[index].question = e.target.value;
                    setQuestionnaire({ ...questionnaire, questions: newQuestions });
                  }}
                  className={inputClass}
                />
                <label className={labelClass}>Correct Answer</label>
                <input
                  type="text"
                  placeholder={getPlaceholder(`correct answer ${index + 1}`)}
                  value={question.correctAnswer}
                  onChange={(e) => {
                    const newQuestions = [...questionnaire.questions];
                    newQuestions[index].correctAnswer = e.target.value;
                    setQuestionnaire({ ...questionnaire, questions: newQuestions });
                  }}
                  className={inputClass}
                />
              </div>
            ))}
          </div>
          <div className="px-6 py-4">
            <button
              onClick={handleSave}
              className={buttonClass}
            >
              Save Questionnaire
            </button>
          </div>
        </div>
      ) : (
        <p className={theme === 'light' ? 'text-center text-gray-600' : 'text-center text-gray-400'}>Loading...</p>
      )}
    </div>
  );
};

export default EditQuestionnaire;
