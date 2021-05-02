const cron = require('node-cron');
const { getAvailableSessions } = require('./getAvailableSessions');

cron.schedule(`*/${process.env.REFRESH_WINDOW} * * * *`, async () => {
  await getAvailableSessions(process.env.PINCODE, process.env.AGE);
});
