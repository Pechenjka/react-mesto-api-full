// Данные для вызова на сервер
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  // Запрос на сервер для получения данных пользователя
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('jwt')}` },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка:${res.status}`);
        }
        return res.json();
      })
      .then((data) => data);
  }
  // Запрос на сервер для получения карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('jwt')}` },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка:${res.status}`);
        }
        return res.json();
      })
      .then((data) => data);
  }
  // Запрос на сервер для изменения данных пользователя
  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('jwt')}` },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка:${res.status}`);
        }
        return res.json();
      })
      .then((data) => data);
  }
  // Запрос на сервер для добавления новой карточки
  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('jwt')}` },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка:${res.status}`);
        }
        return res.json();
      })
      .then((data) => data);
  }
  // Запрос на сервер для изменения аватара пользователя
  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('jwt')}` },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка:${res.status}`);
        }
        return res.json();
      })
      .then((data) => data);
  }
  // Запрос на сервер для удаления карточки
  deleteCard(dataId) {
    return fetch(`${this._baseUrl}/cards/${dataId}`, {
      method: 'DELETE',
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('jwt')}` },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка:${res.status}`);
        }
        return res.json();
      })
      .then((cardId) => cardId);
  }
  // Запрос на сервер для установки/снятия лайка карточке
  changeLikeCardStatus(card, isLiked) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('jwt')}` },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка:${res.status}`);
        }
        return res.json();
      })
      .then((card) => card);
  }
}

const api = new Api({
  // baseUrl: 'https://api.lobachev.students.nomoreparties.space',
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
