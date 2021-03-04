const mongoose = require('mongoose');
const { default: validator } = require('validator');

const useCard = new mongoose.Schema({
  name: {
    type: String,
    requiared: [true, "Поле 'name' должно быть заполнено"],
    minlength: [2, "Минимальная длина поля  'name' - 2"],
    maxlength: [30, "Максимальная длина поля  'name' - 30"],
  },
  link: {
    type: String,
    required: [true, "Поле 'link' должно быть заполнено"],
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Поле 'link' должно быть валидным url-адресом",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    reqiured: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('card', useCard);
