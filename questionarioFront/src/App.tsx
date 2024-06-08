import { Link } from 'react-router-dom';
import questionarioData from '../questionario.json';
import QuestionarioThumb from './components/QuestionarioThumb';


const questionarios: any[] = questionarioData.questionarios; 

function App() {
  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <h1 className='p-4 text-4xl font-bold text-center'>Bem-vindo ao App</h1>
      <div className='text-center'>
        <Link to="/questionario" className='bg-blue-500 p-2 rounded-md'>
          Ir para o Questionário
        </Link>
      </div>
      <div className='p-4'>
        <h2 className='text-2xl font-bold text-center'>Questionários</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {questionarios.map((q: any)  => ( 
            <QuestionarioThumb key={q.id} questionario={q} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
