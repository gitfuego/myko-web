require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const twilioController = {}

twilioController.verifyPhone = (req, res, next) => {
  const {phoneNumber, code} = req.body;
  //do something w the client
  const bool = true;
  res.locals.didVerify = bool;
  
  return next();
}

module.exports = twilioController;
