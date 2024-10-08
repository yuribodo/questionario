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
import { useParams } from 'react-router-dom'; 
import { ClerkProvider } from '@clerk/clerk-react'
import CreateQuestionario from './components/CreateQuestionario'
import Dashboard from './components/Dashboard/Dashboard'
import Sobre from './components/Sobre'
import EditQuestionnaire from './components/EditQuestionnaire'
import Navbar from './components/Navbar'
import QuestionnaireResponses from './components/QuestionnaireResponses'


// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const QuestionarioWithId = () => {
  const { id } = useParams();
  const questionarioId = id ? String(id) : ""; 
  return <Questionario questionarioId={questionarioId} />;
};


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <Navbar />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/questionario/:id" element={<QuestionarioWithId />} /> 
            <Route path='/createquestionario' element={<CreateQuestionario/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/sobre' element={<Sobre/>}/>
            <Route path="dashboard/edit/:id" element={<EditQuestionnaire />} />
            <Route path="/responses/:questionnaireId" element={<QuestionnaireResponses/>} />
          </Routes>
      </ClerkProvider>
    </Router>
  </React.StrictMode>
)
