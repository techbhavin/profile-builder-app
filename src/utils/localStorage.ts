// get all
export const getAll = () => {
  return Object.keys(localStorage);
};

// setter
export const setItem = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

// getter
export const getItem = (key: string) => {
  return localStorage.getItem(key);
};

// remove
export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

// remove all
export const removeAll = () => {
  localStorage.clear();
};
