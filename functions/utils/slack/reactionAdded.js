const slackWebApi = require('@slack/web-api');
const config = require('../../config');

/**
 *
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  const { WebClient, LogLevel } = slackWebApi;
  const {
    event: {
      item: {
        channel: channelId,
        ts,
      },
      reaction,
      item_user: itemUser,
    },
  } = req.body;

  if (reaction !== config.slack.emojiReaction) {
    res.status(200).send({ message: 'wrong reaction' });
    return;
  }

  // ignore bot user's reaction
  if (itemUser === config.slack.botUserId) {
    res.status(200).send({ message: 'wrong user' });
    console.log(itemUser);
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

    // TODO: save message into firestore
    console.log(message);
  } catch (error) {
    console.error(error);
  }
};
