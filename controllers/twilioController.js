require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const twilioController = {}

twilioController.sendCode =  (req, res, next) => {
  if (res.locals.isRegistered) return next();
  const {phoneNumber} = req.body;
  client.verify.v2.services('VA57ddeab2fff8a056699e0f0271954751')
    .verifications
    .create({to: `+1${phoneNumber}`, channel: 'sms'})
    .then(verification => {
      console.log(verification)
      return next();
    })
    .catch(() => {
      return next({
        log: 'twilioController.sendCode',
        message: { err: 'error inside twilio send code controller' }
      })
    })
}

twilioController.verifyPhone = async (req, res, next) => {
  const {phoneNumber, code} = req.body;
  client.verify.v2.services('VA57ddeab2fff8a056699e0f0271954751')
      .verificationChecks
      .create({to: `+1${phoneNumber}`, code})
      .then(verification_check => {
        console.log(verification_check.status)
        res.locals.didVerify = verification_check.status === 'approved';
        return next();
      })
      .catch(() => {
        return next({
          log: 'twilioController.verifyPhone',
          message: { err: 'error inside twilio verify phone controller' }
        })
      })
  //do something w the client
  
}

module.exports = twilioController;
