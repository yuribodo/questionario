import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { LineChartData } from './FAKE_DATA';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineGraph = () => {

  const options = {}

  const data = {
    labels: LineChartData.labels,
    datasets: LineChartData.datasets,
  };

  
  return (
    <Line options={options} data={data}/>
  )
}

export default LineGraph