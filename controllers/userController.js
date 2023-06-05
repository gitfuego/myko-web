const db = require('../models')
const bcrypt = require('bcrypt');

const userController = {}

userController.createUser = async (req, res, next) => {
  const { name, phoneNumber, password } = req.body
  const newUser = `INSERT INTO Users (username, phone_number, password)
  VALUES ($1, $2, $3) RETURNING *`
  const hash = await bcrypt.hash(password, 10);
  const values = [name, phoneNumber, hash];
  db.query(newUser, values)
    .then(data => {
      if (data.rows[0] === undefined) {
        return next({
          log: 'createUser',
          message: { err: 'ERROR: Enter valid user' }
        })
      }
      res.locals.createdUser = data.rows[0];
      return next()
    }).catch(() => {
      return next({
      log: 'userController.createUser',
      message: { err: 'error inside create user controller' }
    });
  });
}

userController.getUserInfo = (req, res, next) => {
  if (!res.locals.isSSIDValid) return next();
  const { userID } = res.locals;
  const verifyQuery = `SELECT * FROM Users
  WHERE user_id = $1`
  const values = [userID];

  db.query(verifyQuery, values)
    .then(data => {
      if (data.rows[0]) {
        res.locals.user = data.rows[0];
        delete res.locals.user.password;
        return next();
      } else {
        return next({
          log: 'getUserInfo',
          message: { err: 'ERROR: could not get user info' }
        });
      }
    }).catch(() => { 
      return next({
      log: 'userController.getUserInfo',
      message: { err: 'error inside get user info controller' }
    });
  });
}

userController.verifyUser = (req, res, next) => {
  const { phoneNumber, password } = req.body
  console.log('i am req body from login', req.body);
  const verifyQuery = `SELECT * FROM Users
  WHERE phone_number = $1`
  const values = [phoneNumber];

  db.query(verifyQuery, values)
    .then(data => {
      const passMatch = bcrypt.compareSync(password, data.rows[0].password);
      console.log('i am passMatch: ', passMatch);
      if (passMatch) {
        res.locals.user = data.rows[0];
        delete res.locals.user.password;
        console.log(res.locals.user);
        return next();
      } else {
        return next({
          log: 'verifyUser',
          message: { err: 'ERROR: Enter valid user' }
        });
      }
    }).catch(() => { 
      return next({
      log: 'userController.verifyUser',
      message: { err: 'error inside verify user controller' }
    });
  });
}

userController.updateProfile = (req, res, next) => {
  const { userID } = req.params;
  const { imageUrl, username } = req.body;
  const updatePicQuery = `UPDATE users SET profile_pic = $1, username = $2 WHERE user_id = $3;`
  const values = [imageUrl, username, userID];

  db.query(updatePicQuery, values)
    .then((data) => {
      return next();
    })
    .catch(() => {
      return next({
        log: 'userController.updateProfile',
        message: { err: 'error inside update profile controller' }
      });
    })
}

module.exports = userController;
