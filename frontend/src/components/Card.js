import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

//Разметка для карточек
const Card = (props) => {
  const { card, onCardClick, onCardLike, onConfirmDeleteCardClick } = props;

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete ${isOwn ? 'card__delete_visible' : ''}`;

  const isLiked = card.likes.some((item) => {
    return item._id === currentUser._id;
  });
  const cardLikeButtonClassName = `card__like-button ${isLiked ? 'card__like-button_active' : ''}`;

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onConfirmDeleteCardClick(card);
  };

  return (
    <li className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить карточку"
        onClick={handleDeleteClick}
      ></button>

      <h3 className="card__title">{card.name}</h3>
      <div className="card__like-container">
        <button
          className={cardLikeButtonClassName}
          type="button"
          aria-label="Поставить лайк"
          onClick={handleLikeClick}
        ></button>
        <span className="card__like-count">{card.likes.length}</span>
      </div>
    </li>
  );
};

export default Card;
