import React from 'react';
import { Link } from 'react-router-dom';
import { Questionario } from '../types';


interface QuestionarioThumbProps {
  questionario: Questionario;
}

const QuestionarioThumb: React.FC<QuestionarioThumbProps> = ({ questionario }) => {
  return (
    <div className='bg-gray-800 p-4 rounded-md shadow-md'>
      <h3 className='text-xl font-bold'>{questionario.title}</h3>
      <p className='text-gray-400'>{questionario.description}</p>
      <Link to={`/questionario/${questionario.id}`} className='text-blue-400'>
        Ver Questionário
      </Link>
    </div>
  );
};

export default QuestionarioThumb;
