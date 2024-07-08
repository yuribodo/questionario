import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate do React Router
import { Questionnaire } from './Dashboard';

interface ResponsesProps {
  questionnaires: Questionnaire[];
  handleQuestionnaireSelect: (questionnaire: Questionnaire) => void;
  darkTheme: boolean;
}

const Responses: React.FC<ResponsesProps> = ({ questionnaires, handleQuestionnaireSelect, darkTheme }) => {
  const navigate = useNavigate(); // Utilize useNavigate ao invés de useHistory

  const handleResponsesClick = (questionnaireId: number) => {
    // Redirecionar para a página de respostas do questionário com o ID específico
    navigate(`/responses/${questionnaireId.toString()}`); // Converta questionnaireId para string antes de passar
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Responses</h2>
      <div className="grid grid-cols-2 gap-4">
        {questionnaires.map((questionnaire) => (
          <div
            key={questionnaire.id}
            className={`p-4 border rounded cursor-pointer ${
              darkTheme ? 'border-gray-700' : 'border-gray-400'
            }`}
            onClick={() => handleQuestionnaireSelect(questionnaire)}
          >
            <h3 className="text-xl font-bold">{questionnaire.title}</h3>
            <p>{questionnaire.questions.length} perguntas</p>
            
            {/* Botão para ver as respostas */}
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => handleResponsesClick(questionnaire.id)}
            >
              Ver Respostas
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Responses;
