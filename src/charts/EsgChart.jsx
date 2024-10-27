  import Highcharts from 'highcharts';
  import HighchartsReact from 'highcharts-react-official';
  import HighchartsMore from "highcharts/highcharts-more";
  import React from 'react';

  const EsgChart = ({ industryMaxValue, industryMeanValue, companyValue, clr, showTargetLine, secClr = '#e1e7e8', thirdValue = 0, thirdclr = "#699C27", lineType = 'Straight' }) => {
      const Thickness = 150; // Adjusted for better visual balance
    
      const options = {
        chart: {
          type: 'column',
          height: 350,
          width: 250,
          backgroundColor: 'transparent',
        },
        title: {
          text: null,
        },
        xAxis: {
          categories: ['Global CSA Score', 'Modeled Scores', 'Global ESG Score'],
          visible: false,
        },
        yAxis: {
          min: 0,
          max: 100,
          tickPositions: [0, 20, 40, 60, 80, 100],
          title: {
            text: null,
            style: {
              color: '#ffffff', // Set title color to white
            },
          },
          labels: {
            style: {
              color: '#ffffff', // Set labels color to white
            },
          },
          plotLines: showTargetLine ? [{
            value: industryMaxValue,
            color: '#FF0000', // Changed line color for visibility
            width: 2,
            zIndex: 5,
            dashStyle: lineType,
            label: {
              text: null,
            },
          }] : [],
        },
        plotOptions: {
          column: {
            grouping: false,
            borderWidth: 0,
          },
        },
        series: [
          {
            name: 'Including Modeled Scores',
            data: [{ y: thirdValue }],
            color: thirdclr,
            pointWidth: Thickness,
            dataLabels: {
              enabled: false,
            },
          },
          {
            name: 'Potential Score based on Disclosure Rate',
            data: [{ y: industryMeanValue }],
            color: secClr,
            pointWidth: Thickness,
            dataLabels: {
              enabled: false,
            },
          },
          {
            name: 'Actual Score based on Disclosure',
            data: [{ y: companyValue }],
            color: clr,
            pointWidth: Thickness,
            dataLabels: {
              enabled: false,
            },
          },
        ],
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          style: {
            color: '#ffffff', // Tooltip text color
          },
          backgroundColor: '#333333', // Tooltip background color
        },
      };
    
      return (
        <div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      );
  };

  export default EsgChart;