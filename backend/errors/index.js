const NotFound = require('./NotFound');
const Unauthirized = require('./Unauthorized');
const BadRequest = require('./BadRequest');
const Forbidden = require('./Forbidden');
const Conflict = require('./Conflict');

module.exports = {
  NotFound, Unauthirized, BadRequest, Forbidden, Conflict,
};
