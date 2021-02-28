const { BadRequest, NotFound } = require('../errors/index');
const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Не правильно заполнено одно из полей');
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndRemove(id)
    .orFail(new Error('Not found'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Not found') {
        throw new NotFound(`Нет пользователя с таким: ${id}`);
      }
    })
    .catch(next);
};

const putLikeCard = (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: _id } },
    { new: true })
    .orFail(() => { throw new NotFound('Документ не найден'); })
    .then((like) => res.status(200).send({ data: like }))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Not found') {
        throw new NotFound(`Нет пользователя с таким: ${id}`);
      }
    })
    .catch(next);
};

const deleteLikeCard = (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { $pull: { likes: _id } }, { new: true })
    .orFail(() => { throw new NotFound('Документ не найден'); })
    .then((like) => res.status(200).send({ data: like }))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Not found') {
        throw new NotFound(`Нет пользователя с таким: ${id}`);
      }
    })
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, putLikeCard, deleteLikeCard,
};