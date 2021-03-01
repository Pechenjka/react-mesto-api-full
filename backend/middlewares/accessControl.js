const allowedCors = [
  'api.lobachev.students.nomoreparties.space',
  'www.api.lobachev.students.nomoreparties.space',
  'lobachev.students.nomoreparties.space',
  'www.lobachev.students.nomoreparties.space',

];

const accessControlCors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
};

module.exports = accessControlCors;
