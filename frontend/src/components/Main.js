import Card from './Card';
import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

const Main = (props) => {
  const {
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onConfirmDeleteCardClick,
    onCardClick,
    onCardLike,
    cards,
  } = props;

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__author">
          <div className="profile__edit-avatar">
            <img
              alt="Фотография автора"
              className="profile__image-author"
              onClick={onEditAvatar}
              src={currentUser.avatar}
            />
          </div>
          <div className="profile__description-author">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              onClick={onEditProfile}
              type="button"
              aria-label="Открытие окна редактирования профиля автора"
            ></button>
            <p className="profile__about-author">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          onClick={onAddPlace}
          type="button"
          aria-label="Добавление карточки"
        ></button>
      </section>
      <section className="grid-cards">
        <ul className="cards">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onConfirmDeleteCardClick={onConfirmDeleteCardClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Main;
