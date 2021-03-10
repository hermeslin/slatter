const functions = require('firebase-functions');
const admin = require('../../utils/firebase/admin');
const statusesUpdate = require('../../utils/twitter/statusesUpdate');

/**
 * firebase instance
 */
const db = admin.firestore();

/**
 * Document path
 */
const collection = 'slack_messages';

/**
 * On document created
 * @param {*} snapshot
 * @param {*} context
 */
const onCreate = async (snapshot, context) => {
  const uuid = context.params.uuid;
  const {
    text,
    files,
    type,
    ts,
    channel,
  } = snapshot.data();

  if (type !== 'message') {
    console.log(`not correct type: ${type}`);
  }

  if (!files) {
    statusesUpdate({ channel, text, ts });
  }

  // delete reaction added event data, reduce firestore disk space usage.
  db.collection(collection).doc(uuid).delete();
};

/**
 * export firestore onCreate trigger
 */
module.exports = functions.firestore.document(`/${collection}/{uuid}`).onCreate(onCreate);
