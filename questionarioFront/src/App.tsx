import { Link } from 'react-router-dom'


function App() {
  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <h1 className='p-4 text-4xl font-bold text-center'>Bem-vindo ao App</h1>
      <div className='text-center'>
        <Link to="/questionario" className='bg-blue-500 p-2 rounded-md'>
          Ir para o Questionário
        </Link>
      </div>
    </div>
  )
}

export default App
