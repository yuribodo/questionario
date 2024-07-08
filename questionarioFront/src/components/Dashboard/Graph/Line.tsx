import React from 'react';
import { Line } from 'react-chartjs-2';
import { GraphData } from '../Dashboard';

export interface LineGraphProps {
  data: GraphData;
  className?: string; // Adicionando className opcional
}

const LineGraph: React.FC<LineGraphProps> = ({ data, className }) => {
  return <Line data={data} className={className} />;
};

export default LineGraph;
