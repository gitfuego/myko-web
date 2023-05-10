const db = require('../models');
const messageController = {};

messageController.getMessages = async (req, res, next) => {
  const artistID = req.query.artist;
  const getMessages = `SELECT message_text, user_id, artist_id, message_media, created_at 
    FROM messages 
    WHERE artist_id = $1
    ORDER BY created_at ASC`;
  const values = [artistID];

  try {
    const messageList = await db.query(getMessages, values);
    res.locals.messages = messageList.rows;
    return next();
  } catch (error) {
    return next({
      log: 'messageController.getMessageList error',
      message: { err: 'ERROR in messageController.getMessageList' },
    });
  }
};

messageController.addMessage = (req, res, next) => {
  const {
    message_text,
    sender_id,
    artist_id,
  } = req.body;
  const newMessage = `INSERT INTO messages (message_text, user_id, artist_id)
  VALUES ($1, $2, $3) RETURNING *`;
  const values = [
    message_text,
    sender_id,
    artist_id,
  ];

  db.query(newMessage, values)
    .then((data) => {
      if (data.rows[0] === undefined) {
        return next({
          log: 'createJob',
          message: { err: 'ERROR: Enter job application' },
        });
      }
      res.locals.createdJob = data.rows[0];
      return next();
    })
    .catch(() => {
      next({
        log: 'userController.createJob',
        message: { err: 'error inside create job controller' },
      });
    });
};


module.exports = messageController;
