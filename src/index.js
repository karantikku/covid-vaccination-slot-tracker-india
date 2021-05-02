const axios = require('axios');

const getVaccinationCalendarByPin = async (pinCode, date) => {
  try {
    const { data } = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pinCode}&date=${date}`);
    return data;
  } catch (err) {
    return {
      err,
    };
  }
};

const getSessionsPerCenter = (centerVaccinationCalendarPerCenter) => {
  const availableSessionsPerCenter = {};
  for (let i = 0; i < centerVaccinationCalendarPerCenter.length; i += 1) {
    if (centerVaccinationCalendarPerCenter[i].available_capacity > 0) {
      availableSessionsPerCenter[centerVaccinationCalendarPerCenter[i].date] = centerVaccinationCalendarPerCenter[i].available_capacity;
    }
  }
  return availableSessionsPerCenter;
};

const getSessionsForAllCenters = (vaccinationCalendar) => {
  const availableSessions = {};
  for (let i = 0; i < vaccinationCalendar.centers.length; i += 1) {
    availableSessions[vaccinationCalendar.centers[i].name] = getSessionsPerCenter(vaccinationCalendar.centers[i].sessions);
  }
  return availableSessions;
};

async function getAvailableSessions(pinCode, date) {
  const vaccinationCalendar = await getVaccinationCalendarByPin(pinCode, date);
  // eslint-disable-next-line no-prototype-builtins
  if (vaccinationCalendar.hasOwnProperty('err')) {
    return 'Unable to fetch sessions';
  }
  const availableSessions = getSessionsForAllCenters(vaccinationCalendar);
  console.log(availableSessions);
}

getAvailableSessions(process.argv[2], process.argv[3]);
