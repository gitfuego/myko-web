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
      if (passMatch) {
        res.locals.user = data.rows[0];
        delete res.locals.user.password;
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

userController.updatePassword = async (req, res, next) => {
  const { phoneNumber, password } = req.body;
  const updatePasswordQuery = `UPDATE users SET password = $1 WHERE phone_number = $2;`
  const hash = await bcrypt.hash(password, 10);
  const values = [hash, phoneNumber];

  db.query(updatePasswordQuery, values)
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

userController.checkIfRegistered = (req, res, next) => {
  const { phoneNumber } = req.body;
  const checkPhoneNumberQuery = `SELECT * FROM users WHERE phone_number = $1;`
  const values = [phoneNumber];

  db.query(checkPhoneNumberQuery, values)
    .then((data) => {
      res.locals.isRegistered = data.rows.length > 0;
      return next();
    })
    .catch(() => {
      return next({
        log: 'userController.checkIfRegistered',
        message: { err: 'error inside check if registered controller' }
      });
    })
}

userController.followArtist = (req, res, next) => {
  const { userID, artistID } = req.body;
  const checkPhoneNumberQuery = `INSERT INTO follows (user_id, artist_id)
  VALUES ($1, $2) RETURNING *;`
  const values = [userID, artistID];

  db.query(checkPhoneNumberQuery, values)
    .then((data) => {
      if (data.rows[0]) return next();
    })
    .catch(() => {
      return next({
        log: 'userController.followArtist',
        message: { err: 'error inside follow artist controller' }
      });
    })
}

userController.unfollowArtist = (req, res, next) => {
  const { userID, artistID } = req.body;
  const checkPhoneNumberQuery = `DELETE FROM follows 
  WHERE user_id = $1 AND artist_id = $2 RETURNING *;`
  const values = [userID, artistID];

  db.query(checkPhoneNumberQuery, values)
    .then((data) => {
      if (data.rows[0]) return next();
    })
    .catch(() => {
      return next({
        log: 'userController.followArtist',
        message: { err: 'error inside follow artist controller' }
      });
    })
}

userController.getFollowed = (req, res, next) => {
  const {userID} = req.params;
  const getFollowedQuery = `SELECT artist_id FROM follows 
  WHERE user_id = $1;`
  const values = [userID];

  db.query(getFollowedQuery, values)
    .then((data) => {
      res.locals.followedArtists = data.rows;
      return next();
    })
    .catch(() => {
      return next({
        log: 'userController.getFollowed',
        message: { err: 'error inside get followed controller' }
      });
    })
}

module.exports = userController;
