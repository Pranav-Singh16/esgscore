// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import HighchartsMore from "highcharts/highcharts-more";
// import React from 'react';

// const EnvironmentalChart = ({ companyValue, industryMeanValue, industryMaxValue, name, title, clr }) => {

//     useEffect(() => {
//         const updateDimensions = () => {
//           if (window.innerWidth < 768) { // Mobile breakpoint
//             setChartDimensions({ height: 200, width: 320 }); // Mobile dimensions
//           } else { // Desktop
//             setChartDimensions({ height: 260, width: 460 }); // Desktop dimensions
//           }
//         };
    
//         updateDimensions(); // Set initial dimensions
//         window.addEventListener('resize', updateDimensions); // Update on resize
    
//         return () => window.removeEventListener('resize', updateDimensions); // Cleanup listener
//       }, []);
      
//     const companyThickness = 10;
//     const industryMeanThickness = 20;
//     const industryMaxThickness = 30;

//     const options = {
//         chart: {
//             type: "bar",
//             height: 50,
//             width: 400,
//             backgroundColor: "transparent",
//             margin: [-20, 0, -20, 0],
//         },
//         title: {
//             text: null,
//         },
//         xAxis: {
//             categories: [title],
//             visible: false,
//         },
//         yAxis: {
//             min: 0,
//             max: industryMaxValue,
//             visible: false,
//         },
//         plotOptions: {
//             bar: {
//                 grouping: false,
//                 borderWidth: 0,
//             },
//         },
//         series: [
//             {
//                 name: "Industry Max",
//                 data: [{ y: industryMaxValue }],
//                 color: "rgba(224, 224, 224, 0.5)",
//                 pointWidth: industryMaxThickness,
//                 dataLabels: {
//                     enabled: false,
//                     inside: false,
//                     align: "right",
//                     style: { color: "#000" },
//                 },
//             },
//             {
//                 name: "Industry Mean",
//                 data: [{ y: industryMeanValue }],
//                 color: "rgba(128, 0, 128, 1)",
//                 pointWidth: industryMeanThickness,
//                 dataLabels: {
//                     enabled: false,
//                     inside: false,
//                     align: "right",
//                     style: { color: "#000" },
//                 },
//             },
//             {
//                 name: name,
//                 data: [{ y: companyValue }],
//                 color: clr,
//                 pointWidth: companyThickness,
//                 dataLabels: {
//                     enabled: false,
//                     inside: false,
//                     align: "right",
//                     style: { color: "#000" },
//                 },
//             },
//         ],
//         legend: { enabled: false },
//         credits: { enabled: false },
//     };

//     return (
//         <div>
//             <HighchartsReact highcharts={Highcharts} options={options} />
//         </div>
//     );
// };

// export default EnvironmentalChart;


import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';

const EnvironmentalChart = ({ companyValue, industryMeanValue, industryMaxValue, name, title, clr }) => {
    const [chartDimensions, setChartDimensions] = useState({ height: 50, width: 460 });
    useEffect(() => {
        const updateDimensions = () => {
            if (window.innerWidth < 768) { // Mobile breakpoint
                setChartDimensions({ height: 25, width: 320 }); // Mobile dimensions
            } else { // Desktop
                setChartDimensions({ height: 50, width: 460 }); // Desktop dimensions
            }
        };

        updateDimensions(); // Set initial dimensions
        window.addEventListener('resize', updateDimensions); // Update on resize

        return () => window.removeEventListener('resize', updateDimensions); // Cleanup listener
    }, []);

    const companyThickness = 10;  // Thickness for company value bar
    const industryMeanThickness = 20;  // Thickness for industry mean value bar
    const industryMaxThickness = 30;  // Thickness for industry max value bar

    const options = {
        chart: {
            type: "bar",
            height: chartDimensions.height,
            width: chartDimensions.width,
            backgroundColor: "transparent",
            margin: [-20, 0, -20, 0],
        },
        title: {
            text: null,
        },
        xAxis: {
            categories: [title],
            visible: false,
        },
        yAxis: {
            min: 0,
            max: industryMaxValue,
            visible: false,
        },
        plotOptions: {
            bar: {
                grouping: false,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: "Industry Max",
                data: [{ y: industryMaxValue }],
                color: "rgba(224, 224, 224, 0.5)", // Light gray for max
                pointWidth: industryMaxThickness,
                dataLabels: {
                    enabled: false,
                },
            },
            {
                name: "Industry Mean",
                data: [{ y: industryMeanValue }],
                color: "rgba(47, 79, 79, 1)", // Bright yellow for mean
                pointWidth: industryMeanThickness,
                dataLabels: {
                    enabled: false,
                },
            },
            {
                name: name,
                data: [{ y: companyValue }],
                color: clr, // Use the passed color
                pointWidth: companyThickness,
                dataLabels: {
                    enabled: false,
                },
            },
        ],
        legend: { enabled: false },
        credits: { enabled: false },
    };

    return (
        <div className="mx-auto">
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default EnvironmentalChart;
