const db = require('../models');
const artistController = {};

artistController.addRequest = async (req, res, next) => {
  const { artistID, userID } = req.body;
  console.log(artistID)
  const getMessages = `SELECT m.user_id AS userID, m.artist_id AS artistID, m.message_text AS message_text, m.message_media AS message_media, u.username AS username, u.profile_pic AS profile_pic
    FROM messages AS m
    RIGHT JOIN users AS u
    ON m.user_id = u.user_id
    WHERE m.artist_id = $1
    ORDER BY created_at ASC
    LIMIT 10`;
  const values = [artistID];

  try {
    const data = await db.query(getMessages, values);
    res.locals.messages = data.rows;
    return next();
  } catch (error) {
    return next({
      log: 'artistController.addRequest',
      message: { err: 'artistController.addRequest' },
    });
  }
};

artistController.getRequests = async (req, res, next) => {
  const { artistID } = req.params;
  console.log(artistID)
  const getMessages = `SELECT m.user_id AS userID, m.artist_id AS artistID, m.message_text AS message_text, m.message_media AS message_media, u.username AS username, u.profile_pic AS profile_pic
    FROM messages AS m
    RIGHT JOIN users AS u
    ON m.user_id = u.user_id
    WHERE m.artist_id = $1
    ORDER BY created_at ASC
    LIMIT 10`;
  const values = [artistID];

  try {
    const data = await db.query(getMessages, values);
    res.locals.messages = data.rows;
    return next();
  } catch (error) {
    return next({
      log: 'artistController.getRequests error',
      message: { err: 'ERROR in artistController.getRequests' },
    });
  }
};

artistController.checkIfRegistered = async (req, res, next) => {
  const { artistID } = req.params;
  console.log(artistID)
  const getMessages = `SELECT m.user_id AS userID, m.artist_id AS artistID, m.message_text AS message_text, m.message_media AS message_media, u.username AS username, u.profile_pic AS profile_pic
    FROM messages AS m
    RIGHT JOIN users AS u
    ON m.user_id = u.user_id
    WHERE m.artist_id = $1
    ORDER BY created_at ASC
    LIMIT 10`;
  const values = [artistID];

  try {
    const data = await db.query(getMessages, values);
    res.locals.messages = data.rows;
    return next();
  } catch (error) {
    return next({
      log: 'artistController.getRequests error',
      message: { err: 'ERROR in artistController.getRequests' },
    });
  }
};



module.exports = artistController;
