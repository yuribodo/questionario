import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js';
import { pieChartData } from './FAKE_DATA'; // Importar os dados fictícios
import { GraphData } from '../Dashboard'; // Importar a interface GraphData

// Registrar os componentes necessários para o Chart.js
ChartJS.register(Title, Tooltip, Legend);

interface PieGraphProps {
  data: GraphData;
}

const PieGraph: React.FC<PieGraphProps> = ({ data }) => {
  const options = {}; // Opções do gráfico (opcional)

  // Usar os dados de pieChartData conforme especificado
  const chartData = {
    labels: pieChartData.labels,
    datasets: pieChartData.datasets,
  };

  return (
    <Pie data={chartData} options={options} />
  );
};

export default PieGraph;
