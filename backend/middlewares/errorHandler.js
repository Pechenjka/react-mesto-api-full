// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // console.log(err);
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  return res.status(500).send({ message: err.message });
};

module.exports = errorHandler;
