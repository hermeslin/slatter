const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  slack: {
    verifycationToken: process.env.SLACK_VERIFYCATION_TOKEN,
    accessToken: process.env.SLACK_BOT_ACCESS_TOKEN,
    emojiReaction: process.env.SLACK_EMOJI_REACTION,
    botUserId: process.env.SLACK_BOT_USER_ID,
    beforeTweetEmojiReaction: process.env.SLACK_BEFORE_TWEET_EMOJI_REACTION,
    afterTweetEmojiReaction: process.env.SLACK_AFTER_TWEET_EMOJI_REACTION,
  },
  twitter: {
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_KEY_SECRET,
    accessTokenKey: process.env.TWITTER_API_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET,
  },
};
