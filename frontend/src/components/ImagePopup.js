import React from 'react';

//Модальное окно карточки
const ImagePopup = (props) => {
  const { selectedCard, onClose, isOpen } = props;

  return (
    <section className={`popup popup__open-card ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container-open-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="popup__close-button popup__close-button_open-card"
          type="button"
          onClick={onClose}
          aria-label="Закрытие окна просмотра карточки"
        ></button>
        <figure className="popup__open-card-figure">
          <img
            src={selectedCard ? selectedCard.link : ''}
            alt={selectedCard ? selectedCard.name : ''}
            className="popup__open-card-image"
          />
          <figcaption className="popup__open-card-figcaption">
            {selectedCard ? selectedCard.name : ''}
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
export default ImagePopup;
