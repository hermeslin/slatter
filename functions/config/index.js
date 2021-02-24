const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  slack: {
    token: process.env.SLACK_TOKEN,
  },
};
