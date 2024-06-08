import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Questionario from './components/Questionario'
import { useParams } from 'react-router-dom'; // Importe o hook useParams

const QuestionarioWithId = () => {
  const { id } = useParams();
  const questionarioId = id ? String(id) : ""; // Converter id para string ou definir como vazia se for undefined
  return <Questionario questionarioId={questionarioId} />;
};



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/questionario/:id" element={<QuestionarioWithId />} /> {/* Use a função de renderização QuestionarioWithId para passar o parâmetro id */}

      </Routes>
    </Router>
  </React.StrictMode>
)