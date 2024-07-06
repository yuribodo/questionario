import React, { ChangeEvent} from 'react';
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
      {selectedQuestionnaire && (
        <>
          <h3 className="text-lg font-bold mb-2">{selectedQuestionnaire.title}</h3>
          <div className={`flex border border-gray-300 p-4 rounded h-[40vh] shadow-md ${darkTheme ? 'bg-white text-gray-800' : 'bg-gray-100 text-gray-700'}`}>
            <LineGraph data={prepareAnalyticsData(selectedQuestionnaire).data} />
            <PieGraph data={prepareAnalyticsData(selectedQuestionnaire).data} />
          </div>
        </>
      )}
    </>
  );
};

export default Analytics;
