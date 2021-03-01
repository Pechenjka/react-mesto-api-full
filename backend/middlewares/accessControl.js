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
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  }
  next();
};

module.exports = accessControlCors;
