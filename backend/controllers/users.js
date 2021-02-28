const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET, JWT_TTL } = require('../config');
const {
  Unauthirized, BadRequest, Conflict, NotFound,
} = require('../errors/index');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// const getUser = (req, res) => {
//   const { id } = req.params;
//   User.findById(id)
//     .orFail(new Error('Not found'))
//     .then((user) => res.send({ data: user }))
//     .catch((err) => {
//       if (err.name === 'CastError' || err.message === 'Not found') {
//         return res
//           .status(404)
//           .send({ message: `user not found with id: ${id}` });
//       }
//       return res.status(500).send({ message: err.message });
//     });
// };
const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFound(`Нет пользователя с таким: ${_id}`);
      }
      return res.send({ data: user });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Не правильно заполнено одно из полей');
      }
      throw new Conflict(`${email} или ${password} уже используется`);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        JWT_SECRET,
        { expiresIn: JWT_TTL });
      res.status(200).send({ token });
    })
    .catch(() => {
      throw new Unauthirized('Необходима авторизация');
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    _id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Не правильно заполнено одно из полей');
      }
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    _id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest(`Не правильно заполнено поле ${avatar} `);
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  // getUser,
  createUser,
  updateProfile,
  updateUserAvatar,
  login,
  getCurrentUser,
};