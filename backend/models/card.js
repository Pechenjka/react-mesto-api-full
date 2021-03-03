const mongoose = require('mongoose');

const useCard = new mongoose.Schema({
  name: {
    type: String,
    requiared: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const regExp = /^((http|https):\/\/)?(www\.)?[a-zA-Z0-9-]{1,}\.?([a-z0-9]{1,})?\.([a-z0-9]{1,})?\.?\w{1,}?(\/([\w#!:.?+=&%@!\-/])*)?/;
        return regExp.test(v);
      },
      message: 'enter URL',
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
