import { Line } from 'react-chartjs-2';
import { Description } from './style';
import { colors } from './constants';

interface Props {
  data: any;
  children: any;
}

const getGradient = (ctx: any, chartArea: any) => {
  let width = 0;
  let height = 0;
  let gradient = null;
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (width !== chartWidth || height !== chartHeight) {
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(1, colors.secondary);
  }

  return gradient;
}

const Linear = ({ data, children }: Props) => {
  const config = {
    data: {
      labels: [data[0].label, data[1].label, data[2].label, data[3].label, data[4].label, data[5].label, data[6].label],
      datasets: [
        {
          label: 'Classificação das avaliações',
          data: [data[0].number, data[1].number, data[2].number, data[3].number, data[4].number, data[5].number, data[6].number],
          fill: false,
          backgroundColor: colors.primary,
          borderColor: (context: any) => {
            const { chart } = context;
            const { ctx, chartArea } = chart;
            
            if (!chartArea) {
              return null;
            }
            return getGradient(ctx, chartArea);
          },
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      }
    },
  }

  return (
    <>
      <Line type="line" data={config.data} options={config.options} />
      <Description>
        {children}
      </Description>
    </>
  )
}

export default Linear;
