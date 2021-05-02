require('../config');
const axios = require('axios');
const { sendSMS } = require('./utils/sendSMS');
const { getDate } = require('./utils/getDate');

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

function formatSMS(body, pinCode, date) {
  const centers = Object.keys(body);
  let message = '';
  message += 'Vaccination Sessions for the week';
  message += `Pincode: ${pinCode}\n From Date: ${date}\n`;
  for (let i = 0; i < centers.length; i += 1) {
    const availableSessions = Object.keys(body[centers[i]]);
    if (availableSessions.length > 0) {
      message += '\n';
      message += `${centers[i]}: `;
      message += '\n';
      for (let j = 0; j < availableSessions.length; j += 1) {
        message += `${availableSessions[j]}: ${body[centers[i]][availableSessions[j]]}\n`;
      }
    }
  }
  return message;
}
async function getAvailableSessions(pinCode) {
  const date = getDate();
  const vaccinationCalendar = await getVaccinationCalendarByPin(pinCode, date);
  const availableSessions = getSessionsForAllCenters(vaccinationCalendar);
  const message = formatSMS(availableSessions, pinCode, date);
  await sendSMS(message, pinCode, date);
}

getAvailableSessions(process.argv[2]);
