import React from 'react';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';

import api from '../utils/api';
import * as auth from '../utils/auth';
// Импорт компонентов
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupConfirmDeleteCard from './PopupConfirmDeleteCard';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
//Импорт HOC
import ProtectedRoute from './ProtectedRoute';

//Основной контейнер приложения
const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmDeleteCardPopupOpen, setIsConfirmDeleteCardPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deleteCard, setDeleteCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const history = useHistory();
  // Эффект монтирования данных пользователя
  // React.useEffect(() => {
  //   api
  //     .getUserInfo()
  //     .then((res) => {
  //       setCurrentUser(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  // Эффект загрузки карточек с сервера
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // Обработчики открытия модальных окон
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleConfirmDeleteCardClick = (card) => {
    setDeleteCard(card);
    setIsConfirmDeleteCardPopupOpen(true);
  };

  const handleCardClick = (selectedCard) => {
    setSelectedCard(selectedCard);
    setIsImagePopupOpen(true);
  };
  // Обработчик закрытия модальных окон
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeleteCardPopupOpen(false);
  };
  // Обработчик лайка карточки
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api
      .changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        const newCards = cards.map((item) => (item._id === card._id ? newCard : item));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Обработчик удаления карточки
  const handleCardDelete = () => {
    setIsLoading(true);
    api
      .deleteCard(deleteCard._id)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== deleteCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // Обработчик обновления данных пользователя
  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // Обработчик обновления аватарки пользователя
  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api
      .setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // Обработчик добавления новой карточки
  const handleAddPlaceSubmit = (data) => {
    setIsLoading(true);
    api
      .addNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Уcтановка эффекта закрытия модального окна по кнопке Esc
  React.useEffect(() => {
    const closePopupOnEsc = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };
    document.addEventListener('keyup', closePopupOnEsc);
    return () => {
      document.removeEventListener('keyup', closePopupOnEsc);
    };
  }, []);

  React.useEffect(() => {
    loggedIn && history.push('/');
    // eslint-disable-next-line
  }, [loggedIn]);

  // Обрабочик регистрации пользователя
  const handleRegister = (values) => {
    const { email, password } = values;
    setIsLoading(true);
    return auth
      .register(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          throw new Error({ message: 'Не передано одно из полей' });
        }
        return res;
      })
      .catch(() => console.log({ message: 'Некорректно заполнено одно из полей' }))
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Обрабочик авторизации пользователя
  const handleLogin = (values) => {
    const { email, password } = values;
    setIsLoading(true);
    return auth
      .authorization(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          throw new Error({ message: 'Не передано одно из полей' });
        }
        if (res.token) {
          tokenCheck();
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          return res;
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // const handleLogin = (values) => {
  //   const { email, password } = values;
  //   setIsLoading(true);
  //   return auth
  //     .authorization(email, password)
  //     .then((res) => {
  //       if (!res || res.statusCode === 400) {
  //         throw new Error({ message: 'Не передано одно из полей' });
  //       }
  //       if (res.token) {
  //         setLoggedIn(true);
  //         localStorage.setItem('jwt', res.token);
  //         return res;
  //       }
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  // Эффект установки действия токена на приложение
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      tokenCheck(jwt);
    }
    // eslint-disable-next-line
  }, []);

  //Проверка токена
  const tokenCheck = (jwt) => {
    auth.getContent(jwt).then((res) => {
      if (res) {
        setLoggedIn(true);
        api.getUserInfo().then((res) => {
          setCurrentUser(res);
        });
        history.push('/');
      }
      if (res.statusCode === 400) {
        throw new Error({
          message: `Токен: ${jwt} не передан или передан не в том формате`,
        });
      }
      if (res.statusCode === 401) {
        throw new Error({ message: `Переданный токен: ${jwt} некорректен` });
      }
    });
  };
  // const tokenCheck = (jwt) => {
  //   auth.getContent(jwt).then((res) => {
  //     if (res) {
  //       setLoggedIn(true);
  //       history.push('/');
  //     }
  //     if (res.statusCode === 400) {
  //       throw new Error({
  //         message: `Токен: ${jwt} не передан или передан не в том формате`,
  //       });
  //     }
  //     if (res.statusCode === 401) {
  //       throw new Error({ message: `Переданный токен: ${jwt} некорректен` });
  //     }
  //   });
  // };

  // Обработчик выхода из профиля на страницу входа
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    history.push('/sign-in');
    setLoggedIn(false);
  };

  // Обработчики открытия и закрытия infoTooltips
  const handleInfoTooltipClose = () => {
    setIsInfoTooltipOpen(false);
    history.push('/sign-in');
  };
  const handleInfoTooltipOpen = () => {
    setIsInfoTooltipOpen(true);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header handleSignOut={handleSignOut} loggedIn={loggedIn} />
        <Switch>
          <Route path="/sign-up">
            <Register
              onRegister={handleRegister}
              handleInfoTooltipClose={handleInfoTooltipClose}
              handleInfoTooltipOpen={handleInfoTooltipOpen}
              isInfoTooltipOpen={isInfoTooltipOpen}
              isLoading={isLoading}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              onLogin={handleLogin}
              handleInfoTooltipClose={handleInfoTooltipClose}
              handleInfoTooltipOpen={handleInfoTooltipOpen}
              isInfoTooltipOpen={isInfoTooltipOpen}
              isLoading={isLoading}
            />
          </Route>
          <ProtectedRoute
            path="/"
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onConfirmDeleteCardClick={handleConfirmDeleteCardClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
            loggedIn={loggedIn}
          />
        </Switch>
        <Footer loggedIn={loggedIn} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <PopupConfirmDeleteCard
          isOpen={isConfirmDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />
        <ImagePopup
          selectedCard={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default withRouter(App);
