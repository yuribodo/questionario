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


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/questionario" element={<Questionario />} />
      </Routes>
    </Router>
  </React.StrictMode>
)