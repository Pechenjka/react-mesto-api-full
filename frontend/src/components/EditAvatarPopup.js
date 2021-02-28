import PopupWithForm from './PopupWithForm';
import React from 'react';
import useFormWithValidation from '../hooks/useForm';
import Spinner from './Spinner';

const EditAvatarPopup = (props) => {
  const { isOpen, onClose, onUpdateAvatar, isLoading } = props;
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  //Обработчик сабмита формы
  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateAvatar(values);
  };

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="new-avatar"
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
            className="popup__input  popup__form_edit-avatar"
            id="avatarLink-input"
            type="url"
            placeholder="Ссылка на аватарку"
            name="avatar"
            required
            onChange={handleChange}
            value={values.avatar || ''}
          />
          <span
            className={`popup__form-input-error ${
              !isValid ? 'popup__form-input-error_active' : ''
            }`}
            id="avatarLink-input-error"
          >
            {errors.name}
          </span>
        </fieldset>
      )}
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
