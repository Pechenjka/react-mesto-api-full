const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { default: validator } = require('validator');
const Unauthirized = require('../errors/index');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, "Минимальная длина поля  'name' - 2"],
    maxlength: [30, "Максимальная длина поля  'name' - 30"],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, "Минимальная длина поля  'name' - 2"],
    maxlength: [30, "Максимальная длина поля  'name' - 30"],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Поле 'avatar' должно быть валидным url-адресом",
    },
  },
  email: {
    type: String,
    required: [true, "Поле 'email' должно быть заполнено"],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Поле 'email' должно быть валидным url-адресом",
    },
  },
  password: {
    type: String,
    required: [true, "Поле 'password' должно быть заполнено"],
    select: false,
    minlength: 8,
  },
});
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthirized('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthirized('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
