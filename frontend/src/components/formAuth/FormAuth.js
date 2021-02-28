import React from 'react';
import './formAuth.css';
import logoHeader from '../../images/logo_header.svg';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';

const FormAuth = (props) => {
  const {
    errors,
    isValid,
    values,
    onChange,
    submitButton,
    title,
    linkNameAuthHeader,
    path,
    classLink,
    onSubmit,
    onClick,
    disabled,
    isLoading,
  } = props;

  return (
    <div className="formauth__container">
      <div className="formauth__page">
        <header className="formauth__header">
          <img className="formauth__header-logo" src={logoHeader} alt="Лого" />
          {
            <Link className="formauth__header-link" to={path}>
              {linkNameAuthHeader}
            </Link>
          }
        </header>
        <main className="formauth__main">
          <div className="formauth__main-container">
            <h2 className="formauth__main-title">{title}</h2>
            <form className="formauth__main-form" onSubmit={onSubmit}>
              <fieldset className="formauth__main-form-fieldset">
                <input
                  className="formauth__main-form-input"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={values.email || ''}
                  onChange={onChange}
                  // pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                />
                <span
                  className={`formauth__main-form-input-error ${
                    !isValid ? 'formauth__main-form-input-error_active' : ''
                  }`}
                  id="email-error"
                >
                  {errors.email}
                </span>
                <input
                  className="formauth__main-form-input"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  minLength="8"
                  required
                  value={values.password || ''}
                  onChange={onChange}
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                />
                <span
                  className={`formauth__main-form-input-error ${
                    !isValid ? 'formauth__main-form-input-error_active' : ''
                  }`}
                  id="password-error"
                >
                  {errors.password}
                </span>
              </fieldset>
              <button
                className={`formauth__main-form-button ${
                  disabled ? 'formauth__main-form-button_disabled' : ''
                }`}
                type="submit"
                onClick={onClick}
                disabled={disabled}
              >
                {isLoading === true ? <Spinner /> : submitButton}
              </button>
            </form>
            <Link className={classLink} to="/sign-in">
              Уже зарегистрированы? Войти
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FormAuth;
