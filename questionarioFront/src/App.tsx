import { useEffect, useState } from 'react';
import QuestionarioThumb from './components/QuestionarioThumb';
import axios from 'axios';
import { useAtom } from 'jotai';
import { darkThemeAtom } from './lib/atom';
import { questionariosAtom } from './lib/atom';
const api = process.env.API_LINK

interface Question {
  id: number;
  type: string;
  question: string;
  choices: string[];
  correctChoice: string;
  questionarioId: number;
}

interface Questionario {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

function App() {
  const [questionario, setQuestionario] = useState<Questionario | null>(null);
  const [questionariosBack, setQuestionariosBack] = useAtom(questionariosAtom);
  const [darkTheme] = useAtom(darkThemeAtom);

  const handleClickThumb = (questionario: Questionario) => {
    setQuestionario(questionario);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<Questionario[]>(`${api}/questionarios`);
      setQuestionariosBack(response.data);
      
    } catch (error) {
      console.error('Error fetching questionarios:', error);
    }
  };

  useEffect(() => {
    if (questionariosBack.length === 0) {
      fetchData();
    }
  }, [questionariosBack, fetchData]);

  return (
    <div className={`min-h-screen space-y-14 ${darkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className='p-4'>
        <h2 className='text-3xl font-bold text-center mt-10 p-3'>Questionários</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white'>
          {questionariosBack.map((q) => (
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
