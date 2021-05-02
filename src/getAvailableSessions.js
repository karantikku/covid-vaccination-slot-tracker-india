require('../config');
const axios = require('axios');
const { sendSMS } = require('./utils/sendSMS');
const { getDate } = require('./utils/getDate');
const { formatSMS } = require('./utils/formatSMS');

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

const getSessionsPerCenter = (vaccinationCalendarPerCenter, isMinAgeEighteen) => {
  const availableSessionsPerCenter = {};
  for (let i = 0; i < vaccinationCalendarPerCenter.length; i += 1) {
    if (isMinAgeEighteen) {
      if (vaccinationCalendarPerCenter[i].available_capacity > 0 && vaccinationCalendarPerCenter[i].min_age_limit === '18') {
        availableSessionsPerCenter[vaccinationCalendarPerCenter[i].date] = vaccinationCalendarPerCenter[i].available_capacity;
      }
    } else if (vaccinationCalendarPerCenter[i].available_capacity > 0) {
      availableSessionsPerCenter[vaccinationCalendarPerCenter[i].date] = vaccinationCalendarPerCenter[i].available_capacity;
    }
  }
  return availableSessionsPerCenter;
};

const getSessionsForAllCenters = (vaccinationCalendar, isMinAgeEighteen) => {
  const availableSessions = {};
  for (let i = 0; i < vaccinationCalendar.centers.length; i += 1) {
    availableSessions[vaccinationCalendar.centers[i].name] = getSessionsPerCenter(vaccinationCalendar.centers[i].sessions, isMinAgeEighteen);
  }
  return availableSessions;
};

const getAvailableSessions = async (pinCode, age) => {
  const date = getDate();
  let isMinAgeEighteen = false;
  if (parseInt(age, 10) < 45) {
    isMinAgeEighteen = true;
  }
  const vaccinationCalendar = await getVaccinationCalendarByPin(pinCode, date);
  const availableSessions = getSessionsForAllCenters(vaccinationCalendar, isMinAgeEighteen);
  const message = formatSMS(availableSessions, pinCode, date);
  sendSMS(message, pinCode, date);
};

module.exports = { getAvailableSessions };
