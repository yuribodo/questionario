import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const api = process.env.API_LINK;

interface AnalyticsProps {
  searchQuery: string;
  selectedFilter: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  userQuestionnaireCount: number;
}

const Analytics: React.FC<AnalyticsProps> = ({
  searchQuery,
  selectedFilter,
  handleSearchChange,
  handleFilterChange,
  userQuestionnaireCount,
}) => {
  const { user } = useUser();
  const [questionarios, setQuestionarios] = useState([]);
  console.log(questionarios)
  const [pieLabels, setPieLabels] = useState<string[]>([]);

  useEffect(() => {
      if (user?.id) {
        axios.get(`${api}/questionarios/user/${user.id}`)
        .then(response => {
            setQuestionarios(response.data);
            // Extrair títulos dos questionários e o número de respostas
            const labels = response.data.map((questionario: any) => questionario.title);
            

            setPieLabels(labels);
            
          })
          .catch (error => {
            console.error('Erro ao buscar dados do backend:', error);
          }) 
            
    };
  
  }, [user?.id]);

  // Dados de exemplo para o gráfico de linha
  const lineSeries = [{
    name: 'Series 1',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  }];

  const lineOptions = {
    chart: {
      type: 'line' as const,
    },
    series: lineSeries,
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
  };

  const pieSeries = [44];

  const pieOptions = {
    chart: {
      type: 'donut' as const,
    },
    labels: pieLabels,
  };

  return (
    <div className="p-4 min-h-screen bg-white rounded-lg shadow-md text-black">
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
        <div className="rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Respostas ao Decorrer do Tempo</h3>
          <div className="w-full h-64">
            <ReactApexChart options={lineOptions} series={lineSeries} type="line" />
          </div>
        </div>
        <div className="rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Respostas por Questionário</h3>
          <div className="w-full h-64">
            <ReactApexChart options={pieOptions} series={pieSeries} type="donut" />
          </div>
        </div>
      </div>
      <div className="mt-20">
        <p className="text-lg font-bold">Número de Questionários Criados:</p>
        <p className="text-xl">{userQuestionnaireCount}</p>
      </div>
    </div>
  );
};

export default Analytics;
