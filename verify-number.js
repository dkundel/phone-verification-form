const twilio = require('twilio');
const client = new twilio.LookupsClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = function (phoneNumber) {
  return client.phoneNumbers(phoneNumber).get()
    .then(numberData => {
      return {
        valid: true,
        country: numberData.country_code
      };
    }, err => {
      return { valid: false };
    });
}