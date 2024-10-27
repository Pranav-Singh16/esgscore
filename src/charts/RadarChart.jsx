// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import HighchartsMore from "highcharts/highcharts-more";
// import React from 'react';

// HighchartsMore(Highcharts);

// const RadarChart = ({ categoriesTitle, companyName, companyValue, industryMean, industryMax }) => {
//   const clonedCompanyValue = [...(Array.isArray(companyValue) ? companyValue : [])];
//   const clonedIndustryMean = [...(Array.isArray(industryMean) ? industryMean : [])];
//   const clonedIndustryMax = [...(Array.isArray(industryMax) ? industryMax : [])];

//   if (
//     clonedCompanyValue.length === 0 ||
//     clonedIndustryMean.length === 0 ||
//     clonedIndustryMax.length === 0
//   ) {
//     return <div>Error: Data arrays cannot be empty</div>;
//   }

//   const options = {
//     chart: {
//       polar: true,
//       type: "line",
//       backgroundColor: null, // Ensure chart background is transparent
//     },
//     title: {
//       text: null,
//       x: -100,
//     },
//     pane: {
//       size: "70%",
//     },
//     xAxis: {
//       categories: categoriesTitle,
//       tickmarkPlacement: "on",
//       lineWidth: 0,
//       labels: {
//         style: {
//           color: '#FFFFFF', // Set x-axis label color to white
//           fontSize: '10px',
//         },
//       },
//     },
//     yAxis: {
//       gridLineInterpolation: "polygon",
//       lineWidth: 0,
//       min: 0,
//       max: 100,
//       labels: {
//         style: {
//           color: '#FFFFFF', // Set y-axis label color to white
//         },
//       },
//     },
//     series: [
//       {
//         name: "Industry Max",
//         data: clonedIndustryMax,
//         pointPlacement: "on",
//         marker: {
//           symbol: "circle",
//           radius: 4,
//         },
//       },
//       {
//         name: "Industry Mean",
//         data: clonedIndustryMean,
//         pointPlacement: "on",
//         marker: {
//           symbol: "circle",
//           radius: 4,
//         },
//       },
//       {
//         name: companyName,
//         data: clonedCompanyValue,
//         pointPlacement: "on",
//         marker: {
//           symbol: "square",
//           radius: 4,
//         },
//         fillOpacity: 0.2,
//         color: '#FF0000', // Shaded area color (light red)
//         lineColor: '#FF0000', // Line color
//         zIndex: 1,
//         type: 'area', // This enables the area fill
//       },
//     ],
//     plotOptions: {
//       series: {
//         lineWidth: 2,
//         marker: {
//           enabled: true,
//           fillColor: "#FFFFFF", // Set marker color to white
//         },
//       },
//     },
//     legend: {
//       itemStyle: {
//         color: '#FFFFFF', // Set legend text color to white
//       },
//     },
//   };

//   return (
//     <div className="bg-gray-900 p-4">
//       <HighchartsReact highcharts={Highcharts} options={options} />
//     </div>
//   );
// };

// export default RadarChart;


import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from "highcharts/highcharts-more";

HighchartsMore(Highcharts);

const RadarChart = ({ categoriesTitle, companyName, companyValue, industryMean, industryMax }) => {
  const [chartSettings, setChartSettings] = useState({
    paneSize: "70%", // Default pane size for mobile
    labelFontSize: '10px' // Default font size for mobile
  });

  useEffect(() => {
    const updateSettings = () => {
      if (window.innerWidth < 768) { // Mobile breakpoint
        setChartSettings({
          paneSize: "70%", // Mobile pane size
          labelFontSize: '10px' // Mobile font size
        });
      } else { // Desktop
        setChartSettings({
          paneSize: "80%", // Desktop pane size
          labelFontSize: '16px' // Desktop font size
        });
      }
    };

    updateSettings(); // Set initial settings
    window.addEventListener('resize', updateSettings); // Update on resize

    return () => window.removeEventListener('resize', updateSettings); // Cleanup listener
  }, []);

  const options = {
    chart: {
      polar: true,
      type: "line",
      backgroundColor: null,
    },
    title: {
      text: null,
      x: -100,
    },
    pane: {
      size: chartSettings.paneSize, // Use responsive pane size
    },
    xAxis: {
      categories: categoriesTitle,
      tickmarkPlacement: "on",
      lineWidth: 0,
      labels: {
        style: {
          color: '#FFFFFF', // Set x-axis label color to white
          fontSize: chartSettings.labelFontSize, // Use responsive font size
        },
      },
    },
    yAxis: {
      gridLineInterpolation: "polygon",
      lineWidth: 0,
      min: 0,
      max: 100,
      labels: {
        style: {
          color: '#FFFFFF', // Set y-axis label color to white
          fontSize: chartSettings.labelFontSize, // Use responsive font size
        },
      },
    },
    series: [
      {
        name: "Industry Max",
        data: industryMax,
        pointPlacement: "on",
      },
      {
        name: "Industry Mean",
        data: industryMean,
        pointPlacement: "on",
      },
      {
        name: companyName,
        data: companyValue,
        pointPlacement: "on",
        fillOpacity: 0.2,
        color: '#FF0000',
        lineColor: '#FF0000',
        zIndex: 1,
        type: 'area',
      },
    ],
    plotOptions: {
      series: {
        lineWidth: 2,
        marker: {
          enabled: true,
          fillColor: "#FFFFFF",
        },
      },
    },
    legend: {
      itemStyle: {
        color: '#FFFFFF',
      },
    },
  };

  return (
    <div className="bg-gray-900 p-4">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default RadarChart;
