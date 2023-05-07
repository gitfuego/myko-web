const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser');

const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController.js');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express();
  server.use(cookieParser());
  server.use(express.json());

  server.post('/api/signup', userController.createUser, (req, res) => {
    res.json({ message: 'Signup successful', user: res.locals.createdUser });
  });

  server.get('/api/login', sessionController.isLoggedIn, userController.getUserInfo, (req, res) => {
    if (res.locals.isSSIDValid) res.status(200).json({...res.locals.user});
    else res.status(501).send('Invalid SSID');
  });

  server.get('/api/signout', (req, res) => {
    res.clearCookie('ssid');
    res.sendStatus(204);
  })
  
  server.post(
    '/api/login',
    userController.verifyUser,
    cookieController.setSSIDCookie,
    sessionController.startSession,
    (req, res) => {
      console.log(
        'i am inside login server and res...userId is',
        res.locals.user.user_id
      );
      res.status(201).json({ ...res.locals.user });
    }
  );

  server.get('*', (req, res) => {
    return handle(req, res);
  })

  server.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error caught in unknown middleware error',
      status: 400,
      message: { err: 'an error occured' },
    };
    const errorObj = Object.assign(defaultErr, err);
    return res.status(errorObj.status).send(errorObj.message);
  });

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  })
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});