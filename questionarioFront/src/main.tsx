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
import { ClerkProvider } from '@clerk/clerk-react'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const QuestionarioWithId = () => {
  const { id } = useParams();
  const questionarioId = id ? String(id) : ""; // Converter id para string ou definir como vazia se for undefined
  return <Questionario questionarioId={questionarioId} />;
};



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/questionario/:id" element={<QuestionarioWithId />} /> {/* Use a função de renderização QuestionarioWithId para passar o parâmetro id */}

        </Routes>
      </ClerkProvider>
    </Router>
  </React.StrictMode>
)