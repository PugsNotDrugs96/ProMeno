const KEY = "token";

export const getToken = () => {
  const token = localStorage.getItem(KEY);
  return token;
};

export const setToken = (token) => {
  localStorage.setItem(KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(KEY);
};
