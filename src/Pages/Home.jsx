import searchImage from '../assets/images/search.jpg';
import botImage from '../assets/Images/bot.jpg';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from "highcharts/highcharts-more";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { searchTermState, info, chatbotVisibilityState } from '../state/atoms';
import Chatbot from './Chatbot';
import MyChart from '../charts/MyChart';
import EnvironmentalChart from '../charts/EnvironmentalChart';
import EsgChart from '../charts/EsgChart';
import RadarChart from '../charts/RadarChart';

const Home = () => {
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const [infoValue, setInfo] = useRecoilState(info);
  const [suggestions, setSuggestions] = useState([]);
  const [chatbotVisibility, setChatbotVisibility] = useRecoilState(chatbotVisibilityState);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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
    // event.preventDefault();
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

  const toggleChatbot = () => {
    setChatbotVisibility(prevState => !prevState); // Toggle the visibility state
  };

  useEffect(() => {
    // console.log('Search term changed:', searchTerm);
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
      // console.log("Updated Company Name:", newInfo);

    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  // useEffect to log all updated state values
  useEffect(() => {
    // console.log("Updated info after set:", infoValue);
  }, [infoValue]);


// console.log(infoValue.scoreCsa)
// useEffect to log all updated state values
useEffect(() => {
  // console.log("Updated info after set:", info);
}, [info]);




 return (
    <div className="bg-gray-900 min-h-screen justify-center text-white">
      <header className="px-5 bg-purple-500 h-12 md:h-16 flex items-center">
        <div className='flex justify-between w-full'>
          <div className="flex items-center">
            <div className="relative">
              <span className="text-white font-base font-bold font-sans md:text-xl">Alviridi</span>
              <div className="absolute -top-1 left-0 w-full h-0.5 bg-black"></div>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='px-2'>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Find ESG score..."
                  value={searchTerm}
                  onChange={handleChange}
                  className="relative rounded-lg w-40 h-[30px] pl-2 bg-black text-white focus:outline-none font-sans z-10 placeholder:text-gray-400 placeholder:text-sm 
                              md:h-[40px] md:w-64 md:placeholder:text-base"
                />
              </form>

              {/* Suggestions Box */}
              {suggestions.length > 0 && (
                <div className="absolute z-20 bg-gray-800 text-white border border-gray-600 rounded-lg w-64 max-w-[1308px] mt-1 shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <div key={index}>
                      <div
                        className="p-2 hover:bg-gray-700 cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </div>
                      {index < suggestions.length - 1 && (
                        <div className="border-b border-gray-600" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center text-white font-sans">
              <a href="/support" className="flex text-sm items-center font-roboto hover:underline mr-2 md:text-base"> 
                Support
              </a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                />
              </svg>
            </div>
          </div>  
        </div>
      </header>

      <div className='text-left text-2xl mt-4 ml-4 font-bold md:text-3xl font-roboto md:mt-8'>      
        {infoValue.name} ESG Score
      </div>
      <div className="flex flex-col  text-sm font-roboto md:flex-row my-2 text-gray-300 ml-4 md: my-4">
        <div className='flex justify-start'>
          <h2 className="font-medium">Ticker:</h2>
          <h2 className='pl-1 pr-4'>{infoValue.ticker}</h2>
        </div>
        <div className='flex justify-start'>
          <h2 className="font-medium">Industry:</h2>
          <h2 className='px-1 pr-4'>{infoValue.industry}</h2>
        </div>
        <div className='flex justify-start'>
          <h2 className="font-medium">Location:</h2>
          <h2 className='px-1 pr-4'>{infoValue.location}</h2>
        </div>
      </div>

      <div className='text-gray-300 flex flex-col md:flex-row '>
          <div className='pl-4'>
            <h2 className="font-semibold text-white text-lg font-roboto md:text-2xl">Global ESG Score</h2>
            <h2 className="leading-relaxed text-white text-6xl font-roboto font-bold mr-10 pr-20 font-roboto top-0  text-9xl md:text-10xl">
              {infoValue.scoreEsg}
            </h2>
            <h3 className='font-roboto'>Data Availability: {infoValue.dataAvailability}</h3>
            {/* <h3 className='max-w-48 font-roboto'>Last Updated: September 24, 2024</h3> */}
            <h3 className='font-roboto w-48 text-left'>Updated annually or in response to major developments</h3>
          </div>

          <div className='class="basis-1/4" font-roboto mt-2 ml-4 md:mt-0 pr-20'>
            <h2 className="font-semibold font-roboto text-2xl mb-10">Score Composition</h2>
            <MyChart />
          </div>

          <div className='ml-4 class="basis-1/2"'>
            <h2 className="font-semibold font-roboto text-2xl mt-0 mb-2">Score Breakdown</h2>
            <div>
              <div className='ml-4'>
                <div className="flex items-center font-roboto space-x-1">
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
            <div className='flex flex-col font-roboto'>
              <div className='font-medium pt-2 ml-4 md:ml-0'>Environmental</div>
              <EnvironmentalChart
                companyValue={infoValue.environmentalCompanyValue}
                industryMeanValue={infoValue.environmentalIndustryMean}
                industryMaxValue={infoValue.environmentalIndustryMax}
                name={infoValue.name}
                title="Environmental"
                clr = "#2F9E91"
              />
              <div className='flex text-xs mt-0 pt-0 pl-8 font-roboto md:pl-0'>{infoValue.name} {infoValue.environmentalCompanyValue} | Industry Mean {infoValue.environmentalIndustryMean} | Industry Max {infoValue.environmentalIndustryMax}</div>
              <div className='font-medium pt-2 font-roboto ml-4 md:ml-0'>Social</div>
              <EnvironmentalChart
                companyValue={infoValue.socialCompanyValue}
                industryMeanValue={infoValue.socialIndustryMean}
                industryMaxValue={infoValue.socialIndustryMax}
                name={infoValue.name}
                title="Social"
                clr="#FF5722"
              />
              <div className='flex flex-flex-nowrap text-xs pl-8 font-roboto md:pl-0'>{infoValue.name} {infoValue.socialCompanyValue} | Industry Mean {infoValue.socialIndustryMean} | Industry Max {infoValue.socialIndustryMax}</div>
              <div className='font-medium pt-2 font-roboto ml-4 md:ml-0'>Governance and Economic</div>
              <EnvironmentalChart
                companyValue={infoValue.goveocCompanyValue}
                industryMeanValue={infoValue.goveocIndustryMean}
                industryMaxValue={infoValue.goveocIndustryMax}
                name={infoValue.name}
                title="Governance and Economic"
                clr="#2196F3" // Bright Blue

              />
              <div className='flex flex-flex-nowrap text-xs pl-8 font-roboto md:pl-0'>{infoValue.name} {infoValue.goveocCompanyValue} | Industry Mean {infoValue.goveocIndustryMean} | Industry Max {infoValue.environmentalIndustryMax}</div>
            </div>
          </div>

      </div>  

      <div className="border border-gray-300 font-roboto text-gray-300 mx-4 mt-8 text-xs p-4 md:text-sm">
        <h3 className="font-medium text-lg py-2">ESG Score Contribution</h3>
        <h4 className='font-medium pt-2 pb-1'>Global ESG Score Definition</h4>
        <p className='text-base text-justify'>The ESG Score measures a company's performance on and management of material ESG risks, opportunities, and impacts informed by a combination of company disclosures, media and stakeholder analysis, modeling approaches, and in-depth company engagement via the Global Corporate Sustainability Assessment (CSA).</p>
        {isExpanded && (
          <>
            <p className='text-base text-justify'>The Global ESG Score is a relative score measuring a company's performance on and management of ESG risks, opportunities, and impacts compared to their peers within the same industry classification.</p>
            <p className='text-base text-justify'>The Global ESG Score uses a double materiality approach whereby a sustainability issue is considered to be material if it presents a significant impact on society or the environment and a significant impact on a company's value drivers, competitive position, and long-term shareholder value creation.</p>
            <h4 className='font-medium pt-2 pb-1'>Global CSA Score Definition</h4>
            <p className='text-base text-justify'>The Global Corporate Sustainability Assessment (CSA) Score is the Global ESG Score without the inclusion of any modeling approaches.</p>
            <h4 className='font-medium pb-1 pt-2'>Media and Stakeholder Analysis (MSA)</h4>
            <p className='text-base pb-2 text-justify'>The Global Media and Stakeholder Analysis (MSA) forms an integral part of the Global Corporate Sustainability Assessment (CSA) and enables Global to monitor companies' sustainability performance on an ongoing basis by assessing current controversies with potentially negative reputational or financial impacts.</p>
          </>
        )}
        <button 
          onClick={toggleExpand} 
          className="mt-4 text-blue-500 hover:underline"
        >
          {isExpanded ? 'View Less' : 'View More'}
        </button>

        <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 pt-6">

          {/* First Box */}
          <div className="p-1 border max-w-30 border-gray-300 mx-10 flex-1 md:max-w-22 md:mx-0">
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
            <div className='font-semibold text-lg text-center'>{infoValue.csaActualScore}</div>
            <EsgChart 
              companyValue={infoValue.csaActualScore}
              industryMeanValue={infoValue.csaPotentialScore}
              industryMaxValue={infoValue.csaMaxScore}
              clr="#4B7685"
              showTargetLine={true}
              // width={300}
              height="h-40 md:h-80"
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
                <div className="font-bold mr-1 text-red-500" style={{ lineHeight: '1' }}>—</div>
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
          <div className="p-1 border border-gray-300 flex-1 mx-10 md:max-w-22 md:mx-0">
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
            <div className='font-semibold text-lg text-center'>{infoValue.csaAdditionalActualScore}</div>
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
                <div className="font-bold mr-1 text-red-500" style={{ lineHeight: '1' }}>—</div>
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
          <div className="p-1 border border-gray-300 flex-1 mx-10 md:max-w-22 md:mx-0">
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
            <div className='font-semibold text-lg text-center'>{infoValue.scoreModeled}</div>
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
                <div className="w-1/5 text-right font-medium">{infoValue.noofquesStart}/{infoValue.noofquesEnd}</div>
              </div>
              <div className='w-full h-0.5 bg-gray-300 my-2' />
              <div className="px-3 text-left font-normal text-xs">Questions based on modeling approaches vary by industry</div>
            </div>
          </div>

          {/* Fourth Box */}
          <div className="p-1 border border-gray-300 flex-1 mx-10 md:max-w-22 md:mx-0">
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
            <div className='font-semibold text-lg text-center'>{infoValue.scoreEsg}/100</div>
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
                <div className="font-bold mr-1 text-red-500" style={{ lineHeight: '1' }}>--</div>
                <div className='text-xs leading-none font-light'>Industry Score Average</div>
              </div>
              <div className='w-full h-0.5 bg-gray-300 mt-12' />
            </div>
            <div className="px-3 pt-2 text-center font-medium">Updated annually as of September 24, 2024</div>

          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center pt-3 bg-gray-900 p-4">
          <div className="font-medium text-center bg-blue-400 text-white py-1 px-4 md:px-32 mx-2 rounded shadow">
            Global CSA Score = {infoValue.scoreCsa}(Incl. MSA Adjustment)
          </div>
          
          <div className="mx-5 md:mx-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          
          <div className="mx-1 font-medium text-center bg-gray-800 text-white py-1 px-4 md:px-16 rounded shadow">
            Modeled Scores = {infoValue.scoreModeled}
          </div>
          
          <div className='ml-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 10 10-10 10" />
            </svg>
          </div>
          
          <div className="text-base mx-1 font-bold text-center py-1 text-white">
            S&P Global ESG Score = {infoValue.scoreEsg}/100
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row font-roboto mt-10 bg-gray-900'>
        <div className='w-full md:w-1/4 px-4 text-justify-left flex flex-col items-center md:items-start'>
            <div className='font-medium text-2xl text-white text-center md:text-left'>Company vs Industry Performance</div>
            <div className='font-normal text-xl text-gray-300 text-justify md:text-left'>
                ESG score has selected the most relevant criteria in each sustainability dimension based on their weight in the assessment and their current or expected significance for the industry. The adjacent spider chart visualizes the performance against the best score achieved within the industry in each criterion and the mean industry score.
            </div>
        </div>
        <div className='w-full md:w-3/4 md:justify-end pt-10'>
            <RadarChart 
                companyName={infoValue.graphCompanyName}
                companyValue={infoValue.graphCompanyValue}
                industryMax={infoValue.graphIndustryMax}
                industryMean={infoValue.graphIndustryMean}
                categoriesTitle={infoValue.graphCategoriesTitle}
            />
        </div>
      </div>
      {/* <div className="flex flex-col bg-gray-900">
        <div className="flex flex-row items-start justify-end p-4">
          <div className="flex flex-col items-center">
            <button 
              onClick={toggleChatbot}
              className="h-16 px-4 bg-purple-500 text-white rounded hover:bg-blue-500 hover:text-black flex items-center"
            >
              Go to Chatbot
            </button>
          </div>

          <img 
            src={botImage}
            alt="Chatbot"
            className="h-16 w-16 rounded-lg shadow-lg cursor-pointer hover:opacity-75"
            onClick={toggleChatbot}
          />
        </div>

        <div className="my-2 mx-4">
          {chatbotVisibility && <Chatbot />}
        </div>
      </div> */}

<div className="flex flex-col bg-gray-900">
  <div className="flex flex-row items-start justify-end p-4">
    {/* Button to open/close the chatbot */}
    <div className="flex flex-col items-center">
      <button 
        onClick={toggleChatbot}  // Toggle the chatbot visibility
        className="h-16 px-4 bg-purple-500 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 flex items-center"
      >
        Go to Chatbot
      </button>
    </div>

    <img 
      src={botImage}  // Assuming botImage is defined elsewhere
      alt="Chatbot"
      className="h-16 w-16 rounded-lg shadow-lg cursor-pointer hover:opacity-75"
      onClick={toggleChatbot}  // Toggle the chatbot visibility on click
    />
  </div>

  {/* Conditionally render the Chatbot */}
  <div className="my-2 mx-4">
    {chatbotVisibility && <Chatbot />}
  </div>
</div>


       
    </div>
  );
};

export default Home;