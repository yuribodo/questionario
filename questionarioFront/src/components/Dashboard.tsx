import { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
import LineGraph from './Graph/Line';
import PieGraph from './Graph/Pie';

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

  const calculateCorrectAnswers = (userAnswers: string[], correctAnswers: string[]) => {
    return userAnswers.reduce((count, answer, index) => {
      return count + (answer === correctAnswers[index] ? 1 : 0);
    }, 0);
  };

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
            className={`text-gray-700 px-4 py-2 rounded mr-4 ${darkTheme ? 'hover:bg-gray-400' : 'hover:bg-gray-200'}`}
          >
            {sidebarOpen ? (
              <FiChevronLeft className="text-xl my-anchor-element1" />
            ) : (
              <FiChevronRight className="text-xl my-anchor-element2" />
            )}
          </button>
          <button
            onClick={toggleTheme}
            className={`py-2 px-4 rounded ${
              darkTheme ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }`}
          >
            Alternar Tema
          </button>
        </div>
        {selectedTab === 'overview' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <div className="mb-4 flex">
              <input
                type="text"
                placeholder="Pesquisar questionários..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="flex-1 py-2 px-4 rounded-l border border-gray-400 text-black"
              />
              <select
                value={selectedFilter}
                onChange={handleFilterChange}
                className="py-2 px-4 border border-gray-400 rounded-r text-black"
              >
                <option value="all">Todas as categorias</option>
                <option value="General">Geral</option>
                <option value="Food">Comida</option>
                {/* Adicionar mais categorias conforme necessário */}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {filteredQuestionnaires.map((questionnaire) => (
                <div
                  key={questionnaire.id}
                  className={`p-4 border border-gray-400 rounded ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                >
                  <h3 className="text-lg font-bold mb-2">{questionnaire.title}</h3>
                  <ul className="list-disc pl-4">
                    {questionnaire.questions.map((question) => (
                      <li key={question.id}>
                        {question.question} (Resposta correta: <span className="font-bold">{question.correctAnswer}</span>)
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/dashboard/edit/${questionnaire.id}`}
                    className={`mt-4 inline-block py-2 px-4 rounded ${
                      darkTheme ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-blue-300 text-gray-800 hover:bg-blue-400'
                    }`}
                  >
                    Editar Questionário
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedTab === 'analytics' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <div className="mt-4">
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Pesquisar questionários..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="flex-1 py-2 px-4 rounded-l border border-gray-400"
                />
                <select
                  value={selectedFilter}
                  onChange={handleFilterChange}
                  className="py-2 px-4 border border-gray-400 rounded-r"
                >
                  <option value="all">Todas as categorias</option>
                  <option value="General">Geral</option>
                  <option value="Food">Comida</option>
                  {/* Adicionar mais categorias conforme necessário */}
                </select>
              </div>
              <h3 className="text-lg font-bold mb-2">Selecionar um Questionário:</h3>
              <ul>
                {filteredQuestionnaires.map((questionnaire) => (
                  <li key={questionnaire.id} className="mb-2">
                    <button
                      onClick={() => handleQuestionnaireSelect(questionnaire)}
                      className={`w-full py-2 px-4 rounded ${
                        selectedQuestionnaire === questionnaire
                          ? darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'
                          : 'hover:bg-gray-700'
                      }`}
                    >
                      {questionnaire.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {selectedQuestionnaire ? (
              <>
                <h3 className="text-lg font-bold mb-2">{selectedQuestionnaire.title}</h3>
                <div className={`flex border border-gray-300 p-4 rounded h-[40vh] shadow-md ${darkTheme ? 'bg-white text-gray-800' : 'bg-gray-100 text-gray-700'}`}>
                  <LineGraph data={prepareAnalyticsData(selectedQuestionnaire).data} />
                  <PieGraph data={prepareAnalyticsData(selectedQuestionnaire).data} />
                </div>
              </>
            ) : (
              <p className="text-gray-600">Selecione um questionário para ver análises.</p>
            )}
          </>
        )}

        {selectedTab === 'responses' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Respostas</h2>
            <div className="mt-4">
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Pesquisar questionários..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="flex-1 py-2 px-4 rounded-l border border-gray-400"
                />
                <select
                  value={selectedFilter}
                  onChange={handleFilterChange}
                  className="py-2 px-4 border border-gray-400 rounded-r"
                >
                  <option value="all">Todas as categorias</option>
                  <option value="General">Geral</option>
                  <option value="Food">Comida</option>
                  {/* Adicionar mais categorias conforme necessário */}
                </select>
              </div>
              <h3 className="text-lg font-bold mb-2">Selecionar um Questionário:</h3>
              <ul>
                {filteredQuestionnaires.map((questionnaire) => (
                  <li key={questionnaire.id} className="mb-2">
                    <button
                      onClick={() => handleQuestionnaireSelect(questionnaire)}
                      className={`w-full py-2 px-4 rounded ${
                        selectedQuestionnaire === questionnaire
                          ? darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'
                          : 'hover:bg-gray-700'
                      }`}
                    >
                      {questionnaire.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`border border-gray-300 p-4 rounded shadow-md ${darkTheme ? 'bg-white text-gray-800' : 'bg-gray-100 text-gray-700'}`}>
              {selectedQuestionnaire ? (
                <>
                  <h3 className="text-lg font-bold mb-2">{selectedQuestionnaire.title}</h3>
                  <p className="text-gray-600">Aqui você pode ver as respostas recebidas para este questionário.</p>
                  <div className="mt-4">
                    {selectedQuestionnaire.userResponses.map((response, index) => (
                      <div key={index} className="mb-4 p-4 border border-gray-400 rounded">
                        <h4 className="font-bold">Usuário {response.userId}</h4>
                        <ul className="list-disc pl-4 mt-2">
                          {response.answers.map((answer, i) => (
                            <li key={i}>
                              {selectedQuestionnaire.questions[i].question} - Sua resposta: {answer} {answer === selectedQuestionnaire.questions[i].correctAnswer ? '✔️' : '❌'} (Correto: {selectedQuestionnaire.questions[i].correctAnswer})
                            </li>
                          ))}
                        </ul>
                        <p className="font-bold mt-2">
                          Respostas corretas: {calculateCorrectAnswers(response.answers, selectedQuestionnaire.questions.map(q => q.correctAnswer))}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-600">Selecione um questionário para ver as respostas.</p>
              )}
            </div>
          </>
        )}

        {selectedTab === 'settings' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Configurações</h2>
            <p>Aqui estão as configurações...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
