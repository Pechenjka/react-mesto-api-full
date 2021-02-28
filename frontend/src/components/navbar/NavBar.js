import React from 'react';
import './navBar.css';

const NavBar = (props) => {
  const { onSignOut } = props;

  const [isActiveMenu, setIsActiveMenu] = React.useState(false);

  const handleOpenBurgerMenu = () => {
    setIsActiveMenu(!isActiveMenu);
  };

  return (
    <div
      className={`burger-menu ${isActiveMenu ? 'burger-menu_active' : ''}`}
      onClick={() => {
        isActiveMenu === true && setIsActiveMenu(false);
      }}
    >
      <div className="burger-menu__content">
        <button
          type="button"
          className={`burger-menu__button ${
            !isActiveMenu ? 'burger-menu__button_close' : 'burger-menu__button_active'
          }`}
          onClick={handleOpenBurgerMenu}
        ></button>
        <ul className={`burger-menu__container ${isActiveMenu && 'burger-menu__container_active'}`}>
          <li className="burger-menu__wrapper">
            <p className="burger-menu__email">{localStorage.getItem('email')}</p>
          </li>
          <li className="burger-menu__wrapper">
            <button className="burger-menu__exitButton" onClick={onSignOut}>
              Выйти
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
