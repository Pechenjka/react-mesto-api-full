import React, { Fragment } from 'react';

//Общая разметка для всех модальных окон
const PopupWithForm = (props) => {
  const {
    name,
    title,
    isOpen,
    onClose,
    children,
    submitButton,
    onSubmit,
    disabled,
    classes,
    isInfoTooltip,
    checkIcon,
    titleInfoTooltips,
  } = props;

  return (
    <div>
      <section className={`popup popup__${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
        <div className="popup__container " onClick={(e) => e.stopPropagation()}>
          <button
            className="popup__close-button"
            type="button"
            aria-label="Закрытие модального окна"
            onClick={onClose}
          ></button>
          {isInfoTooltip === true ? (
            <Fragment>
              <img className={classes.checkicon} src={checkIcon} alt="лого" />
              <h3 className={classes.title}>{titleInfoTooltips}</h3>
            </Fragment>
          ) : (
            <Fragment>
              <h2 className="popup__title">{title}</h2>
              <form
                className={`popup__form popup__form_${name}`}
                action="#"
                name={`popupForm__${name}`}
                onSubmit={onSubmit}
                noValidate
              >
                {children}
                <button
                  type="submit"
                  className={`popup__submit-button ${disabled ? 'popup__button_disabled' : ''}`}
                  disabled={disabled}
                >
                  {submitButton}
                </button>
              </form>
            </Fragment>
          )}
        </div>
      </section>
    </div>
  );
};
export default PopupWithForm;
