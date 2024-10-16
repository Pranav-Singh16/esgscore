import { atom } from 'recoil';

// Define the search term state
export const searchTermState = atom({
  key: 'searchTermState',
  default: '',
});

// Define the info atom with an effect
export const info = atom({
  key: 'infoState',
  default: {
    name: 'Apple Inc.',
    ticker: 'AAPL',
    industry: 'THQ Computers & Peripherals and Office Electronics',
    location: 'United States of America',
    dataAvailability: "High",
    lastUpdated: "September 24, 2024",
    scoreCsa: 39,
    scoreModeled: 7,
    scoreEsg: 46,
    environmentalCompanyValue: 54,
    environmentalIndustryMean: 44,
    environmentalIndustryMax: 95,
    socialCompanyValue: 44,
    socialIndustryMean: 43,
    socialIndustryMax: 90,
    goveocCompanyValue: 44,
    goveocIndustryMean: 43,
    goveocIndustryMax: 90,
    csaDiscloser: 76,
    csaAvailability: "High",
    csaMaxScore: 55,
    csaPotentialScore: 45,
    csaActualScore: 29,
    csaAdditionalDiscloser: 51,
    csaAdditionalAvailability: "High",
    csaAdditionalMaxScore: 45,
    csaAdditionalPotentialScore: 23,
    csaAdditionalActualScore: 13,
    noofquesStart: 25,
    noofquesEnd: 115,
    graphCompanyName: "Apple Inc",
    graphCompanyValue: [45, 31, 52, 66, 76, 51, 33, 38],
    graphIndustryMax: [95, 100, 100, 100, 99, 100, 95, 89, 100],
    graphIndustryMean: [42, 44, 32, 45, 50, 45, 45, 47],
    graphCategoriesTitle: ["Waste & Pollutants", "Customer Relations", "Privacy Protection, Product Stewardship", "Supply Chain Management", "Climate Strategy", "Labor Practices", "Human Capital Management", "Information Security/ Cybersecurity & System Availability"]
  },
  effects: [
    ({ setSelf, onSet }) => {
      // Log or perform actions when the atom's value changes
      onSet((newValue, oldValue) => {
        console.log('Info atom changed from', oldValue, 'to', newValue);
        // You can also perform other actions here, like saving to localStorage
      });

      // Optional: Initialize the atom's state if necessary
      const savedValue = localStorage.getItem('infoState');
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      // Optional: Save the state to localStorage whenever it changes
      onSet((newValue) => {
        localStorage.setItem('infoState', JSON.stringify(newValue));
      });
    }
  ]
});
