// const express = require('express');
// const app = express();
// const PORT = 3001;
// const { Server } = require('socket.io');
// const userController = require('./controllers/userController.js');
// const cookieController = require('./controllers/cookieController.js');
// const sessionController = require('./controllers/sessionController.js');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');

// app.use(express.json());

// app.use(
//   cors({
//     origin: 'http://http://localhost:8080/',
//     credentials: true,
//   })
// );

// app.use(cookieParser());



// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//       origin: "http://localhost:8080",
//       methods: ["GET", "POST"]
//   },
// })

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });

//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//     io.emit('chat message', msg);
//   });
// });

// server.listen(PORT, () => {
//   console.log(`listening on *:${PORT}`);
// });
