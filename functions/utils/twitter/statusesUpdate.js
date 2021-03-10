const slackWebApi = require('@slack/web-api');
const Twitter = require('twitter-lite');
const config = require('../../config');

/**
 *
 * @param {*} slackMessage
 */
const statusesUpdate = async (slackMessage) => {
  const { WebClient, LogLevel } = slackWebApi;
  const { channel: channelId, text, ts } = slackMessage;

  const client = new Twitter({
    consumer_key: config.twitter.consumerKey,
    consumer_secret: config.twitter.consumerSecret,
    access_token_key: config.twitter.accessTokenKey,
    access_token_secret: config.twitter.accessTokenSecret,
  });

  try {
    const tweet = await client.post('statuses/update', {
      status: text,
    });

    if (tweet.id_str) {
      const client = new WebClient(config.slack.accessToken, {
        // LogLevel can be imported and used to make debugging simpler
        logLevel: LogLevel.ERROR,
      });

      await client.reactions.remove({
        channel: channelId,
        name: config.slack.beforeTweetEmojiReaction,
        timestamp: ts,
      });

      await client.reactions.add({
        channel: channelId,
        name: config.slack.afterTweetEmojiReaction,
        timestamp: ts,
      });

      console.log({ message: `successfully Tweet, attach reaction ${config.slack.afterTweetEmojiReaction} back.` });
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * export reactionAdded function
 */
module.exports = statusesUpdate;
