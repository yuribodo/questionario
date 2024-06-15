import  { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip'

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkTheme, setDarkTheme] = useState(true);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<{ id: number; title: string; responses: any } | null>(null);
  const [questionnaires] = useState([
    { id: 1, title: 'Questionnaire 1', responses: { /* Respostas do questionário 1 */ } },
    { id: 2, title: 'Questionnaire 2', responses: { /* Respostas do questionário 2 */ } },
    // Adicione mais questionários conforme necessário
  ]);

  const handleTabChange = (tab: any) => {
    setSelectedTab(tab);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleQuestionnaireSelect = (questionnaire: any) => {
    setSelectedQuestionnaire(questionnaire);
    setSelectedTab('responses'); // Mudar para a aba de respostas ao selecionar um questionário
  };

  return (
    <div className={`relative flex ${darkTheme ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <div className={`w-1/4 h-screen p-8 ${sidebarOpen ? '' : 'hidden'}`}>
        <h2 className="text-lg font-bold mb-4">Dashboard</h2>
        <nav>
          <ul>
            <li>
              <button
                onClick={() => handleTabChange('overview')}
                className={`w-full py-2 px-4 rounded mb-2 ${
                  selectedTab === 'overview'
                    ? (darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800')
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
                    ? (darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800')
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
                    ? (darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800')
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
                    ? (darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800')
                    : 'hover:bg-gray-700'
                }`}
              >
                Settings
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Separator Line */}
      <div className="border-r border-gray-400 h-screen"></div>

      {/* Main Content */}
      <div className="w-3/4 p-8 relative">
        <div className="flex items-center justify-between mb-4">
          <Tooltip anchorSelect=".my-anchor-element1" place="top">
            Hide Side Bar!
          </Tooltip>
          <Tooltip anchorSelect=".my-anchor-element2" place="top">
            Show Side Bar!
          </Tooltip>
          <button
            onClick={toggleSidebar}
            className={` text-gray-700 px-4 py-2 rounded mr-4 ${darkTheme ? 'hover:bg-gray-400' : 'hover:bg-gray-200'}`}
          >
            {sidebarOpen ? (
              <FiChevronLeft className="text-xl my-anchor-element1" />
            ) : (
              <FiChevronRight className="text-xl my-anchor-element2" />
            )}
          </button>
          <button
            onClick={toggleTheme}
            className={`bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm ${darkTheme ? 'hover:bg-gray-400' : 'hover:bg-gray-200'}`}
          >
            {darkTheme ? 'Light Theme' : 'Dark Theme'}
          </button>
        </div>

        {/* Content based on selectedTab */}
        {selectedTab === 'overview' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p>Here is the overview content...</p>
          </>
        )}
        {selectedTab === 'analytics' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <p>Here is the analytics content...</p>
          </>
        )}
        {selectedTab === 'responses' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Responses</h2>
            <div className="border border-gray-300 p-4 rounded bg-white shadow-md">
              {/* Mostra o questionário selecionado */}
              {selectedQuestionnaire ? (
                <>
                  <h3 className="text-lg font-bold mb-2">{selectedQuestionnaire.title}</h3>
                  {/* Placeholder para mostrar as respostas do questionário */}
                  <p className="text-gray-600">Aqui você pode exibir as respostas recebidas para este questionário.</p>
                  {/* Exemplo simples de exibição de respostas */}
                  <div className="mt-4">
                    {/* Substitua isso com lógica para exibir as respostas reais */}
                    <p className="font-bold">Pergunta 1: Qual é a sua cor favorita?</p>
                    <ul className="list-disc pl-4 mt-2">
                      <li>Resposta 1 - 20 respostas</li>
                      <li>Resposta 2 - 15 respostas</li>
                      <li>Resposta 3 - 10 respostas</li>
                    </ul>
                  </div>
                </>
              ) : (
                <p className="text-gray-600">Selecione um questionário para ver as respostas.</p>
              )}
            </div>
            {/* Lista de questionários disponíveis para seleção */}
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Selecione um questionário:</h3>
              <ul>
                {questionnaires.map((questionnaire) => (
                  <li key={questionnaire.id} className="mb-2">
                    <button
                      onClick={() => handleQuestionnaireSelect(questionnaire)}
                      className={`w-full py-2 px-4 rounded ${
                        selectedQuestionnaire === questionnaire
                          ? (darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800')
                          : 'hover:bg-gray-700'
                      }`}
                    >
                      {questionnaire.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {selectedTab === 'settings' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p>Here are the settings...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
