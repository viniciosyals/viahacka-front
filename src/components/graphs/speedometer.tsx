import { Doughnut } from 'react-chartjs-2';
import { Description } from './style';
import { colors } from './constants';

interface Props {
  data: number;
  children: any;
}

const Speedometer = ({ data, children }: Props) => {

  const configCh = {
    labels: ['Ruim', 'Bom', 'Excelente'],
    datasets: [
      {
        data: [33.33, 33.33, 33.33],
        needleValue: data,
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
          const { needleValue } = config.data.datasets[0];
          const dataTotal = config.data.datasets[0].data.reduce((a: any, b: any) => a + b, 0);
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
          needleGradient.addColorStop(0, colors.primary);
          needleGradient.addColorStop(1, colors.secondary);
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

  return (
    <>
      <Doughnut type="doughnut" data={configCh} options={configCh.options} plugins={configCh.plugins} />
      <Description>
        {children}
      </Description>
    </>
  )
}

export default Speedometer;
