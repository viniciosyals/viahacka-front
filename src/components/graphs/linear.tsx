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
    gradient.addColorStop(0, colors.secondary);
    gradient.addColorStop(1, colors.primary);
  }

  return gradient;
}

const Linear = ({ data, children }: Props) => {
  const config = {
    data: {
      labels: data.map((d: any) => d.label),
      datasets: [
        {
          label: 'Classificação das avaliações (NPS Score)',
          data: data.map((d: any) => d.number),
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
