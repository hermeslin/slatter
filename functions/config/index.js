const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  slack: {
    verifycationToken: process.env.SLACK_VERIFYCATION_TOKEN,
    accessToken: process.env.SLACK_BOT_ACCESS_TOKEN,
    emojiReaction: process.env.SLACK_EMOJI_REACTION,
    botUserId: process.env.SLACK_BOT_USER_ID,
  },
};
