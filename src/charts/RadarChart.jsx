import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from "highcharts/highcharts-more";

HighchartsMore(Highcharts);

const RadarChart = ({ categoriesTitle, companyName, companyValue, industryMean, industryMax }) => {
  const clonedCompanyValue = [...(Array.isArray(companyValue) ? companyValue : [])];
  const clonedIndustryMean = [...(Array.isArray(industryMean) ? industryMean : [])];
  const clonedIndustryMax = [...(Array.isArray(industryMax) ? industryMax : [])];

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
        data: clonedIndustryMax, // Use cloned industry max data
        pointPlacement: "on",
      },
      {
        name: "Industry Mean",
        data: clonedIndustryMean, // Use cloned industry mean data
        pointPlacement: "on",
      },
      {
        name: companyName, // Use company name
        data: clonedCompanyValue, // Use cloned company value data
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
