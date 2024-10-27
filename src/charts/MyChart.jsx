import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import { info } from '../state/atoms';
import { useRecoilState } from 'recoil';

const MyChart = () => {
  const [infoValue] = useRecoilState(info);
  const [chartDimensions, setChartDimensions] = useState({ height: 260, width: 460 });

  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth < 768) { // Mobile breakpoint
        setChartDimensions({ height: 200, width: 350 }); // Mobile dimensions
      } else { // Desktop
        setChartDimensions({ height: 260, width: 460 }); // Desktop dimensions
      }
    };

    updateDimensions(); // Set initial dimensions
    window.addEventListener('resize', updateDimensions); // Update on resize

    return () => window.removeEventListener('resize', updateDimensions); // Cleanup listener
  }, []);

  const options = {
    chart: {
      type: 'column',
      height: chartDimensions.height,
      width: chartDimensions.width,
      backgroundColor: 'transparent',
      borderColor: '#444444',
      borderWidth: 0,
    },
    title: {
      text: null,
      style: {
        color: '#ffffff',
      },
    },
    xAxis: {
      categories: ['Global CSA Score', 'Modeled Scores', 'Global ESG Score'],
      labels: {
        style: {
          color: '#ffffff',
        },
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      tickPositions: [0, 50, 100],
      title: {
        text: null,
        style: {
          color: '#ffffff',
        },
      },
      labels: {
        style: {
          color: '#ffffff',
        },
      },
    },
    series: [
      {
        data: [
          { y: infoValue.scoreCsa, color: '#4B7685' },
          { y: infoValue.scoreModeled, color: '#699C27' },
          { y: infoValue.scoreEsg, color: '#2E9BC1' },
        ],
        dataLabels: {
          enabled: true,
          style: {
            color: '#ffffff',
          },
        },
      },
    ],
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
        },
        colorByPoint: true,
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      style: {
        color: '#ffffff',
      },
      backgroundColor: '#333333',
    },
  };

  return (
    <div className="mx-auto">
      <HighchartsReact 
        containerProps={{ style: { height: '100%' } }} 
        highcharts={Highcharts} 
        options={options} 
      />
    </div>
  );
};

export default MyChart;
