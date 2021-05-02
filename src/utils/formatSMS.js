module.exports = {
  formatSMS: (body, pinCode, date) => {
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
  },
};
