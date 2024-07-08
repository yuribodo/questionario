import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { GraphData } from '../Dashboard';

// Registrando os componentes necessários
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

interface LineGraphProps {
  data: GraphData;
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  return <Line data={data} />;
};

export default LineGraph;
