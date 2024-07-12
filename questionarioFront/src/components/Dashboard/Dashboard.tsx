import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { useAtom } from 'jotai';
import { darkThemeAtom } from '../../lib/atom';
import Overview from './Overview';
import Analytics from './Analytics';
import Responses from './Responses';
import Settings from './Settings';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
const api = process.env.API_LINK

export interface Question {
  id: number;
  type: string;
  question: string;
  choices: string[];
  correctChoice: string | null;
  questionarioId: number;
}

export interface Questionnaire {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export interface Resposta {
  id: number;
  usuarioId: number;
  questionarioId: number;
  questionId: number;
  resposta: string;
  question: Question;
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
  const [darkTheme, setDarkTheme] = useAtom(darkThemeAtom);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(null);
  const {user} = useUser()

  console.log(respostas)


  useEffect(() => {
    if (user?.id) {
      axios.get(`${api}/questionarios/user/${user.id}`)
        .then(response => {
          setQuestionnaires(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar dados da API:', error);
        });
    }
  }, [user?.id]);

  useEffect(() => {
    if (selectedQuestionnaire) {
      axios.get(`${api}/respostas/questionario/${selectedQuestionnaire.id}`)
        .then(response => {
          setRespostas(response.data);
        })
        
        .catch(error => {
          console.error('Erro ao buscar respostas da API:', error);
        });
    }
  }, [selectedQuestionnaire]);


  const toggleTheme = () => {
    setDarkTheme(prevTheme => !prevTheme);
  };

  const toggleSidebar = () => {
    setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
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

  

  /*const prepareAnalyticsData = (respostas: Resposta[]): { data: GraphData } => {
    const labels = respostas.map(resposta => resposta.question.question);
    const data = respostas.map(resposta => respostas.filter(r => r.resposta === resposta.resposta).length);

    return {
      data: {
        labels,
        datasets: [
          {
            label: 'Respostas',
            data,
            backgroundColor: labels.map(() => 'rgba(54, 162, 235, 0.2)'),
            borderColor: labels.map(() => 'rgba(54, 162, 235, 1)'),
            borderWidth: 1,
          },
        ],
      },
    };
  }; */

  return (
    <div className={`flex min-h-screen ${darkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
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
        <header className="flex items-center mb-4">
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
            
            searchQuery={searchQuery}
            selectedFilter={selectedFilter}
            handleSearchChange={handleSearchChange}
            handleFilterChange={handleFilterChange}
            
            
      
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
