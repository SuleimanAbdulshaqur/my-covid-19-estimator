/* eslint-disable max-len */
// let data = {
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71,
//   },
//   periodType: 'days',
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614,
// };


// work for challenge 1
const infected = (reportedCases, x) => reportedCases * x;

const infectionsByTime = (currentlyInfected, periodType, timeToElapse) => {
  let days;

  if (periodType === 'months') {
    days = timeToElapse * 30;
  } else if (periodType === 'weeks') {
    days = timeToElapse * 7;
  } else if (periodType === 'days') {
    days = timeToElapse;
  }

  return currentlyInfected * (2 ** (Math.floor(days / 3)));
};

const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  // reported cases * 10 as currentlyInfected in impact
  impact.currentlyInfected = infected(data.reportedCases, 10);
  // reported cases * 50 as currentlyInfected in severeImpact
  severeImpact.currentlyInfected = infected(data.reportedCases, 50);

  // currentlyInfected for both cases * 2^factor for both imp and sevImp
  impact.infectionsByRequestedTime = infectionsByTime(impact.currentlyInfected, data.periodType, data.timeToElapse);
  severeImpact.infectionsByRequestedTime = infectionsByTime(severeImpact.currentlyInfected, data.periodType, data.timeToElapse);

  return {
    data,
    impact,
    severeImpact,
  };
};

export default covid19ImpactEstimator;
