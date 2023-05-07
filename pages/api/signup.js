import express from 'express';
const userController = require('../../controllers/userController.js');

const app = express();

app.use(express.json());

app.post('/api/signup', userController.createUser, (req, res) => {
  res.json({ message: 'Signup successful' });
});

export default function handler(req, res) {
  app(req, res);
}
