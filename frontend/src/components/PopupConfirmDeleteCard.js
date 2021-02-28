import React from 'react';
import PopupWithForm from './PopupWithForm';
import Spinner from './Spinner';

const PopupConfirmDeleteCard = (props) => {
  const { isOpen, onClose, onCardDelete, isLoading } = props;

  function handleConfirmSubmit(event) {
    event.preventDefault();
    onCardDelete();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      submitButton={`${isLoading ? 'Удаление...' : 'Да'}`}
      name="delete-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleConfirmSubmit}
    >
      {isLoading ? <Spinner /> : ''}
    </PopupWithForm>
  );
};

export default PopupConfirmDeleteCard;
