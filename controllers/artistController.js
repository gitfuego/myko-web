const db = require('../models');
const artistController = {};

artistController.addRequest = async (req, res, next) => {
  const { artistID, userID } = req.body;
  console.log(artistID, userID)
  const newRequest = `INSERT INTO Requests (artist_id, user_id)
  VALUES ($1, $2) RETURNING *`
  const values = [artistID, userID];

  try {
    const data = await db.query(newRequest, values);
    res.locals.messages = data.rows;
    return next();
  } catch (error) {
    return next({
      log: 'artistController.addRequest',
      message: { err: 'artistController.addRequest' },
    });
  }
};

artistController.getRequestCount = async (req, res, next) => {
  const { artistID } = req.body;
  console.log(artistID)
  const getRequestCount = `SELECT COUNT(*) AS numrequests
    FROM requests
    WHERE artist_id = $1`;
  const values = [artistID];
  try {
    const data = await db.query(getRequestCount, values);
    res.locals.numRequests = Number(data.rows[0].numrequests);
    return next();
  } catch (error) {
    return next({
      log: 'artistController.getRequestCount error',
      message: { err: 'ERROR in artistController.getRequestCount' },
    });
  }
};

artistController.checkRequest = async (req, res, next) => {
  const { artistID, userID } = req.body;
  console.log(artistID)
  const checkRequest = `SELECT *
    FROM requests
    WHERE artist_id = $1 AND user_id = $2`;
  const values = [artistID, userID];

  try {
    const data = await db.query(checkRequest, values);
    res.locals.didRequest = data.rows.length > 0;
    return next();
  } catch (error) {
    return next({
      log: 'artistController.checkRequest error',
      message: { err: 'ERROR in artistController.checkRequest' },
    });
  }
};

artistController.checkIfRegistered = async (req, res, next) => {
  const { artistID } = req.params;
  console.log(artistID)
  const checkIfRegistered = `SELECT *
    FROM artists
    WHERE spotify_id = $1`;
  const values = [artistID];

  try {
    const data = await db.query(checkIfRegistered, values);
    res.locals.isRegistered = data.rows.length > 0;
    return next();
  } catch (error) {
    return next({
      log: 'artistController.checkIfRegistered error',
      message: { err: 'ERROR in artistController.checkIfRegistered' },
    });
  }
};

module.exports = artistController;
