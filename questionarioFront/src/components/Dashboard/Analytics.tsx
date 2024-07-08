import React, { ChangeEvent } from 'react';
import { Resposta, GraphData, Questionnaire } from './Dashboard';
import LineGraph from './Graph/Line';
import PieGraph from './Graph/Pie';

interface AnalyticsProps {
  respostas: Resposta[];
  searchQuery: string;
  selectedFilter: string;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedQuestionnaire: Questionnaire | null;
  handleQuestionnaireSelect: (questionnaire: Questionnaire) => void;
  prepareAnalyticsData: (respostas: Resposta[]) => { data: GraphData };
}

const Analytics: React.FC<AnalyticsProps> = ({
  respostas,
  searchQuery,
  selectedFilter,
  handleSearchChange,
  handleFilterChange,
  prepareAnalyticsData,
}) => {
  const filteredRespostas = respostas.filter(
    (resposta) =>
      (selectedFilter === 'all' || resposta.question.question.toLowerCase().includes(selectedFilter.toLowerCase())) &&
      resposta.question.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { data } = prepareAnalyticsData(filteredRespostas);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      <div className="mt-4">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Pesquisar respostas..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-1 py-2 px-4 rounded-l border border-gray-400 text-black"
          />
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="py-2 px-4 border-t border-b border-r border-gray-400 rounded-r"
          >
            <option value="all">Todos</option>
            {respostas.map((resposta) => (
              <option key={resposta.id} value={resposta.question.question}>
                {resposta.question.question}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <LineGraph data={data} className="w-full h-64" />
          </div>
          <div>
            <PieGraph data={data} className="w-full h-64" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
