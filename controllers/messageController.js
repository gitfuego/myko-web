const db = require('../models');
const messageController = {};

messageController.getMessages = async (req, res, next) => {
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
      log: 'messageController.getMessageList error',
      message: { err: 'ERROR in messageController.getMessageList' },
    });
  }
};

// messageController.addMessage = (req, res, next) => {
//   const {
//     message_text,
//     sender_id,
//     artist_id,
//   } = req.body;
//   const newMessage = `INSERT INTO messages (message_text, user_id, artist_id)
//   VALUES ($1, $2, $3) RETURNING *`;
//   const values = [
//     message_text,
//     sender_id,
//     artist_id,
//   ];

//   db.query(newMessage, values)
//     .then((data) => {
//       if (data.rows[0] !== undefined) {
//         console.log(data.rows[0])
//       }
//     })
//     .catch(() => {
//     console.log('error posting msg to db')  
//     });
// };


module.exports = messageController;
