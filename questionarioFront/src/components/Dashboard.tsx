import { useState, ChangeEvent } from 'react';
import {  UserProfile } from '@clerk/clerk-react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
import LineGraph from './Graph/Line';
import PieGraph from './Graph/Pie';
import { Switch } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';


interface Question {
  id: number;
  question: string;
  correctAnswer: string;
}

interface UserResponse {
  userId: number;
  answers: string[];
  date: string;
}

interface Questionnaire {
  id: number;
  title: string;
  category: string;
  questions: Question[];
  userResponses: UserResponse[];
}

interface AnalyticsData {
  name: string; // Supondo que `name` seja uma data no formato string
  Responses: number;
}

export interface GraphData {
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string[];
    hoverOffset?: number;
  }[];
  labels: string[];
}

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  

  const themeLabel = darkTheme ? '🌙' : '☀️';

  const [questionnaires] = useState<Questionnaire[]>([
    {
      id: 1,
      title: 'Questionnaire 1',
      category: 'General',
      questions: [
        { id: 1, question: 'Qual é a sua cor favorita?', correctAnswer: 'Azul' },
        { id: 2, question: 'Qual é o seu animal favorito?', correctAnswer: 'Cachorro' },
      ],
      userResponses: [
        { userId: 1, answers: ['Azul', 'Gato'], date: '2023-01-01' },
        { userId: 2, answers: ['Vermelho', 'Cachorro'], date: '2023-01-02' },
        { userId: 3, answers: ['Azul', 'Cachorro'], date: '2023-01-03' },
        { userId: 4, answers: ['Azul', 'Cachorro'], date: '2023-01-04' },
        { userId: 5, answers: ['Verde', 'Coelho'], date: '2023-01-05' },
        { userId: 6, answers: ['Amarelo', 'Cachorro'], date: '2023-01-06' },
        { userId: 7, answers: ['Azul', 'Cachorro'], date: '2023-01-07' },
      ],
    },
    {
      id: 2,
      title: 'Questionnaire 2',
      category: 'Food',
      questions: [
        { id: 1, question: 'Qual é a sua comida favorita?', correctAnswer: 'Pizza' },
        { id: 2, question: 'Qual é o seu esporte favorito?', correctAnswer: 'Futebol' },
      ],
      userResponses: [
        { userId: 1, answers: ['Pizza', 'Basquete'], date: '2023-02-01' },
        { userId: 2, answers: ['Hambúrguer', 'Futebol'], date: '2023-02-02' },
        { userId: 3, answers: ['Pizza', 'Futebol'], date: '2023-02-03' },
        { userId: 4, answers: ['Pizza', 'Futebol'], date: '2023-02-04' },
        { userId: 5, answers: ['Pizza', 'Futebol'], date: '2023-02-05' },
        { userId: 6, answers: ['Pizza', 'Basquete'], date: '2023-02-06' },
        { userId: 7, answers: ['Hambúrguer', 'Futebol'], date: '2023-02-07' },
      ],
    },
    // Adicionar mais questionários conforme necessário
  ]);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleQuestionnaireSelect = (questionnaire: Questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
  };

  
  {/*
    const calculateCorrectAnswers = (userAnswers: string[], correctAnswers: string[]) => {
    return userAnswers.reduce((count, answer, index) => {
      return count + (answer === correctAnswers[index] ? 1 : 0);
    }, 0);
  };
    
    */}

  const prepareAnalyticsData = (questionnaire: Questionnaire): { data: GraphData } => {
    const data: AnalyticsData[] = [];
  
    questionnaire.userResponses.forEach((response) => {
      const existingData = data.find((d) => d.name === response.date);
      if (existingData) {
        existingData.Responses += 1;
      } else {
        data.push({ name: response.date, Responses: 1 });
      }
    });
  
    // Ordenar dados por data
    data.sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
  
    // Preparar os dados no formato esperado pelos gráficos
    const graphData: GraphData = {
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: 'Responses',
          data: data.map((item) => item.Responses),
          borderColor: 'red' // Exemplo de cor da borda
        }
      ]
    };
  
    return { data: graphData };
  };

  const filteredQuestionnaires = questionnaires.filter((questionnaire) =>
    (selectedFilter === 'all' || questionnaire.category === selectedFilter) &&
    questionnaire.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <div className={`relative flex ${darkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Sidebar */}
      <div className={`w-64 h-screen p-8 ${sidebarOpen ? '' : 'hidden'}`}>
        <h2 className="text-lg font-bold mb-4">Dashboard</h2>
        <nav>
          <ul>
            <li>
              <button
                onClick={() => handleTabChange('overview')}
                className={`w-full py-2 px-4 rounded mb-2 ${
                  selectedTab === 'overview'
                    ? darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'
                    : 'hover:bg-gray-700'
                }`}
              >
                Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange('analytics')}
                className={`w-full py-2 px-4 rounded mb-2 ${
                  selectedTab === 'analytics'
                    ? darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'
                    : 'hover:bg-gray-700'
                }`}
              >
                Analytics
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange('responses')}
                className={`w-full py-2 px-4 rounded mb-2 ${
                  selectedTab === 'responses'
                    ? darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'
                    : 'hover:bg-gray-700'
                }`}
              >
                Responses
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange('settings')}
                className={`w-full py-2 px-4 rounded mb-2 ${
                  selectedTab === 'settings'
                    ? darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'
                    : 'hover:bg-gray-700'
                }`}
              >
                Settings
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Separador */}
      <div className="border-r border-gray-400 h-screen"></div>

      {/* Conteúdo Principal */}
      <div className="w-3/4 p-8 relative flex-1">
        <div className="flex items-center justify-between mb-4">
          <Tooltip anchorSelect=".my-anchor-element1" place="top">
            Ocultar Barra Lateral!
          </Tooltip>
          <Tooltip anchorSelect=".my-anchor-element2" place="top">
            Mostrar Barra Lateral!
          </Tooltip>
          <button
            onClick={toggleSidebar}
            className={`text-gray-700 px-4 py-2 rounded mr-4 ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-300'} ${
              sidebarOpen ? 'my-anchor-element1' : 'my-anchor-element2'
            }`}
          >
            {sidebarOpen ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
          </button>
          <button
            onClick={toggleTheme}
            className={`text-gray-700 px-4 py-2 rounded ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}
          >
            Alternar Tema
          </button>
        </div>

        {selectedTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              {questionnaires.map((questionnaire) => (
                <div
                  key={questionnaire.id}
                  className="p-4 border border-gray-400 rounded cursor-pointer"
                  onClick={() => handleQuestionnaireSelect(questionnaire)}
                >
                  <h3 className="text-xl font-bold">{questionnaire.title}</h3>
                  <p className="text-gray-500">{questionnaire.category}</p>
                  <p>{questionnaire.questions.length} perguntas</p>
                  <p>{questionnaire.userResponses.length} respostas</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <div>
              <h3 className="text-xl font-bold mb-2">Questionnaires</h3>
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className={`px-4 py-2 border rounded ${
                    darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                  }`}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <select
                  value={selectedFilter}
                  onChange={handleFilterChange}
                  className={`ml-2 px-4 py-2 border rounded ${
                    darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <option value="all">All</option>
                  <option value="General">General</option>
                  <option value="Food">Food</option>
                  {/* Adicione mais opções de filtro conforme necessário */}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {filteredQuestionnaires.map((questionnaire) => (
                  <div
                    key={questionnaire.id}
                    className={`p-4 border rounded cursor-pointer ${
                      darkTheme ? 'border-gray-700' : 'border-gray-400'
                    }`}
                    onClick={() => handleQuestionnaireSelect(questionnaire)}
                  >
                    <h4 className="text-lg font-bold">{questionnaire.title}</h4>
                    <p className="text-gray-500">{questionnaire.category}</p>
                  </div>
                ))}
              </div>
              {selectedQuestionnaire && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold mb-2">Analytics for {selectedQuestionnaire.title}</h3>
                  {/* Gráfico de Respostas */}
                  <div className="mb-4">
                    <h4 className="text-lg font-bold mb-2">Responses Over Time</h4>
                    <LineGraph data={prepareAnalyticsData(selectedQuestionnaire).data} />
                  </div>
                  {/* Gráfico de Respostas Corretas */}
                  <div className="mb-4">
                    <h4 className="text-lg font-bold mb-2">Correct Answers</h4>
                    <PieGraph data={prepareAnalyticsData(selectedQuestionnaire).data} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedTab === 'responses' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Responses</h2>
            <div className="grid grid-cols-2 gap-4">
              {questionnaires.map((questionnaire) => (
                <div
                  key={questionnaire.id}
                  className={`p-4 border rounded cursor-pointer ${
                    darkTheme ? 'border-gray-700' : 'border-gray-400'
                  }`}
                  onClick={() => handleQuestionnaireSelect(questionnaire)}
                >
                  <h3 className="text-xl font-bold">{questionnaire.title}</h3>
                  <p className="text-gray-500">{questionnaire.category}</p>
                  <p>{questionnaire.questions.length} perguntas</p>
                  <p>{questionnaire.userResponses.length} respostas</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'settings' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Settings</h2>

          {/* Toggle Theme */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">Theme</h3>
            <FormControlLabel
              control={
                <Switch
                  checked={darkTheme}
                  onChange={toggleTheme}
                  name="themeSwitch"
                  color="primary"
                />
              }
              label={themeLabel} 
            />
          </div>

          {/* User Profile */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold">Profile</h3>
            <div className="flex justify-center">
              <UserProfile />
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Dashboard;
