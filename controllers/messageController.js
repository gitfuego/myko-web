const db = require('../models');
const messageController = {};

messageController.getMessages = async (req, res, next) => {
  const artistID = req.query.artist;
  const getMessages = `SELECT message_text, sender_id, artist_id, sent_at 
    FROM messages 
    WHERE artist_id = $1
    ORDER BY sent_at ASC`;
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

messageController.sendMessage = (req, res, next) => {
  const {
    message_text,
    sender_id,
    artist_id,
  } = req.body;
  const newMessage = `INSERT INTO messages (message_text, sender_id, artist_id)
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

// jobController.deleteJob = async (req, res, next) => {
//   const { id } = req.params;
//   const deleteJob = `DELETE FROM jobs WHERE job_id = $1 RETURNING *`;
//   const values = [id];

//   try {
//     const deleted = await db.query(deleteJob, values);
//     res.locals.deletedJob = deleted.rows[0];
//     return next();
//   } catch {
//     return next({
//       log: 'jobTrackerController.deleteJob error',
//       message: { err: 'ERROR in jobTrackerController.deleteJob controller' },
//     });
//   }
// };

// jobController.updateJobApp = async (req, res, next) => {
//   console.log('WE ARE HERE');
//   const { id } = req.params;
//   console.log('request body', req.body);
//   const {
//     job_role,
//     company_name,
//     email,
//     phone,
//     contact_name,
//     job_link,
//     status,
//   } = req.body;
//   console.log(
//     'updates inputs are: ',
//     job_role,
//     company_name,
//     email,
//     phone,
//     contact_name,
//     job_link,
//     status
//   );
//   const updateJobApp = `UPDATE jobs SET job_role = $2, company_name = $3, email = $4, phone = $5, contact_name = $6, job_link = $7, status = $8 WHERE job_id = $1 RETURNING *;`;
//   const values = [
//     id,
//     job_role,
//     company_name,
//     email,
//     phone,
//     contact_name,
//     job_link,
//     status,
//   ];

//   try {
//     const updatedJobApp = await db.query(updateJobApp, values);
//     // console.log('updateJobApp: ', updatedJobApp);
//     console.log('updated App: ', updatedJobApp.rows[0]);
//     res.locals.updatedJobApp = updatedJobApp.rows[0];
//     console.log('response body: ', res.locals.updatedJobApp);
//     return next();
//   } catch {
//     return next({
//       log: 'jobTrackerController.updateJob error',
//       message: { err: 'ERROR in jobTrackerController.updateJob controller' },
//     });
//   }
// };

module.exports = messageController;
