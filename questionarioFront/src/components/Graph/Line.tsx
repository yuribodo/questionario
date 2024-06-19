import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { LineChartData } from './FAKE_DATA'; // Importar os dados fictícios
import { GraphData } from '../Dashboard'; // Importar a interface GraphData

// Registrar os componentes necessários para o Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineGraphProps {
  data: GraphData;
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  const options = {}; // Opções do gráfico (opcional)

  // Usar os dados de LineChartData conforme especificado
  const chartData = {
    labels: LineChartData.labels,
    datasets: LineChartData.datasets,
  };

  return (
    <Line data={chartData} options={options} />
  );
};

export default LineGraph;
