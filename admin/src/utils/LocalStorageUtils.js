const LocalStorageUtils = {
  save: ({key, value}) => {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  },
  get: (key) => {
    const stringifiedItem = localStorage.getItem(key);
    const item = JSON.parse(stringifiedItem);
    return item;
  },
  remove: (key) => {
    localStorage.removeItem(key);
  }
};

export default LocalStorageUtils;