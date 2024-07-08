import React from 'react';

// Componentes de gráfico (exemplos de placeholders)
const LineGraph: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-white border border-gray-300 rounded-lg p-4 ${className}`}>
    {/* Placeholder para gráfico de linha */}
    <p className="text-center text-gray-500">Gráfico de Linha Placeholder</p>
  </div>
);

const PieGraph: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-white border border-gray-300 rounded-lg p-4 ${className}`}>
    {/* Placeholder para gráfico de pizza */}
    <p className="text-center text-gray-500">Gráfico de Pizza Placeholder</p>
  </div>
);

interface AnalyticsProps {
  searchQuery: string;
  selectedFilter: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Analytics: React.FC<AnalyticsProps> = ({
  searchQuery,
  selectedFilter,
  handleSearchChange,
  handleFilterChange,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-black">
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Pesquisar respostas..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="flex-1 py-2 px-4 rounded-l border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className="py-2 px-4 border border-l-0 border-gray-300 rounded-r bg-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">Todos</option>
          <option value="option1">Opção 1</option>
          <option value="option2">Opção 2</option>
          <option value="option3">Opção 3</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Gráfico de Linha</h3>
          <LineGraph className="w-full h-64" />
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Gráfico de Pizza</h3>
          <PieGraph className="w-full h-64" />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
