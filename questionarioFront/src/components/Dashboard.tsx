import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
import LineGraph from './Graph/Line';
import PieGraph from './Graph/Pie';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkTheme, setDarkTheme] = useState(true);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [questionnaires] = useState([
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
    // Add more questionnaires as needed
  ]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleQuestionnaireSelect = (questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
  };

  const calculateCorrectAnswers = (userAnswers, correctAnswers) => {
    return userAnswers.reduce((count, answer, index) => {
      return count + (answer === correctAnswers[index] ? 1 : 0);
    }, 0);
  };

  const prepareAnalyticsData = (questionnaire) => {
    const data = [];

    questionnaire.userResponses.forEach((response) => {
      const existingData = data.find((d) => d.name === response.date);
      if (existingData) {
        existingData.Responses += 1;
      } else {
        data.push({ name: response.date, Responses: 1 });
      }
    });

    // Sort data by date
    data.sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

    return data;
  };

  const filteredQuestionnaires = questionnaires.filter((questionnaire) =>
    (selectedFilter === 'all' || questionnaire.category === selectedFilter) &&
    questionnaire.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Separator Line */}
      <div className="border-r border-gray-400 h-screen"></div>

      {/* Main Content */}
      <div className="w-3/4 p-8 relative flex-1">
        <div className="flex items-center justify-between mb-4">
          <Tooltip anchorSelect=".my-anchor-element1" place="top">
            Hide Side Bar!
          </Tooltip>
          <Tooltip anchorSelect=".my-anchor-element2" place="top">
            Show Side Bar!
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
            className={`bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm ${darkTheme ? 'hover:bg-gray-400' : 'hover:bg-gray-200'}`}
          >
            {darkTheme ? 'Light Theme' : 'Dark Theme'}
          </button>
        </div>

        {/* Content based on selectedTab */}
        {selectedTab === 'overview' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Search questionnaires..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-2 px-4 rounded-l border border-gray-400"
              />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="py-2 px-4 border border-gray-400 rounded-r"
              >
                <option value="all">All Categories</option>
                <option value="General">General</option>
                <option value="Food">Food</option>
                {/* Add more categories as needed */}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {filteredQuestionnaires.map((questionnaire) => (
                <div key={questionnaire.id} className={`p-4 border border-gray-400 rounded ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  <h3 className="text-lg font-bold mb-2">{questionnaire.title}</h3>
                  <ul className="list-disc pl-4">
                    {questionnaire.questions.map((question) => (
                      <li key={question.id}>
                        {question.question} (Correct answer: <span className="font-bold">{question.correctAnswer}</span>)
                      </li>
                    ))}
                  </ul>
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
                  placeholder="Search questionnaires..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-2 px-4 rounded-l border border-gray-400"
                />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="py-2 px-4 border border-gray-400 rounded-r"
                >
                  <option value="all">All Categories</option>
                  <option value="General">General</option>
                  <option value="Food">Food</option>
                  {/* Add more categories as needed */}
                </select>
              </div>
              <h3 className="text-lg font-bold mb-2">Select a Questionnaire:</h3>
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
                  <LineGraph data={prepareAnalyticsData(selectedQuestionnaire)} />
                  <PieGraph data={prepareAnalyticsData(selectedQuestionnaire)} />
                </div>
              </>
            ) : (
              <p className="text-gray-600">Please select a questionnaire to view analytics.</p>
            )}
          </>
        )}
        {selectedTab === 'responses' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Responses</h2>
            <div className="mt-4">
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Search questionnaires..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-2 px-4 rounded-l border border-gray-400"
                />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="py-2 px-4 border border-gray-400 rounded-r"
                >
                  <option value="all">All Categories</option>
                  <option value="General">General</option>
                  <option value="Food">Food</option>
                  {/* Add more categories as needed */}
                </select>
              </div>
              <h3 className="text-lg font-bold mb-2">Select a Questionnaire:</h3>
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
                  <p className="text-gray-600">Here you can view the received responses for this questionnaire.</p>
                  <div className="mt-4">
                    {selectedQuestionnaire.userResponses.map((response, index) => (
                      <div key={index} className="mb-4 p-4 border border-gray-400 rounded">
                        <h4 className="font-bold">User {response.userId}</h4>
                        <ul className="list-disc pl-4 mt-2">
                          {response.answers.map((answer, i) => (
                            <li key={i}>
                              {selectedQuestionnaire.questions[i].question} - Your answer: {answer} {answer === selectedQuestionnaire.questions[i].correctAnswer ? '✔️' : '❌'} (Correct: {selectedQuestionnaire.questions[i].correctAnswer})
                            </li>
                          ))}
                        </ul>
                        <p className="font-bold mt-2">
                          Correct answers: {calculateCorrectAnswers(response.answers, selectedQuestionnaire.questions.map(q => q.correctAnswer))}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-600">Select a questionnaire to view the responses.</p>
              )}
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
