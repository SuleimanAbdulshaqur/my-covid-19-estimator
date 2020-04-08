const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    timeToElapse,
    periodType,
    totalHospitalBeds,
    region,
  } = data;
  let factor;
  let period;
  if (periodType === 'days') {
    factor = Math.floor(timeToElapse / 3);
    period = timeToElapse;
  } else if (periodType === 'weeks') {
    factor = Math.floor((timeToElapse * 7) / 3);
    period = timeToElapse * 7;
  } else {
    factor = Math.floor((timeToElapse * 30) / 3);
    period = timeToElapse * 30;
  }

  const impactCurrentlyInfected = reportedCases * 10;
  const impactInfectionsByRequestedTime = impactCurrentlyInfected * (2 ** factor);
  const casesByRequestedTime = impactInfectionsByRequestedTime * 0.15;
  const impactHospitalBedsByRequestedTime = (totalHospitalBeds * 0.35) - casesByRequestedTime;
  const impactCasesForICUByRequestedTime = impactInfectionsByRequestedTime * 0.05;
  const impactCasesForVentilatorsByRequestedTime = impactInfectionsByRequestedTime * 0.02;
  const impactDollarsInFlight = impactInfectionsByRequestedTime * region.avgDailyIncomePopulation
                                    * region.avgDailyIncomeInUSD * period;


  const severeImpactCurrentlyInfected = reportedCases * 50;
  const severeImpactInfectionsByRequestedTime = severeImpactCurrentlyInfected * (2 ** factor);
  const severeCasesByRequestedTime = severeImpactInfectionsByRequestedTime * 0.15;
  const hospitalBedsByRequestedTime = (totalHospitalBeds * 0.35) - severeCasesByRequestedTime;
  const casesForICUByRequestedTime = severeImpactInfectionsByRequestedTime * 0.05;
  const casesForVentilatorsByRequestedTime = severeImpactInfectionsByRequestedTime * 0.02;
  const dollarsInFlight = severeImpactInfectionsByRequestedTime * region.avgDailyIncomePopulation
                            * region.avgDailyIncomeInUSD * period;

  const impact = {
    currentlyInfected: impactCurrentlyInfected,
    infectionsByRequestedTime: impactInfectionsByRequestedTime,
    severeCasesByRequestedTime: casesByRequestedTime,
    hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime,
    casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
    dollarsInFlight: impactDollarsInFlight,
  };
  const severeImpact = {
    currentlyInfected: severeImpactCurrentlyInfected,
    infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight,
  };
  return {
    data,
    impact,
    severeImpact,
  };
};
export default covid19ImpactEstimator;
