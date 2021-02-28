import React from 'react';
import logoHeader from '../images/logo_header.svg';
import NavBar from './navbar/NavBar';

const Header = (props) => {
  const { handleSignOut, loggedIn } = props;

  return (
    loggedIn === true && (
      <header className="header">
        <img className="header__logo" src={logoHeader} alt="Лого - шапка сайта" />
        <NavBar onSignOut={handleSignOut} />
      </header>
    )
  );
};

export default Header;
