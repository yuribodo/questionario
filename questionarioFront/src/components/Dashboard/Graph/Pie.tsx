import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { GraphData } from '../Dashboard';

// Registrando os componentes necessários
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieGraphProps {
  data: GraphData;
}

const PieGraph: React.FC<PieGraphProps> = ({ data }) => {
  return <Pie data={data} />;
};

export default PieGraph;
