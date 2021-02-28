import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import useFormWithValidation from '../hooks/useForm';
import Spinner from './Spinner';

const EditProfilePopup = (props) => {
  const { isOpen, onClose, onUpdateUser, isLoading } = props;

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();
  const currentUser = React.useContext(CurrentUserContext);

  //Обработчик сабмита формы
  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser(values);
  };
  //Эффект для установки первоначальных состояний полей в модальном окне
  React.useEffect(() => {
    currentUser && resetForm(currentUser);
  }, [currentUser, resetForm]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      submitButton={`${isLoading ? 'Сохранение...' : 'Сохранить'}`}
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
            className="popup__input popup__form-author popup__form_author_name"
            id="nameAuthor-input"
            type="text"
            name="name"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            value={values.name || ''}
          />
          <span
            className={`popup__form-input-error ${
              !isValid ? 'popup__form-input-error_active' : ''
            }`}
            id="nameAuthor-input-error"
          >
            {errors.name}
          </span>
          <input
            className="popup__input popup__form-author popup__form_author_about"
            id="aboutAuthor-input"
            type="text"
            name="about"
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
            onChange={handleChange}
            value={values.about || ''}
          />
          <span
            className={`popup__form-input-error ${
              !isValid ? 'popup__form-input-error_active' : ''
            }`}
            id="aboutAuthor-input-error"
          >
            {errors.about}
          </span>
        </fieldset>
      )}
    </PopupWithForm>
  );
};

export default EditProfilePopup;
