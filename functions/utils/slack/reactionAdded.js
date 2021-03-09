const slackWebApi = require('@slack/web-api');
const config = require('../../config');
const admin = require('../../utils/firebase/admin');

/**
 *
 * @param {*} event event data from firestore that controller received before
 */
module.exports = async (event) => {
  const { WebClient, LogLevel } = slackWebApi;
  const {
    user,
    item: {
      channel: channelId,
      ts,
    },
    reaction,
  } = event;

  if (reaction !== config.slack.emojiReaction) {
    console.warning({ message: 'wrong reaction' });
    return;
  }

  // ignore bot user's reaction
  if (user === config.slack.botUserId) {
    console.warning({ message: 'wrong user' });
    console.log(user);
    return;
  }

  const client = new WebClient(config.slack.accessToken, {
    // LogLevel can be imported and used to make debugging simpler
    logLevel: LogLevel.ERROR,
  });

  try {
    // Call the conversations.history method using WebClient
    const result = await client.conversations.history({
      channel: channelId,
      latest: ts,
      limit: 1,
      inclusive: true,
    });

    // get fisrt message form messages
    const [message] = result.messages;

    // save message into firestore
    const db = admin.firestore();
    const dbResult = await db.collection('slack_messages').add(message);

    // reply emoji to original message
    if (dbResult.id) {
      await client.reactions.add({
        channel: channelId,
        name: config.slack.beforeTweetEmojiReaction,
        timestamp: ts,
      });

      console.log({ message: 'ok' });
    }
  } catch (error) {
    console.error(error);
  }
};
