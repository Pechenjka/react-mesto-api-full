import FormAuth from './formAuth/FormAuth';
import useFormWithValidation from './../hooks/useForm';
import { withRouter, useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import { Fragment } from 'react';
import ErrorCheckIcon from '../images/Errorcheck-popup-icon.svg';

const Login = (props) => {
  const {
    onLogin,
    handleInfoTooltipClose,
    handleInfoTooltipOpen,
    isInfoTooltipOpen,
    isLoading,
  } = props;

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(values)
      .then(() => {
        localStorage.setItem('email', values.email);
        history.push('/');
      })
      .catch((err) => {
        if (err) {
          handleInfoTooltipOpen();
          resetForm();
          console.log({ message: `Пользователь с email: ${values.email} не найден` });
        }
      });
  };

  return (
    <Fragment>
      <FormAuth
        title="Вход"
        linkNameAuthHeader="Регистрация"
        path="/sign-up"
        classLink="formauth__main-link-on-login_hidden"
        submitButton="Войти"
        values={values}
        onChange={handleChange}
        isValid={isValid}
        errors={errors}
        onSubmit={handleSubmit}
        disabled={!isValid}
        isLoading={isLoading}
      />
      {isInfoTooltipOpen === true && (
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={handleInfoTooltipClose}
          titleInfoTooltips="Что-то пошло не так! Попробуйте ещё раз."
          checkIcon={ErrorCheckIcon}
        />
      )}
    </Fragment>
  );
};

export default withRouter(Login);
