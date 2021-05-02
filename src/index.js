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

const getSessionsPerCenter = (vaccinationCalendarPerCenter) => {
  const availableSessionsPerCenter = {};
  for (let i = 0; i < vaccinationCalendarPerCenter.length; i += 1) {
    if (vaccinationCalendarPerCenter[i].available_capacity > 0) {
      availableSessionsPerCenter[vaccinationCalendarPerCenter[i].date] = vaccinationCalendarPerCenter[i].available_capacity;
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

const getAvailableSessions = async (pinCode) => {
  const date = getDate();
  const vaccinationCalendar = await getVaccinationCalendarByPin(pinCode, date);
  const availableSessions = getSessionsForAllCenters(vaccinationCalendar);
  const message = formatSMS(availableSessions, pinCode, date);
  sendSMS(message, pinCode, date);
};

getAvailableSessions(process.argv[2]);
