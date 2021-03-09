const admin = require('../utils/firebase/admin');

const acceptEventTypeList = [
  'reaction_added',
];

const db = admin.firestore();

/**
 *
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  const { event } = req.body;

  if (acceptEventTypeList.includes(event.type)) {
    try {
      await db.collection('slack_events').add(event);
      res.status(200).send({ message: 'ok' });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Server Error' });
    }
  }

  res.status(200).send({ message: 'Event Not Exists' });
};
