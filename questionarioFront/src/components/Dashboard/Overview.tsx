import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Questionnaire } from './Dashboard';

interface OverviewProps {
  questionnaires: Questionnaire[];
  darkTheme: boolean;
  searchQuery: string;
  selectedFilter: string;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  toggleSidebar: () => void;
}

const Overview: React.FC<OverviewProps> = ({
  questionnaires,
  darkTheme,
  searchQuery,
  selectedFilter,
  handleSearchChange,
  handleFilterChange,
}) => {
  const filteredQuestionnaires = questionnaires.filter(
    (questionnaire) =>
      (selectedFilter === 'all' || questionnaire.description === selectedFilter) &&
      questionnaire.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="mb-4 flex flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Pesquisar questionários..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="flex-1 py-2 px-4 rounded-l mb-2 sm:mb-0 sm:mr-2 border border-gray-400 text-black"
        />
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className="py-2 px-4 rounded-r mb-2 sm:mb-0 border border-gray-400 text-black"
        >
          <option value="all">Todas as categorias</option>
          <option value="General">Geral</option>
          <option value="Food">Comida</option>
          {/* Adicionar mais categorias conforme necessário */}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredQuestionnaires.map((questionnaire) => (
          <div
            key={questionnaire.id}
            className={`p-4 border border-gray-400 rounded ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
          >
            <h3 className="text-lg font-bold mb-2">{questionnaire.title}</h3>
            <ul className="list-disc pl-4">
              {questionnaire.questions.map((question) => (
                <li key={question.id}>
                  {question.question} (Resposta correta: <span className="font-bold">{question.correctChoice}</span>)
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
  );
};

export default Overview;
