import React, { useState } from 'react';
import Overview from './Overview';
import Analytics from './Analytics';
import Responses from './Responses';
import Settings from './Settings';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export interface Question {
  id: number;
  question: string;
  correctAnswer: string;
}

export interface Questionnaire {
  id: number;
  title: string;
  category: string;
  questions: Question[];
  userResponses: string[];
}

export interface GraphData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

const Dashboard: React.FC = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [questionnaires] = useState<Questionnaire[]>([
    {
      id: 1,
      title: 'Questionário 1',
      category: 'Geral',
      questions: [
        { id: 1, question: 'Pergunta 1?', correctAnswer: 'Resposta A' },
        { id: 2, question: 'Pergunta 2?', correctAnswer: 'Resposta B' },
      ],
      userResponses: ['Resposta A', 'Resposta B'],
    },
    {
      id: 2,
      title: 'Questionário 2',
      category: 'Comida',
      questions: [
        { id: 1, question: 'Pergunta 1?', correctAnswer: 'Resposta A' },
        { id: 2, question: 'Pergunta 2?', correctAnswer: 'Resposta B' },
      ],
      userResponses: ['Resposta A', 'Resposta B'],
    },
    // Adicionar mais questionários conforme necessário
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(null);

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const handleQuestionnaireSelect = (questionnaire: Questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
  };

  const prepareAnalyticsData = (questionnaire: Questionnaire): { data: GraphData } => {
    // Lógica para preparar dados analíticos aqui
    return {
      data: {
        labels: questionnaire.questions.map((question) => question.question),
        datasets: [
          {
            label: 'Respostas',
            data: [10, 20, 30], // Dados fictícios para exemplo
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
    };
  };

  return (
    <div className={`flex h-screen ${darkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      {sidebarOpen && (
        <aside className={`w-64 bg-gray-200 ${darkTheme ? 'text-white bg-gray-800' : 'text-gray-800'}`}>
          <nav className="p-4">
            <ul>
              <li>
                <button
                  onClick={() => setSelectedTab('overview')}
                  className={`block py-2 px-4 rounded w-full text-left ${
                    selectedTab === 'overview' ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedTab('analytics')}
                  className={`block py-2 px-4 rounded w-full text-left ${
                    selectedTab === 'analytics' ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedTab('responses')}
                  className={`block py-2 px-4 rounded w-full text-left ${
                    selectedTab === 'responses' ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  Responses
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedTab('settings')}
                  className={`block py-2 px-4 rounded w-full text-left ${
                    selectedTab === 'settings' ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  Settings
                </button>
              </li>
            </ul>
          </nav>
        </aside>
      )}
      <main className="flex-1 p-4">
        <header className="flex items-center  mb-4">
          <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-300">
            {sidebarOpen ? <FiChevronLeft /> : <FiChevronRight />}
          </button>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>
        {selectedTab === 'overview' && (
          <Overview
            questionnaires={questionnaires}
            darkTheme={darkTheme}
            searchQuery={searchQuery}
            selectedFilter={selectedFilter}
            handleSearchChange={handleSearchChange}
            handleFilterChange={handleFilterChange}
            toggleSidebar={toggleSidebar}
          />
        )}
        {selectedTab === 'analytics' && (
          <Analytics
            questionnaires={questionnaires}
            darkTheme={darkTheme}
            searchQuery={searchQuery}
            selectedFilter={selectedFilter}
            handleSearchChange={handleSearchChange}
            handleFilterChange={handleFilterChange}
            selectedQuestionnaire={selectedQuestionnaire}
            handleQuestionnaireSelect={handleQuestionnaireSelect}
            prepareAnalyticsData={prepareAnalyticsData}
          />
        )}
        {selectedTab === 'responses' && (
          <Responses
            questionnaires={questionnaires}
            handleQuestionnaireSelect={handleQuestionnaireSelect}
            darkTheme={darkTheme}
          />
        )}
        {selectedTab === 'settings' && (
          <Settings
            darkTheme={darkTheme}
            toggleTheme={toggleTheme}
            themeLabel={darkTheme ? 'Modo Escuro' : 'Modo Claro'}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
