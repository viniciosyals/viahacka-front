import React, { useEffect, useState } from 'react';
import { Chart, Bar, Line, Doughnut } from 'react-chartjs-2';
import { Card } from './components';
import './App.css';
import { colors } from './constants';

const linear = {
  data: {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: colors.primary,
        borderColor: (context: any) => {
          const { chart } = context;
          const {ctx, chartArea} = chart;
          
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

function getGradient(ctx: any, chartArea: any) {
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

const bar = {
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 15, 7, 10],
        backgroundColor: [
          colors.transparentInfo,
          colors.transparentPrimary,
          colors.transparentSecondary,
          colors.transparentError,
          colors.transparentSuccess,
          colors.transparentWarning,
        ],
        borderColor: [
          colors.info,
          colors.primary,
          colors.secondary,
          colors.error,
          colors.success,
          colors.warning,
        ],
        borderWidth: 1,
      },
    ],
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

const doughnut = {
  labels: ['Ruim', 'Bom', 'Excelente'],
  datasets: [
    {
      data: [33.33, 33.33, 33.33],
      needleValue: 44,
      backgroundColor: [
        colors.transparentError,
        colors.transparentWarning,
        colors.transparentSuccess,
      ],
    },
  ],
  plugins: [
    {
      afterDraw: (chart: any) => {
        const { ctx, config, canvas } = chart;
        const { needleValue, data } = config.data.datasets[0];
        const dataTotal = data.reduce((a: any, b: any) => a + b, 0);
        const angle = Math.PI + (1 / dataTotal) * needleValue * Math.PI;
        const cw = canvas.offsetWidth;
        const ch = canvas.offsetHeight;
        const cx = cw / 2;
        const cy = ch - (ch / 4) + 13;
        const lineLength = 3;
        
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, -lineLength);
        ctx.lineTo(ch / 2.5, 0);
        ctx.lineTo(0, lineLength);
        const needleGradient = ctx.createLinearGradient(0, 210, 210, 0);
        needleGradient.addColorStop(0, '#6a5aff');
        needleGradient.addColorStop(1, '#00d3c3');
        ctx.fillStyle = needleGradient;
        ctx.fill();
        ctx.rotate(-angle);
        ctx.translate(-cx, -cy);
        ctx.beginPath();
        ctx.arc(cx, cy, lineLength + 2, 0, Math.PI * 2);
        ctx.fill();
      },
    }
  ],
  options: {
    rotation: 270,
    circumference: 180,
    cutout: 40,
    plugins: {
      legend: {
        onClick: () => false
      },
      tooltip: {
        enabled: false,
      }
    }
  }
};
const App = () => {
  const [ loading, setLoading ] = useState(false);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-8 mt-8">
        <Card col="span-2">
          <Card.Title>
            Card xxx
          </Card.Title>
          <Card.Body>
            <Bar type="bar" data={bar.data} options={bar.options} />
          </Card.Body>
        </Card>
        <Card col="span-2">
          <Card.Title>
            Card xxx
          </Card.Title>
          <Card.Body>
            <Line type="line" data={linear.data} options={linear.options} />
          </Card.Body>
        </Card>
        <Card col="span-1">
          <Card.Title>
            Card xxx
          </Card.Title>
          <Card.Body>
            <Doughnut type="doughnut" data={doughnut} options={doughnut.options} plugins={doughnut.plugins} />
          </Card.Body>
        </Card>
        <Card>
          <Card.Title>
            Card xxx
          </Card.Title>
          <Card.Body>
            asdasdsad
          </Card.Body>
        </Card>
        <Card>
          <Card.Title>
            Card xxx
          </Card.Title>
          <Card.Body>
            asdasdsad
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default App;
