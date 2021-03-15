const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const {
  createUser, login,
} = require('./controllers/users');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { errorLogger, requestLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3001, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on('open', () => console.log('MongooseDB connection...'));

app.use(requestLogger);
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`Aplication is working on the port ${PORT}`));
