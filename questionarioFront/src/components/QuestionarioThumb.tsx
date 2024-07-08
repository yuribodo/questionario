// QuestionarioThumb.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface QuestionarioThumbProps {
  questionario: any;
  onClick: (questionario: any) => void;
}

const QuestionarioThumb: React.FC<QuestionarioThumbProps> = ({ questionario, onClick }) => {
  const handleClick = () => {
    onClick(questionario);
  };

  return (
    <div className='bg-gray-800 p-4 rounded-md shadow-2xl border cursor-pointer' onClick={handleClick}>
      <h3 className='text-xl font-bold'>{questionario.title}</h3>
      <p className='text-gray-400'>{questionario.description}</p>
      <Link to={`/questionario/${questionario.id}`} className='text-blue-400'>
        Ver Questionário
      </Link>
    </div>
  );
};

export default QuestionarioThumb;
