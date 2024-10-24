import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from "highcharts/highcharts-more";
import React from 'react';
import {info} from '../state/atoms';
import { useRecoilState } from 'recoil';

const MyChart = () => {


  const [infoValue, setInfo] = useRecoilState(info);
  
    const options = {
      chart: {
        type: 'column',
        // margin: [30, 30, 50, 50],
         // Adjust margins as needed
        height : 290,
        width : 564,
      },
      title: {
        text: null,
      },
      xAxis: {
        categories: ['Global CSA Score', 'Modeled Scores', 'Global ESG Score'],
      },
      yAxis: {
        min: 0,
        max: 100,
        tickPositions: [0, 50, 100],
        title: {
          text: null,
        },
      },
      series: [
        {
          // Remove the name
          data: [
            { y: infoValue.scoreCsa, color: '#4B7685' }, // CSA Score
            { y: infoValue.scoreModeled, color: '#699C27' }, // Modeled Score
            { y: infoValue.scoreEsg, color: '#2E9BC1' }, // ESG Score
          ],
          dataLabels: {
            enabled: true,
          },
        },
      ],
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      legend: {
        enabled: false, // Disable the legend
      },
    };

    return <div>
      <HighchartsReact containerProps={{ style: { height: "0%" } }} highcharts={Highcharts} options={options} />
      </div>
  };

export default MyChart;