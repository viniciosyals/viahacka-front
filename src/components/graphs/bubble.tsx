import React, { useEffect, useState } from 'react';
import { Bubble } from 'react-chartjs-2';
import { Description } from './style';
import { colors } from './constants';

interface Props {
  data: any;
  children: any;
}

const BubbleCh = ({ data, children }: Props) => {
  const [ datasets, setDatasets ] = useState<any[]>([]);

  const config = {
    data: {
      type: 'bubble',
      datasets
    },
    options: {
      scales: {
        y: {
            beginAtZero: true
        },
        x: {
          beginAtZero: true
        }
      }
    }
  };

  useEffect(() => {
    setDatasets(data.map((set: any) => ({
      label: [set.label],
      backgroundColor: colors.transparentPrimary,
      borderColor: colors.primary,
      data: [{
        x: set.x,
        y: set.y,
        r: set.r
      }]
    })));
  }, []);

  return (
    <>
      <Bubble type="bubble" data={config.data} options={config.options} />
      <Description>
        {children}
      </Description>
    </>
  )
}

export default BubbleCh;
