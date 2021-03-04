const { BadRequest, NotFound, Forbidden } = require('../errors/index');
const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => {
      Card.findById(card._id)
        .populate('owner')
        .then((data) => res.status(200).send(data))
        .catch(() => {
          throw new NotFound('Карточка не найдена');
        });
    })
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
    .orFail(new NotFound(`Not found: ${id}`))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Not found') {
        throw new Forbidden('Нет права на удаление чужой карточки');
      }
    })
    .catch(next);
};

const putLikeCard = (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: _id } }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: true, // если пользователь не найден, он будет создан
  })
    .populate(['owner', 'likes'])
    .orFail(() => { throw new NotFound('Документ не найден'); })
    .then((like) => res.send(like))
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
  Card.findByIdAndUpdate(id, { $pull: { likes: _id } }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .populate(['owner', 'likes'])
    .orFail(() => { throw new NotFound('Документ не найден'); })
    .then((dislike) => res.send(dislike))
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
