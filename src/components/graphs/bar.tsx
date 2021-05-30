import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Description } from './style';
import { colors } from './constants';

interface Props {
  data: any;
  children: any;
}

const BarGh = ({ data, children }: Props) => {
  const config = {
    data: {
      labels: ['Motivos de cancelamento'],

        datasets: [{
          label: data[0].category,
          backgroundColor: colors.transparentPrimary,
          borderColor: colors.primary,
          data: [data[0].quantity],
        }, {
          label: data[1].category,
          backgroundColor: colors.transparentSecondary,
          borderColor: colors.secondary,
          data: [data[1].quantity],
        }]
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

export default BarGh;