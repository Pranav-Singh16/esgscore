import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from "highcharts/highcharts-more";
import React, { useEffect } from 'react';

HighchartsMore(Highcharts);

const RadarChart = ({ categoriesTitle, companyName, companyValue, industryMean, industryMax }) => {
  // Logging types and values for debugging
  console.log('Categories Title:', categoriesTitle, 'Type:', Array.isArray(categoriesTitle));
  console.log('Company Name:', companyName, 'Type:', typeof companyName);
  console.log('Company Value:', companyValue, 'Type:', Array.isArray(companyValue));
  console.log('Industry Mean:', industryMean, 'Type:', Array.isArray(industryMean));
  console.log('Industry Max:', industryMax, 'Type:', Array.isArray(industryMax));

  // Cloning arrays to prevent mutation issues
  const clonedCompanyValue = [...(Array.isArray(companyValue) ? companyValue : [])];
  const clonedIndustryMean = [...(Array.isArray(industryMean) ? industryMean : [])];
  const clonedIndustryMax = [...(Array.isArray(industryMax) ? industryMax : [])];

  // Handling potential empty arrays
  if (
    clonedCompanyValue.length === 0 ||
    clonedIndustryMean.length === 0 ||
    clonedIndustryMax.length === 0
  ) {
    return <div>Error: Data arrays cannot be empty</div>;
  }

  const options = {
    chart: {
      polar: true,
      type: "line",
    },
    title: {
      text: null,
      x: -100,
    },
    pane: {
      size: "90%",
    },
    xAxis: {
      categories: categoriesTitle,
      tickmarkPlacement: "on",
      lineWidth: 0,
    },
    yAxis: {
      gridLineInterpolation: "polygon",
      lineWidth: 0,
      min: 0,
      max: 100,
    },
    series: [
      {
        name: "Industry Max",
        data: clonedIndustryMax,
        pointPlacement: "on",
        marker: {
          symbol: "circle",
          radius: 4,
        },
      },
      {
        name: "Industry Mean",
        data: clonedIndustryMean,
        pointPlacement: "on",
        marker: {
          symbol: "circle",
          radius: 4,
        },
      },
      {
        name: companyName,
        data: clonedCompanyValue,
        pointPlacement: "on",
        marker: {
          symbol: "square",
          radius: 4,
        },
        fillOpacity: 0.2,
        color: '#FF0000', // Shaded area color (light red)
        lineColor: '#FF0000', // Line color
        zIndex: 1,
        type: 'area', // This enables the area fill
      },
    ],
    plotOptions: {
      series: {
        lineWidth: 2,
        marker: {
          enabled: true,
          fillColor: "#000",
        },
      },
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default RadarChart;
