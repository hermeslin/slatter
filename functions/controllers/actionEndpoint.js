const config = require('../config/index');

/**
 *
 * @param {*} request
 * @param {*} response
 */
module.exports = (request, response) => {
  const token = request.body.token;
  const challenge = request.body.challenge;
  const type = request.body.type;

  if (
    token !== config.slack.token ||
    type !== 'url_verification'
  ) {
    response.status(400).send({ challenge: null });
    return;
  }

  response.status(200).send({ challenge });
};
