// App.tsx
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import QuestionarioThumb from './components/QuestionarioThumb';

import questionarioData from '../questionario.json';

function App() {
  const [questionario, setQuestionario] = useState<any | null>(null);

  const handleClickThumb = (questionario: any) => {
    setQuestionario(questionario);
  };

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <h1 className='p-4 text-4xl font-bold text-center'>Bem-vindo ao App</h1>
      
      <div className='p-4'>
        <h2 className='text-2xl font-bold text-center'>Questionários</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {questionarioData.questionarios.map((q: any) => (
            <QuestionarioThumb key={q.id} questionario={q} onClick={handleClickThumb} />
          ))}
        </div>
      </div>
      {questionario && (
        <div className='fixed bottom-0 left-0 w-full bg-gray-800 p-4'>
          <p className='text-white'>Você selecionou o questionário: {questionario.title}</p>
        </div>
      )}
    </div>
  );
}

export default App;
