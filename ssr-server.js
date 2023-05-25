const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();
const PORT = 3000;


const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController.js');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
  const server = express();
  server.use(cookieParser());
  server.use(express.json());

  const http = require('http').createServer(server);
  const io = require('socket.io')(http, {
    cors: {origin: '*'}
  });

  // Keep track of users and rooms
  const users = {};
  const rooms = {};

  io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('join', (data) => {
      // Store user data
      const { user, room } = data;
      // socket.username = user.username;
      socket.user = user;
      socket.room = room;
  
      // Join room
      socket.join(room);
  
      // Store user and room data
      users[socket.id] = user.username;
      rooms[socket.id] = room;

      console.log(`a user (${users[socket.id]}) joined room: ` + room)
  
      // Broadcast to other users in the room
      // socket.to(room).emit('user joined', `${user.username} has joined the room`);
  
      // Send list of users in the room
      // const usersInRoom = Object.values(users).filter(user => rooms[socket.id] === rooms[user]);
      // io.to(room).emit('users in room', usersInRoom);
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
  
      // Remove user and room data
      delete users[socket.id];
      delete rooms[socket.id];
  
      // Broadcast to other users in the room
      // socket.to(socket.room).emit('user left', `${socket.username} has left the room`);
    });
  
    socket.on('message', (msgData) => {
      // console.log('message: ' + msgData.message);
      // TODO: save msgs to database
      // Broadcast message to users in the room
      io.to(socket.room).emit('message', {
        ...msgData
      });
    });
  });

  server.post('/api/spotifyLogin', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
      redirectUri: 'http://localhost:3000/home',
      clientId: "9ed4ae02c05d4296857b53d2397fee6a",
      clientSecret: process.env.CLIENT_SECRET,
    })

    spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(() => {
      res.sendStatus(400);
    })
  })

  server.post('/api/spotifyRefresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
      redirectUri: 'http://localhost:3000/home',
      clientId: "9ed4ae02c05d4296857b53d2397fee6a",
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken,
    })

    spotifyApi.refreshAccessToken()
    .then(data => {
      console.log(data);

      // spotifyApi.setAccessToken(data.body['access_token']);
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(() => {
      res.sendStatus(400);
    })
  })

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
        'userId is',
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

  http.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  })
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});