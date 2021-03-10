const functions = require('firebase-functions');
const admin = require('../../utils/firebase/admin');
const reactionAdded = require('../../utils/slack/reactionAdded');

/**
 * firebase instance
 */
const db = admin.firestore();

/**
 * Document path
 */
const collection = 'slack_events';

/**
 * On document created
 * @param {*} snapshot
 * @param {*} context
 */
const onCreate = async (snapshot, context) => {
  const uuid = context.params.uuid;
  const event = snapshot.data();

  switch (event.type) {
    case 'reaction_added':
      reactionAdded(event);
      break;
  }

  // delete reaction added event data, reduce firestore disk space usage.
  db.collection(collection).doc(uuid).delete();
};

/**
 * export firestore onCreate trigger
 */
module.exports = functions.firestore.document(`/${collection}/{uuid}`).onCreate(onCreate);
