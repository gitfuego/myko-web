import express from 'express';
import cookieParser from 'cookie-parser';
const userController = require('../../controllers/userController.js');
const cookieController = require('../../controllers/cookieController.js');
const sessionController = require('../../controllers/sessionController.js');

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get('/api/login', sessionController.isLoggedIn, (req, res) => {
  if (res.locals.isSSIDValid) res.status(200).json(res.locals.userID);
  else res.status(501).sendStatus('Invalid SSID');
});

app.post(
  '/api/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    console.log(
      'i am inside login server and res...userId is',
      res.locals.userID
    );
    res.status(201).json({ userID: res.locals.userID });
  }
);

export default function handler(req, res) {
  app(req, res);
}