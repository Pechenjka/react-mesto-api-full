import PopupWithForm from './PopupWithForm';
import useFormWithValidation from '../hooks/useForm';
import React from 'react';
import Spinner from './Spinner';

const AddPlacePopup = (props) => {
  const { isOpen, onClose, onAddPlace, isLoading } = props;

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  //Обработчик сабмита формы
  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPlace(values);
  };
  //Эффект для установки первоначальных состояний кнопки и полей в модальном окне
  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      submitButton={`${isLoading ? 'Создание...' : 'Создать'}`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!isValid}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <fieldset className="popup__form-input">
          <input
            className="popup__input popup__form-author popup__form_card_name"
            id="cardName-input"
            type="text"
            placeholder="Название"
            name="name"
            required
            minLength="2"
            maxLength="30"
            onChange={handleChange}
            value={values.name || ''}
          />
          <span
            className={`popup__form-input-error ${
              !isValid ? 'popup__form-input-error_active' : ''
            }`}
            id="cardName-input-error"
          >
            {errors.name}
          </span>
          <input
            className="popup__input popup__form-author popup__form_card_link"
            id="cardLink-input"
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            required
            onChange={handleChange}
            value={values.link || ''}
          />
          <span
            className={`popup__form-input-error ${
              !isValid ? 'popup__form-input-error_active' : ''
            }`}
            id="cardLink-input-error"
          >
            {errors.link}
          </span>
        </fieldset>
      )}
    </PopupWithForm>
  );
};

export default AddPlacePopup;
