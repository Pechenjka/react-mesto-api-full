const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { Forbidden } = require('../errors/index');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Forbidden('Нет токена');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Forbidden('Нет токена');
  }
  req.user = payload;

  next();
};

module.exports = auth;
