import React, { useEffect, useState } from 'react';
import { Chart, Line, Doughnut, Bubble } from 'react-chartjs-2';
import { Card } from './components';
import './App.css';
import { colors } from './constants';

const linear = {
  data: {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        label: 'Classificação das avaliações',
        data: [12, 19, 3, 5, 2, 3, 20],
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

const bubble = {
  data: {
    type: 'bubble',
    datasets: [{
      label: ["Produto não enviado"],
      backgroundColor: colors.transparentPrimary,
      borderColor: colors.primary,
      title: "dataTitle1",
      data: [{
        x: 20,
        y: 3,
        r: 15
      }]
    }, {
      label: ["Produto com avaria"],
      backgroundColor: colors.transparentSecondary,
      borderColor: colors.secondary,
      title: "dataTitle2",
      data: [{
        x: 30,
        y: 2,
        r: 10
      }]
    }, {
      label: ["Mal atendimento"],
      backgroundColor: colors.transparentWarning,
      borderColor: colors.warning,
      title: "dataTitle3",
      data: [{
        x: 8,
        y: 1,
        r: 15
      }]
    }]
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

const bubble2 = {
  data: {
    type: 'bubble',
    datasets: [{
      label: ["Celular"],
      backgroundColor: colors.transparentPrimary,
      borderColor: colors.primary,
      title: "dataTitle1",
      data: [{
        x: 18,
        y: 5.245,
        r: 15
      }]
    }, {
      label: ["Óculos"],
      backgroundColor: colors.transparentSecondary,
      borderColor: colors.secondary,
      title: "dataTitle2",
      data: [{
        x: 5,
        y: 7.526,
        r: 10
      }]
    }, {
      label: ["Roupas"],
      backgroundColor: colors.transparentWarning,
      borderColor: colors.warning,
      title: "dataTitle3",
      data: [{
        x: 7,
        y: 6.994,
        r: 15
      }]
    }, {
      label: ["Notebook"],
      backgroundColor: colors.transparentInfo,
      borderColor: colors.info,
      title: "dataTitle4",
      data: [{
        x: 2,
        y: 5.921,
        r: 15
      }]
    }]
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
      <div>
        Olá, vendedor!
        <br />
        <br />Fizemos uma análise nos seus pedidos! Veja os seus resultados:
      </div>
      <div className="grid grid-cols-4 gap-8 mt-8">
      <Card col="span-1">
          <Card.Title>
            Visão geral dos pedidos
          </Card.Title>
          <Card.Body>
            <Doughnut type="doughnut" data={doughnut} options={doughnut.options} plugins={doughnut.plugins} />
            <div>
              Classificação: Boa<br />
              <br />Nos próximos 7 dias, cerca de 8% dos seus pedidos estão com alta probabilidade de dar algum tipo de problema.
            </div>
          </Card.Body>
        </Card>
        <Card col="span-3">
          <Card.Title>
            Média de avaliações nos últimos sete dias
          </Card.Title>
          <Card.Body>
            <Line type="line" data={linear.data} options={linear.options} />
            Aumento de 9% nos últimos sete dias
          </Card.Body>
        </Card>
        <Card col="span-2">
          <Card.Title>
            Principais motivos de cancelamento
          </Card.Title>
          <Card.Body>
            <Bubble type="bubble" data={bubble.data} options={bubble.options} />
            <div>
              Dicas:
              <br />- Seu cliente está esperando pelo seu produto, envie-o ou cancele o pedido.
              <br />-  Proteja seu produto ao embalá-lo;
              <br />- Procure sempre responder as dúvidas.
            </div>
          </Card.Body>
        </Card>
        <Card col="span-2">
          <Card.Title>
            Principais categorias de pedidos com problemas
          </Card.Title>
          <Card.Body>
          <Bubble type="bubble" data={bubble2.data} options={bubble.options} />
          Essas são suas categorias com maior índice de atritos.
          </Card.Body>
        </Card>
        <Card col="span-4">
          <Card.Title>
            Pedidos críticos
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
