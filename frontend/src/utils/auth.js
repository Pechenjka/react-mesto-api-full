export const BASE_URL = 'https://api.lobachev.students.nomoredomains.rocks';

const checkresponse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

// Запрос на сервер для регистрации пользователя
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkresponse)
    .then((res) => res);
};

// Запрос на сервер для авторизации пользователя
export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkresponse)
    .then((res) => res);
};

// Запрос на сервер для проверки токена пользователя
export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkresponse)
    .then((res) => res);
};
