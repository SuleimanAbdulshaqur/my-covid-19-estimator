/* eslint-disable max-len */
/* eslint-disable eqeqeq */
const infected = (reportedCases, x) => reportedCases * x;
const infectionsByTime = (currentlyInfected, periodType, timeToElapse) => {
  let days;

  if (periodType == 'months') {
    days = timeToElapse * 30;
  } else if (periodType == 'weeks') {
    days = timeToElapse * 7;
  } else {
    days = timeToElapse;
  }

  return currentlyInfected * (2 ** (Math.trunc(days / 3)));
};
const percentOfInfectection = (infectionsByRequestedTime) => (Math.trunc(0.15 * infectionsByRequestedTime));
const availableBeds = (totalBeds, severeCases) => (Math.trunc((0.35 * totalBeds) - severeCases));
const fivePerc = (infectionsByRequestedTime) => (Math.trunc(0.05 * infectionsByRequestedTime));
const twoPerc = (infectionsByRequestedTime) => (Math.trunc(0.02 * infectionsByRequestedTime));

const dollarGone = (infectionsByRequestedTime, dailyInc, incPop, periodType, timeToElapse) => {
  let days;
  if (periodType == 'months') {
    days = timeToElapse * 30;
  } else if (periodType == 'weeks') {
    days = timeToElapse * 7;
  } else {
    days = Math.round(timeToElapse);
  }

  return (Math.trunc((infectionsByRequestedTime * dailyInc * incPop) / days));
};
const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  // Challenge 1
  // reported cases * 10 as currentlyInfected in impact
  impact.currentlyInfected = infected(data.reportedCases, 10);
  // reported cases * 50 as currentlyInfected in severeImpact
  severeImpact.currentlyInfected = infected(data.reportedCases, 50);
  // currentlyInfected for both cases * 2^factor for both imp and sevImp
  impact.infectionsByRequestedTime = infectionsByTime(impact.currentlyInfected, data.periodType, data.timeToElapse);
  severeImpact.infectionsByRequestedTime = infectionsByTime(severeImpact.currentlyInfected, data.periodType, data.timeToElapse);
  // Challenge 2
  // 15% of infectionbyreqtime as severeCasesByRequestedTime for both
  impact.severeCasesByRequestedTime = percentOfInfectection(impact.infectionsByRequestedTime);
  severeImpact.severeCasesByRequestedTime = percentOfInfectection(severeImpact.infectionsByRequestedTime);
  // hospitalBedsByRequestedTime = Hospitalbeds - sevCasebyReq
  impact.hospitalBedsByRequestedTime = availableBeds(data.totalHospitalBeds, impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = availableBeds(data.totalHospitalBeds, severeImpact.severeCasesByRequestedTime);
  // 5% of infectionsbyreqtime as casesForICUByRequestedTime
  impact.casesForICUByRequestedTime = fivePerc(impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = fivePerc(severeImpact.infectionsByRequestedTime);
  // 2% of infectionsbyreqtime as casesForVentilatorsByRequestedTime
  impact.casesForVentilatorsByRequestedTime = twoPerc(impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = twoPerc(severeImpact.infectionsByRequestedTime);
  // dollarsInFlight = infectionsbyreqtime * avgdailyinc * avgdailyincpop * timetoelapse
  impact.dollarsInFlight = dollarGone(impact.infectionsByRequestedTime, data.region.avgDailyIncomeInUSD, data.region.avgDailyIncomePopulation, data.periodType, data.timeToElapse);
  severeImpact.dollarsInFlight = dollarGone(severeImpact.infectionsByRequestedTime, data.region.avgDailyIncomeInUSD, data.region.avgDailyIncomePopulation, data.periodType, data.timeToElapse);
  return {
    data,
    impact,
    severeImpact,
  };
};
export default covid19ImpactEstimator;
