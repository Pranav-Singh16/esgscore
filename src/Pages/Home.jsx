import searchImage from '../assets/images/search.jpg';
import botImage from '../assets/Images/bot.jpg';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from "highcharts/highcharts-more";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { searchTermState, info } from '../state/atoms';

const Home = () => {
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const [infoValue, setInfo] = useRecoilState(info);
  const [suggestions, setSuggestions] = useState([]); // Define suggestions state

  const companyData = {
    "Apple Inc. (AAPL)": 4004214,
    "Microsoft Corporation (MSFT)": 4004214,
    "Amazon.com Inc. (AMZN)": 3001792,
    "Alphabet Inc. (GOOGL)": 4633618,
    "Meta Platforms Inc. (META)": 4144156,
    "Tesla Inc. (TSLA)": 4574287,
    "NVIDIA Corporation (NVDA)": 4094286,
    "PayPal Holdings Inc. (PYPL)": 4580296,
    "Adobe Inc. (ADBE)": 4047847,
    "Netflix Inc. (NFLX)": 4104060,
    "Cisco Systems Inc. (CSCO)": 4047857,
    "Intel Corporation (INTC)": 4025746,
    "Comcast Corporation (CMCSA)": 4057180,
    "Qualcomm Incorporated (QCOM)": 4062496,
    "PepsiCo Inc. (PEP)": 4004166,
    "Amgen Inc. (AMGN)": 4092820,
    "Costco Wholesale Corporation (COST)": 4126080,
    "Broadcom Inc. (AVGO)": 4970473,
    "Intuit Inc. (INTU)": 4048157,
    "Walgreens Boots Alliance Inc. (WBA)": 4695380,
    "T-Mobile US Inc. (TMUS)": 4091145,
    "Gilead Sciences Inc. (GILD)": 4135343,
    "Booking Holdings Inc. (BKNG)": 4122589,
    "Vertex Pharmaceuticals Inc. (VRTX)": 4159057,
    "Charter Communications Inc. (CHTR)": 4121481,
    "Autodesk Inc. (ADSK)": 4208149,
    "Moderna Inc. (MRNA)": 4430411,
    "eBay Inc. (EBAY)": 4081627,
    "Starbucks Corporation (SBUX)": 4071032,
    "Activision Blizzard Inc. (ATVI)": 4414835,
    "Illumina Inc. (ILMN)": 4094034,
    "O'Reilly Automotive Inc. (ORLY)": 4930128,
    "Analog Devices Inc. (ADI)": 4113211,
    "Regeneron Pharmaceuticals Inc. (REGN)": 4094029,
    "KLA Corporation (KLAC)": 4069171,
    "Kraft Heinz Company (KHC)": 4384788,
    "BioMarin Pharmaceutical Inc. (BMRN)": 4810813,
    "Fastenal Company (FAST)": 4101711,
    "Zscaler Inc. (ZS)": 5174695,
    "Snap Inc. (SNAP)": 4616846,
    "Fortinet Inc. (FTNT)": 4868602,
    "Workday Inc. (WDAY)": 4334777,
    "Datadog Inc. (DDOG)": 5222696,
    "Splunk Inc. (SPLK)": 4279508,
    "NXP Semiconductors N.V. (NXPI)": 4203993,
    "Electronic Arts Inc. (EA)": 4100183,
    "ServiceNow Inc. (NOW)": 4587650,
    "Paychex Inc. (PAYX)": 4070114,
    "Seagate Technology Holdings plc (STX)": 4794937,
    "NetEase Inc. (NTES)": 4966080,
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filteredSuggestions = value ? Object.keys(companyData).filter(company => company.toLowerCase().startsWith(value.toLowerCase())) : [];
    setSuggestions(filteredSuggestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (searchTerm) {
      const numericalValue = companyData[searchTerm];
      await fetchData(numericalValue);
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    handleSubmit(); 
  };

  useEffect(() => {
    console.log('Search term changed:', searchTerm);
  }, [searchTerm]);

  // Fetch data and update states
  const fetchData = async (query) => {
    try {
      const response = await axios.get(`https://www.spglobal.com/esg/scores/results?cid=${query}`);
      const dataString = response.data;

      const matches = {
        companyName: dataString.match(/data-long-name="(.*?)"/)?.[1],
        ticker: dataString.match(/data-company-ticker="<b>Ticker:<\/b> (\w+)/)?.[1],
        industry: dataString.match(/data-industry="(.*?)"/)?.[1],
        location: dataString.match(/data-country="(.*?)"/)?.[1],
        dataAvailability: dataString.match(/data-availabilitylevel="(\w+\s*\w+)/)?.[1],
        totalEsgScore: dataString.match(/<span class="score-bold">S&P Global ESG Score =\s*(\d+)/)?.[1],
        spGlobalCsaScore: dataString.match(/<div><\/span>S&P Global CSA Score =<\/span> <\/span>(\d+)/)?.[1],
        modeledScore: dataString.match(/<div class="Estimated-Score_GreenBar Score-Cont__Cal">\n\t\t\t\t  <div><\/span>Modeled Scores = <\/span> <\/span>(\d+)/)?.[1],
        env: dataString.match(/<div id="dimentions-score-env" data-score="(\d+)" data-avg="(\d+)" data-max="(\d+)"/),
        social: dataString.match(/<div id="dimentions-score-social" data-score="(\d+)" data-avg="(\d+)" data-max="(\d+)/),
        govecon: dataString.match(/<div id="dimentions-score-govecon" data-score="(\d+)" data-avg="(\d+)" data-max="(\d+)/),
        publicScoreInfo: dataString.match(/"requiredPublicDisclosure": {\s*\n\s*"disclosureLevel": {\s*\n\s*"score":\s*(\d+)\s*,\s*\n\s*"dataAvailability":\s*"([^"]+)"/),
        publicScore: dataString.match(/Required Public Disclosure Chart\nconst reqPubliCDisc = function\(\)\{\n\s*var actualScore\s*=\s*(\d+)\s*;\n\s*var potentialScore\s*=\s*(\d+);\n\s*var MaxIndScore\s*=\s*(\d+)/),
        additionalScoreInfo: dataString.match(/"additionalDisclosure": {\s*\n\s*"disclosureLevel": {\s*\n\s*"score":\s*(\d+)\s*,\s*\n\s*"dataAvailability":\s*"([^"]+)"/),
        additionalScore: dataString.match(/Additional Disclosure Chart\nconst additionalDisc = function\(\)\{\n\s*var actualScore\s*=\s*(\d+)\s*;\n\s*var potentialScore\s*=\s*(\d+);\n\s*var MaxIndScore\s*=\s*(\d+)/),
        modelingApproaches: dataString.match(/Number of questions based on modeling approaches  \n\t\t\t\t\t\t\t\t\t<\/div>\n\t\t\t\t\t\t\t\t\t<div class="imputed-score__table-second-column">\n\t\t\t\t\t\t\t\t\t\t(\d*)\/(\d+)/),
        categories: dataString.match(/data-categories="([^"]+)"/),
        scores: dataString.match(/data-score="([^"]+)"/),
        industryBest: dataString.match(/data-industry-best="([^"]+)"/),
        industryMean: dataString.match(/data-industry-mean="([^"]+)"/)
      };

      const newInfo = {
        name: matches.companyName,
        ticker: matches.ticker,
        industry: matches.industry,
        location: matches.location,
        dataAvailability: matches.dataAvailability,
        scoreCsa: parseInt(matches.spGlobalCsaScore),
        scoreModeled: parseInt(matches.modeledScore),
        scoreEsg: parseInt(matches.totalEsgScore),
        environmentalCompanyValue: parseInt(matches.env[1]),
        environmentalIndustryMean: parseInt(matches.env[2]),
        environmentalIndustryMax: parseInt(matches.env[3]),
        socialCompanyValue: parseInt(matches.social[1]),
        socialIndustryMean: parseInt(matches.social[2]),
        socialIndustryMax: parseInt(matches.social[3]),
        goveocCompanyValue: parseInt(matches.govecon[1]),
        goveocIndustryMean: parseInt(matches.govecon[2]),
        goveocIndustryMax: parseInt(matches.govecon[3]),
        csaDiscloser: parseInt(matches.publicScoreInfo[1]),
        csaAvailability: matches.publicScoreInfo[2],
        csaMaxScore: parseInt(matches.publicScore[3]),
        csaPotentialScore: parseInt(matches.publicScore[2]),
        csaActualScore: parseInt(matches.publicScore[1]),
        csaAdditionalDiscloser: parseInt(matches.additionalScoreInfo[1]),
        csaAdditionalAvailability: matches.additionalScoreInfo[2],
        csaAdditionalMaxScore: parseInt(matches.additionalScore[3]),
        csaAdditionalPotentialScore: parseInt(matches.additionalScore[2]),
        csaAdditionalActualScore: parseInt(matches.additionalScore[1]),
        noofquesStart: parseInt(matches.modelingApproaches[1]),
        noofquesEnd:  parseInt(matches.modelingApproaches[1])+parseInt(matches.modelingApproaches[1]),
        graphCompanyName: matches.companyName,
        graphCompanyValue: matches.scores[1].split(",").map(Number),
        graphIndustryMax: matches.industryBest[1].split(",").map(Number),
        graphIndustryMean: matches.industryMean[1].split(",").map(Number),
        graphCategoriesTitle: matches.categories[1].split(","),
      };

      setInfo(newInfo);
      console.log("Updated Company Name:", newInfo);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect to log all updated state values
  useEffect(() => {
    console.log("Updated info after set:", infoValue);
  }, [infoValue]);


console.log(infoValue.scoreCsa)
// useEffect to log all updated state values
useEffect(() => {
  console.log("Updated info after set:", info);
}, [info]);

  const MyChart = () => {
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
  
  const EnvironmentalChart = ({ companyValue, industryMeanValue, industryMaxValue, name, title, clr }) => {
  const companyThickness = 10; // Thinnest
  const industryMeanThickness = 20; // Moderate
  const industryMaxThickness = 30; // Thickest

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
        grouping: false, // Disable grouping to overlay the bars
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Industry Max",
        data: [
          {
            y: industryMaxValue,
            // label: "Industry Max 95",
          },
        ],
        color: "rgba(224, 224, 224, 0.5)", // Transparent color for Industry Max
        pointWidth: industryMaxThickness, // Thickest bar
        dataLabels: {
          enabled: false,
          inside: false,
          align: "right",
          // format: "Industry Max 95",
          style: {
            color: "#000",
          },
        },
      },
      {
        name: "Industry Mean",
        data: [
          {
            y: industryMeanValue,
            // label: "Industry Mean 44",
          },
        ],
        color: "rgba(120, 120, 120, 0.7)", // Semi-transparent color for Industry Mean
        pointWidth: industryMeanThickness, // Moderate thickness
        dataLabels: {
          enabled: false,
          inside: false,
          align: "right",
          // format: "Industry Mean 44",
          style: {
            color: "#000",
          },
        },
      },
      {
        name: name,
        data: [
          {
            y: companyValue,
            // label: "Apple Inc. 54",
          },
        ],
        color: clr, // Solid color for Apple Inc.
        pointWidth: companyThickness, // Thinnest bar
        dataLabels: {
          enabled: false,
          inside: false,
          align: "right",
          // format: "Apple Inc. 54",
          style: {
            color: "#000",
          },
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

HighchartsMore(Highcharts);

const RadarChart = ({categoriesTitle, companyName, companyValue, industryMean, industryMax }) => {
  const options = {
    chart: {
      polar: true,
      type: "line"
    },
    title: {
      text: null,
      x: -100
    },
    pane: {
      size: "90%"
    },
    xAxis: {
      categories: categoriesTitle,
      tickmarkPlacement: "on",
      lineWidth: 0
    },
    yAxis: {
      gridLineInterpolation: "polygon",
      lineWidth: 0,
      min: 0,
      max: 100
    },
    series: [
      {
        name: "Industry Max",
        data: industryMax,
        pointPlacement: "on",
        marker: {
          symbol: "circle",
          radius: 4
        }
      },
      {
        name: "Industry Mean",
        data: industryMean,
        pointPlacement: "on",
        marker: {
          symbol: "circle",
          radius: 4
        }
      },
      {
        name: companyName,
        data: companyValue,
        pointPlacement: "on",
        marker: {
          symbol: "square",
          radius: 4
        },
        // Shading the area under the Apple series
        fillOpacity: 0.2,
        color: '#FF0000', // Shaded area color (light red)
        lineColor: '#FF0000', // Line color
        zIndex: 1,
        // This enables the area fill
        type: 'area'
      },
    ],
    plotOptions: {
      series: {
        lineWidth: 2,
        marker: {
          enabled: true,
          fillColor: "#000"
        }
      }
    }
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};


 return (
    <div>

      <div className="relative w-full">
        <form onSubmit={handleSubmit}>
          <div
            className="relative w-full h-[244px] bg-cover bg-center flex justify-center items-center"
            style={{ backgroundImage: `url(${searchImage})` }} // Ensure searchImage is defined
          >
            <input
              type="text"
              placeholder="Find a company's ESG score..."
              value={searchTerm}
              onChange={handleChange}
              className="w-[90%] max-w-[1308px] h-[100px] p-4 rounded-lg border border-gray-300 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans z-10"
            />
          </div>
        </form>

        {/* Suggestions Box */}
        {suggestions.length > 0 && (
          <div className="absolute z-20 bg-white border border-gray-300 rounded-lg w-[90%] max-w-[1308px] left-1/2 transform -translate-x-1/2 -mt-16 shadow-lg">

            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='mx-20 my-4 pl-6'>
        <div className="flex-row text-4xl font-bold text-black ">
          <h1>{infoValue.name} ESG Score</h1>
        </div>
        <div className="flex flex-nowrap my-4">
          <h2 className="font-bold">Ticker:</h2>
          <h2 className='px-1'>{infoValue.ticker}</h2>
          <h2 className="font-bold pl-4">Industry:</h2>
          <h2 className='px-1'>{infoValue.industry}</h2>
          <h2 className="font-bold pl-4">Location:</h2>
          <h2 className='px-1'>{infoValue.location}</h2>
        </div>

        <div className="flex flex-nowrap my-4 mr-10">
          <div>
            <h2 className="font-semibold text-2xl">Global ESG Score</h2>
            <h2 className="leading-relaxed text-8xl font-bold mr-10 pr-20 top-0 text-9xl">{infoValue.scoreEsg}</h2>
            <h3>Data Availability: {infoValue.dataAvailability}</h3>
            <h3 className='max-w-48'>Last Updated: {infoValue.lastUpdated}</h3>
          </div>
          <div className='class="basis-1/4"'>
            <h2 className="font-semibold text-2xl mb-10">Score Composition</h2>
            <MyChart />
          </div>
          <div className='ml-10 class="basis-1/2"'>
            <h2 className="font-semibold text-2xl mb-2">Score Breakdown</h2>
            <div>
              <div>
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-4 bg-red-500"></div>
                  <div className="w-1 h-4 bg-yellow-500"></div>
                  <div className="w-1 h-4 bg-green-500"></div>
                  <div className="text-xs px-2">{infoValue.name}</div>
                  <div className="w-4 h-4" style={{ backgroundColor: 'rgba(120, 120, 120, 0.7)' }}></div>
                  <div className="text-xs pr-2">Industry Mean</div>
                  <div className="w-4 h-4" style={{ backgroundColor: 'rgba(224, 224, 224, 0.5)' }}></div>
                  <div className="text-xs">Industry Max</div>
                </div>
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='font-medium'>Environmental</div>
              <EnvironmentalChart
                companyValue={infoValue.environmentalCompanyValue}
                industryMeanValue={infoValue.environmentalIndustryMean}
                industryMaxValue={infoValue.environmentalIndustryMax}
                name={infoValue.name}
                title="Environmental"
                clr = "#2F9E91"
              />
              <div className='flex text-xs mt-0 pt-0'>{infoValue.name} {infoValue.environmentalCompanyValue} | Industry Mean {infoValue.environmentalIndustryMean} | Industry Max {infoValue.environmentalIndustryMax}</div>
              <div className='font-medium pt-2'>Social</div>
              <EnvironmentalChart
                companyValue={infoValue.socialCompanyValue}
                industryMeanValue={infoValue.socialIndustryMean}
                industryMaxValue={infoValue.socialIndustryMax}
                name={infoValue.name}
                title="Social"
                clr = "#E07A00"
              />
              <div className='flex flex-flex-nowrap text-xs'>{infoValue.name} {infoValue.socialCompanyValue} | Industry Mean {infoValue.socialIndustryMean} | Industry Max {infoValue.socialIndustryMax}</div>
              <div className='font-medium pt-2'>Governance and Economic</div>
              <EnvironmentalChart
                companyValue={infoValue.goveocCompanyValue}
                industryMeanValue={infoValue.goveocIndustryMean}
                industryMaxValue={infoValue.goveocIndustryMax}
                name={infoValue.name}
                title="Governance and Economic"
                clr = "#008cba"
              />
              <div className='flex flex-flex-nowrap text-xs'>{infoValue.name} {infoValue.goveocCompanyValue} | Industry Mean {infoValue.goveocIndustryMean} | Industry Max {infoValue.environmentalIndustryMax}</div>
            </div>
          </div>
        </div>

        {/* <div class="border border-gray-300 p-4 rounded bg-gray-100"> */}
        <div className="border border-gray-300 p-4">
         <h3 className="font-medium text-lg py-2">ESG Score Contribution</h3>
          <h4 className='font-medium pt-2 pb-1'>Global ESG Score Definition</h4>
          <p className='text-base'>The ESG Score measures a company's performance on and management of material ESG risks, opportunities, and impacts informed by a combination of company disclosures, media and stakeholder analysis, modeling approaches, and in-depth company engagement via the Global Corporate Sustainability Assessment (CSA).</p>
          <p className='text-base'>The Global ESG Score is a relative score measuring a company's performance on and management of ESG risks, opportunities, and impacts compared to their peers within the same industry classification.</p>
          <p className='text-base'>The Global ESG Score uses a double materiality approach whereby a sustainability issue is considered to be material if it presents a significant impact on society or the environment and a significant impact on a company's value drivers, competitive position, and long-term shareholder value creation.</p>
          <h4 className='font-medium pt-2 pb-1'>Global CSA Score Definition</h4>
          <p className='text-base'>The Global Corporate Sustainability Assessment (CSA) Score is theGlobal ESG Score without the inclusion of any modeling approaches.</p>
          <h4 className='font-medium pb-1 pt-2'>Media and Stakeholder Analysis (MSA)</h4>
          <p className='text-base pb-2'>The Global Media and Stakeholder Analysis (MSA) forms an integral part of the Global Corporate Sustainability Assessment (CSA) and enables Global to monitor companies'sustainability performance on an ongoing basis by assessing current controversies with potentially negative reputational or financial impacts.</p>
          
          <div className="flex space-x-16 pt-6">
          {/* First Box */}
          <div className="p-1 border border-gray-300 flex-1">
            <div className="relative flex items-center justify-center font-medium text-center text-sm py-2 group">
              <div className="mr-2">
                CSA Required Public Disclosure
                <span className="absolute left-1/2 transform -translate-x-1/2 mt-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 w-64 z-10 text-left">
                  Company disclosure that the CSA expects to be publicly available to score any points.
                </span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </div>
            <div className='font-medium text-center'>{infoValue.csaActualScore}</div>
            <EsgChart 
              companyValue={infoValue.csaActualScore}
              industryMeanValue={infoValue.csaPotentialScore}
              industryMaxValue={infoValue.csaMaxScore}
              clr="#4B7685"
              showTargetLine={true}
            />
            <div className='mx-6'>
              <div className='font-medium text-sm text-center mb-4'>CSA Required Public Disclosure</div>
              <div className='flex items-start'>
                <div className="w-4 h-4 mr-2" style={{ backgroundColor: '#4B7685' }}></div>
                <div className='text-xs font-light'>Actual Score based on Disclosure</div>
              </div>
              <div className='flex items-start py-2'>
                <div className="w-4 h-4 mr-2" style={{ backgroundColor: '#e1e7e8' }}></div>
                <div className='text-xs font-light'>Potential Score Contribution</div>
              </div>
              <div className='flex items-start'>
                <div className="font-bold mr-1" style={{ lineHeight: '0.5' }}>—</div>
                <div className='text-xs leading-none ml-1 font-light'>Maximum Industry Score</div>
              </div>
              <div className='w-full h-0.5 bg-gray-300 my-2'/>
              <div className="flex justify-between text-xs ">
                <div className="pr-4 w-3/5 font-normal">Disclosure Rate</div>
                <div className="w-1/5 text-right font-medium">{infoValue.csaDiscloser}%</div>
              </div>
              <div className="flex justify-between text-xs ">
                <div className="pr-4 w-3/5 font-normal">Data Availability Relative to Peers</div>
                <div className="w-1/5 text-right font-medium">{infoValue.csaAvailability}</div>
              </div>
              <div className='w-full h-0.5 bg-gray-300 my-2'/>
              <div className="flex justify-between text-xs ">
                <div className="pr-4 w-3/5 font-normal">Maximum Industry Score </div>
                <div className="w-1/5 text-right font-medium">{infoValue.csaMaxScore}</div>
              </div>
              <div className="flex justify-between text-xs ">
                <div className="pr-4 w-3/5 font-normal">Potential Score based on Disclosure Rate</div>
                <div className="w-1/5 text-right font-medium">{infoValue.csaPotentialScore}</div>
              </div>
              <div className='w-full h-0.5 bg-gray-300 my-2'/>
              <div className="flex justify-between text-xs pb-2 ">
                <div className="pr-4 w-3/5 font-normal">Actual Score based on Disclosure</div>
                <div className="w-1/5 text-right font-medium">{infoValue.csaActualScore}</div>
              </div>
            </div>
          </div>

          {/* Second Box */}
          <div className="p-1 border border-gray-300 flex-1">
            <div className="relative flex items-center justify-center font-medium text-center text-sm py-2 group">
              <div className="mr-2">
                CSA Additional Disclosure 
                <span className="absolute left-1/2 transform -translate-x-1/2 mt-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 w-64 z-10 text-left">
                  Company disclosure that the CSA requires to be publicly available to score any points.
                </span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </div>
            <div className='font-medium text-center'>{infoValue.csaAdditionalActualScore}</div>
            <EsgChart 
              companyValue={infoValue.csaAdditionalActualScore}
              industryMeanValue={infoValue.csaAdditionalPotentialScore}
              industryMaxValue={infoValue.csaAdditionalMaxScore}
              clr="#6f7273"
              showTargetLine={true}
            />
            <div className='mx-6'>
              <div className='font-medium text-sm text-center mb-4'>CSA Additional Disclosure</div>
              <div className='flex items-start'>
                <div className="w-4 h-4 mr-2" style={{ backgroundColor: '#6f7273' }}></div>
                <div className='text-xs font-light'>Actual Score based on Disclosure</div>
              </div>
              <div className='flex items-start py-2'>
                <div className="w-4 h-4 mr-2" style={{ backgroundColor: '#e1e7e8' }}></div>
                <div className='text-xs font-light'>Potential Score Contribution</div>
              </div>
              <div className='flex items-start'>
                <div className="font-bold mr-1" style={{ lineHeight: '0.5' }}>—</div>
                <div className='text-xs leading-none ml-1 font-light'>Maximum Industry Score</div>
              </div>
              <div className='w-full h-0.5 bg-gray-300 my-2' />
              <div className="flex justify-between text-xs ">
                <div className="pr-4 w-3/5 font-normal">Disclosure Rate</div>
                <div className="w-1/5 text-right font-medium">{infoValue.csaAdditionalDiscloser}%</div>
              </div>
              <div className="flex justify-between text-xs">
                <div className="pr-4 w-3/5 font-normal">Data Availability Relative to Peers</div>
                <div className="w-1/5 text-right font-medium">{infoValue.csaAdditionalAvailability}</div>
              </div>
              <div className='w-full h-0.5 bg-gray-300 my-2' />
              <div className="flex justify-between text-xs ">
                <div className="pr-4 w-3/5 font-normal">Maximum Industry Score </div>
                <div className="w-1/5 text-right font-medium">{infoValue.csaAdditionalMaxScore}</div>
              </div>
              <div className="flex justify-between text-xs ">
                <div className="pr-4 w-3/5 font-normal">Potential Score based on Disclosure Rate</div>
                <div className="w-1/5 text-right font-medium">{infoValue.csaAdditionalPotentialScore}</div>
              </div>
              <div className='w-full h-0.5 bg-gray-300 my-2' />
              <div className="flex justify-between text-xs pb-2 ">
                <div className="pr-4 w-3/5 font-normal">Actual Score based on Disclosure</div>
                <div className="w-1/5 text-right font-medium">{infoValue.csaAdditionalActualScore}</div>
              </div>
            </div>
          </div>

          {/* Third Box */}
          <div className="p-1 border border-gray-300 flex-1">
            <div className="relative flex items-center justify-center font-medium text-center text-sm py-2 group">
              <div className="mr-2">
                Modeled Scores
                <span className="absolute left-1/2 transform -translate-x-1/2 mt-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 w-64 z-10 text-left">
                  The weighted score contribution of the questions for which scores have been modeled in the absence of any disclosed data.
                </span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </div>
            <div className='font-medium text-center'>{infoValue.scoreModeled}</div>
            <EsgChart 
              companyValue={infoValue.scoreModeled}
              industryMeanValue={0}
              industryMaxValue={0}
              clr="#699C27"
              showTargetLine={false}
            />
            <div className='mx-6'>
              <div className='font-medium text-sm text-center mb-4'>Modeled Scores</div>
              <div className='flex items-start'>
                <div className="w-4 h-4 mr-2" style={{ backgroundColor: '#699C27' }}></div>
                <div className='text-xs font-light'>Modeled Score Contribution</div>
              </div>
              <div className='w-full h-0.5 bg-gray-300 mt-12' />
              <div className="flex justify-between text-xs pt-2">
                <div className="pr-2 w-3/5 font-normal">Number of questions based on modeling approaches</div>
                <div className="w-1/5 text-right font-medium">{infoValue.noofquesStart}/{infoValue.noofquesStartEnd}</div>
              </div>
              <div className='w-full h-0.5 bg-gray-300 my-2' />
              <div className="px-3 text-left font-normal text-xs">Questions based on modeling approaches vary by industry</div>
            </div>
          </div>

          {/* Fourth Box */}
          <div className="p-1 border border-gray-300 flex-1">
            <div className="relative flex items-center justify-center font-medium text-center text-sm py-2 group">
              <div className="mr-2">
                Global ESG Score
                <span className="absolute left-1/2 transform -translate-x-1/2 mt-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 w-64 z-10 text-left">
                  The Global ESG score measures a company's performance on and management of material ESG risks, opportunities, and impacts informed by a combination of company disclosures, media and stakeholder analysis, modeling approaches, and in-depth company engagement via the Global Corporate Sustainability Assessment (CSA).
                </span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </div>
            <div className='font-medium text-center'>{infoValue.scoreEsg}/100</div>
            <EsgChart 
              companyValue={infoValue.csaActualScore}
              industryMeanValue={infoValue.csaActualScore + infoValue.csaAdditionalPotentialScore}
              industryMaxValue={infoValue.scoreEsg}
              clr="#4B7685"
              showTargetLine={true}
              secClr='#6f7273'
              thirdValue={infoValue.csaActualScore + infoValue.csaAdditionalActualScore + infoValue.scoreModeled}
              lineType='Dash'
            />
            <div className='mx-6'>
              <div className='font-medium text-sm text-center mb-4'>Including Modeled Scores</div>
              <div className='flex items-center justify-center'>
                <div className="font-bold mr-1" style={{ lineHeight: '1' }}>--</div>
                <div className='text-xs leading-none font-light'>Industry Score Average</div>
              </div>
              <div className='w-full h-0.5 bg-gray-300 mt-12' />
            </div>
            <div className="px-3 pt-2 text-center font-medium">Updated annually as of September 24, 2024</div>

          </div>
        </div>
        <div className="flex items-center pt-3">
          <div className="font-medium text-center bg-blue-200 py-1 px-32 mx-2">Global CSA Score = {infoValue.scoreCsa}(Incl. MSA Adjustment)</div>
          <div className="mx-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          </div>
          <div className="mx-1 font-medium text-center bg-gray-200 py-1 px-16">Modeled Scores = {infoValue.scoreModeled}</div>
          <div className='ml-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth="2." stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 10 10-10 10" />
            </svg>
          
          </div>
          <div className="text-base mx-1 font-bold text-center ml-8 py-1">S&P Global ESG Score = {infoValue.scoreEsg}/100</div>
        </div>
      </div>
      <div className='flex flex-row mt-10 bg-white'>
        <div className='w-1/4'>
          <div className='font-medium text-2xl'>Company vs Industry Performance</div>
          <div className='font-normal text-2xl'>S&P Global has selected the most relevant criteria in each sustainability dimension based on their weight in the assessment and their current or expected significance for the industry. The adjacent spider chart visualizes the performance against the best score achieved within the industry in each criterion and the mean industry score.</div>
        </div>
          <div className='pl-20 pt-10'>
            <RadarChart 
                companyName={infoValue.graphCompanyName}
                companyValue={infoValue.graphCompanyValue}
                industryMax={infoValue.graphIndustryMax}
                industryMean={infoValue.graphIndustryMean}
                categoriesTitle={infoValue.graphCategoriesTitle}
            />
          </div>
        </div>

    <div className="flex flex-row items-start justify-end">
      <div className="flex flex-col items-center">
        <a href="/chatbot" target="_blank" rel="noopener noreferrer">
          <button className="h-16 px-4 bg-blue-500 text-white rounded hover:bg-white hover:text-black flex items-center">
            Go to Chatbot
          </button>
        </a>
      </div>
      <a href="/chatbot" target="_blank" rel="noopener noreferrer">
        <img 
          src={botImage} 
          alt="Chatbot" 
          className="h-16 w-16 ml-4 rounded-lg shadow-lg cursor-pointer hover:opacity-75"
        />
      </a>
    </div>

      
      </div>
      
    </div>
  );
};

export default Home;