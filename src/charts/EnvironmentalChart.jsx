import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from "highcharts/highcharts-more";
import React from 'react';

const EnvironmentalChart = ({ companyValue, industryMeanValue, industryMaxValue, name, title, clr }) => {
    const companyThickness = 10;
    const industryMeanThickness = 20;
    const industryMaxThickness = 30;

    const options = {
        chart: {
            type: "bar",
            height: 50,
            width: 400,
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
                color: "rgba(224, 224, 224, 0.5)",
                pointWidth: industryMaxThickness,
                dataLabels: {
                    enabled: false,
                    inside: false,
                    align: "right",
                    style: { color: "#000" },
                },
            },
            {
                name: "Industry Mean",
                data: [{ y: industryMeanValue }],
                color: "rgba(120, 120, 120, 0.7)",
                pointWidth: industryMeanThickness,
                dataLabels: {
                    enabled: false,
                    inside: false,
                    align: "right",
                    style: { color: "#000" },
                },
            },
            {
                name: name,
                data: [{ y: companyValue }],
                color: clr,
                pointWidth: companyThickness,
                dataLabels: {
                    enabled: false,
                    inside: false,
                    align: "right",
                    style: { color: "#000" },
                },
            },
        ],
        legend: { enabled: false },
        credits: { enabled: false },
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default EnvironmentalChart;
