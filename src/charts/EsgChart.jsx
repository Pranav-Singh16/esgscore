import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from "highcharts/highcharts-more";
import React from 'react';



const EsgChart = ({ industryMaxValue, industryMeanValue, companyValue, clr, showTargetLine, secClr = '#e1e7e8', thirdValue = 0, thirdclr = "#699C27", lineType = 'Straight' }) => {
    const Thickness = 150
  
    const options = {
      chart: {
        type: 'column', // Specify the chart type
        height: 350,
        width: 205,
        backgroundColor: 'transparent',
        // margin: [10, -10, 5, 10],
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
        },
        plotLines: showTargetLine ? [{
          value: industryMaxValue, // The y-value where the line will be drawn
          color: 'black', // Color of the line
          width: 1, // Width of the line
          zIndex: 5, // Layering order (higher values are on top)
          dashStyle: lineType,
          label: {
            text: null, // Label for the line
            align: 'center',
            verticalAlign: 'bottom',
            style: {
              color: '',
              // fontWeight: 'bold',
            },
          },
        }] : [], // Make sure to add an empty array if not shown
      },
      plotOptions: {
        column: {
          grouping: false, // Disable grouping to overlay the bars
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
    };
  
    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  };
  

export default EsgChart;