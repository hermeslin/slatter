const reactionAdded = require('../utils/slack/reactionAdded');

/**
 *
 * @param {*} req
 * @param {*} res
 */
module.exports = (req, res) => {
  console.log(req.body);

  const { event } = req.body;
  switch (event.type) {
    case 'reaction_added':
      reactionAdded(req, res);
      break;
    default:
      res.status(400).send({ message: 'Event Not Exists' });
  }
};
