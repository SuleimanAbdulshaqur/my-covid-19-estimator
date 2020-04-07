/* eslint-disable no-unused-vars */
function submitForm() {
  const data = {
    region: {
      name: document.querySelector('.data-region').value,
      country: document.querySelector('.data-country').value,
    },
    periodType: document.querySelector('.data-period-type').value,
    timeToElapse: document.querySelector('.data-time-to-elapse').value,
    reportedCases: document.querySelector('.data-reported-cases').value,
    population: document.querySelector('.data-population').value,
    totalHospitalBeds: document.querySelector('.data-total-hospital-beds').value,
  };

  return data;
}

const values = document.querySelector('.data-go-estimate').addEventListener('click', (e) => {
  e.preventDefault();
  submitForm();
});
