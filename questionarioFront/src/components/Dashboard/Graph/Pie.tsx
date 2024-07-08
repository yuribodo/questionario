import React from 'react';
import { Pie } from 'react-chartjs-2';
import { GraphData } from '../Dashboard';

export interface PieGraphProps {
  data: GraphData;
  className?: string; // Adicionando className opcional
}

const PieGraph: React.FC<PieGraphProps> = ({ data, className }) => {
  return <Pie data={data} className={className} />;
};

export default PieGraph;
