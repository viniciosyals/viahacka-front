import { Bar } from 'react-chartjs-2';
import { Description } from './style';
import { colors } from './constants';

interface Props {
  data: any;
  title: any;
  children: any;
}

const BarCh = ({ data, title, children }: Props) => {
  const config = {
    data: {
      labels: data.map((d: any) => d.label),
      datasets: [
        {
          label: title,
          backgroundColor: [colors.transparentPrimary, colors.transparentSecondary, colors.transparentWarning, colors.transparentInfo],
          data: data.map((d: any) => d.number),
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      plugins: {
        legend: {
          display: false,
        },
      }
    }
  };

  return (
    <>
      <Bar type="bar" data={config.data} options={config.options} />
      <Description>
        {children}
      </Description>
    </>
  )
}

export default BarCh;