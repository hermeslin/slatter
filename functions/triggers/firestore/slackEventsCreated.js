const functions = require('firebase-functions');
const reactionAdded = require('../../utils/slack/reactionAdded');

/**
 * Document path
 */
const document = '/slack_events/{uuid}';

/**
 * On document created
 * @param {*} snapshot
 * @param {*} context
 */
const onCreate = async (snapshot, context) => {
  // const uuid = context.params.uuid;
  const event = snapshot.data();

  switch (event.type) {
    case 'reaction_added':
      reactionAdded(event);
      break;
  }
};

module.exports = functions.firestore.document(document).onCreate(onCreate);
