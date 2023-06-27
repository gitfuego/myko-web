const db = require('../models');
const messageController = {};

messageController.getMessages = async (req, res, next) => {
  const { artistID, userID } = req.params;
  const getMessages = `SELECT m.message_id AS message_id, m.user_id AS user_id, m.artist_id AS artist_id, m.message_text AS message_text, m.message_media AS message_media, m.created_at AS created_at,
  COUNT(l.user_id) AS like_count,
  (CASE WHEN EXISTS (SELECT 1 FROM likes WHERE message_id = m.message_id AND user_id = $2)
        THEN 1
        ELSE 0
  END) AS user_liked,
  u.username AS username, u.profile_pic AS profile_pic
  FROM messages AS m
  RIGHT JOIN users AS u ON m.user_id = u.user_id
  LEFT JOIN likes AS l ON m.message_id = l.message_id
  WHERE m.artist_id = $1
  GROUP BY m.message_id, m.user_id, m.artist_id, m.message_text, m.message_media, u.username, u.profile_pic
  ORDER BY m.created_at DESC
  LIMIT 10`;
  const values = [artistID, userID];

  try {
    const data = await db.query(getMessages, values);
    res.locals.messages = data.rows.reverse();
    return next();
  } catch (error) {
    return next({
      log: 'messageController.getMessageList error',
      message: { err: 'ERROR in messageController.getMessageList' },
    });
  }
};

messageController.loadMoreMessages = async (req, res, next) => {
  const { artistID, userID, numMessagesShown } = req.params;
  const loadMoreMessages = `SELECT m.message_id AS message_id, m.user_id AS user_id, m.artist_id AS artist_id, m.message_text AS message_text, m.message_media AS message_media, m.created_at AS created_at,
  COUNT(l.user_id) AS like_count,
  (CASE WHEN EXISTS (SELECT 1 FROM likes WHERE message_id = m.message_id AND user_id = $2)
        THEN 1
        ELSE 0
  END) AS user_liked,
  u.username AS username, u.profile_pic AS profile_pic
  FROM messages AS m
  RIGHT JOIN users AS u ON m.user_id = u.user_id
  LEFT JOIN likes AS l ON m.message_id = l.message_id
  WHERE m.artist_id = $1
  GROUP BY m.message_id, m.user_id, m.artist_id, m.message_text, m.message_media, u.username, u.profile_pic
  ORDER BY m.created_at DESC
  LIMIT 10 OFFSET $3`;
  const values = [artistID, userID, numMessagesShown];

  try {
    const data = await db.query(loadMoreMessages, values);
    res.locals.messages = data.rows.reverse();
    return next();
  } catch (error) {
    return next({
      log: 'messageController.loadMoreMessages error',
      message: { err: 'ERROR in messageController.loadMoreMessages' },
    });
  }
};

module.exports = messageController;
