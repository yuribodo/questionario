import React, { ChangeEvent } from 'react';
import { Questionnaire, GraphData } from './Dashboard';
import LineGraph from './Graph/Line';
import PieGraph from './Graph/Pie';

interface AnalyticsProps {
  questionnaires: Questionnaire[];
  darkTheme: boolean;
  searchQuery: string;
  selectedFilter: string;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedQuestionnaire: Questionnaire | null;
  handleQuestionnaireSelect: (questionnaire: Questionnaire) => void;
  prepareAnalyticsData: (questionnaire: Questionnaire) => { data: GraphData };
}

const Analytics: React.FC<AnalyticsProps> = ({
  questionnaires,
  darkTheme,
  searchQuery,
  selectedFilter,
  handleSearchChange,
  handleFilterChange,
  selectedQuestionnaire,
  handleQuestionnaireSelect,
  prepareAnalyticsData,
}) => {
  const filteredQuestionnaires = questionnaires.filter(
    (questionnaire) =>
      (selectedFilter === 'all' || questionnaire.category === selectedFilter) &&
      questionnaire.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`p-4 ${darkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Pesquisar questionários..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={`flex-1 py-2 px-4 rounded-l border ${darkTheme ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-400'}`}
        />
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className={`py-2 px-4 border rounded-r ${darkTheme ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-400'}`}
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
                  : 'hover:bg-gray-200'
              }`}
            >
              {questionnaire.title}
            </button>
          </li>
        ))}
      </ul>
      {selectedQuestionnaire && (
        <>
          <h3 className="text-lg font-bold mt-4 mb-2">{selectedQuestionnaire.title}</h3>
          <div className={`flex justify-around items-center p-4 border rounded shadow ${darkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
            <div className="w-1/2 p-2">
              <LineGraph data={prepareAnalyticsData(selectedQuestionnaire).data} />
            </div>
            <div className="w-1/2 p-2">
              <PieGraph data={prepareAnalyticsData(selectedQuestionnaire).data} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
