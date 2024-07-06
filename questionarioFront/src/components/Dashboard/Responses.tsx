import React from 'react';
import { Questionnaire } from './Dashboard';

interface ResponsesProps {
  questionnaires: Questionnaire[];
  handleQuestionnaireSelect: (questionnaire: Questionnaire) => void;
  darkTheme: boolean;
}

const Responses: React.FC<ResponsesProps> = ({ questionnaires, handleQuestionnaireSelect, darkTheme }) => {
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
            <p className="text-gray-500">{questionnaire.category}</p>
            <p>{questionnaire.questions.length} perguntas</p>
            <p>{questionnaire.userResponses.length} respostas</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Responses;
