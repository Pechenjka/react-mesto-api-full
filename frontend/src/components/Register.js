import React, { Fragment } from 'react';
import FormAuth from './formAuth/FormAuth';
import useFormWithValidation from './../hooks/useForm';
import InfoTooltip from './InfoTooltip';
import CheckIcon from '../images/check-popup-icon.svg';

const Register = (props) => {
  const {
    onRegister,
    handleInfoTooltipClose,
    handleInfoTooltipOpen,
    isInfoTooltipOpen,
    isLoading,
  } = props;

  const { values, errors, isValid, handleChange } = useFormWithValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(values).then((res) => res && handleInfoTooltipOpen());
  };

  return (
    <Fragment>
      <FormAuth
        title="Регистрация"
        linkNameAuthHeader="Войти"
        submitButton="Зарегистрироваться"
        path="/sign-in"
        classLink="formauth__main-link-on-login_active"
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
          titleInfoTooltips="Вы успешно зарегистрировались!"
          checkIcon={CheckIcon}
        />
      )}
    </Fragment>
  );
};
export default Register;
