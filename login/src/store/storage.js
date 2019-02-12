const KEY_REMEMBER_ME = "AuthStorage.remember_me";
export const KEY_USER_ID = "AuthStorage.user_id";

function parseBoolean(value) {
  return JSON.parse(value);
}

class AuthStorage {
  constructor() {
    this._currentStorage = null;
    this._toggleStorage(parseBoolean(localStorage.getItem(KEY_REMEMBER_ME)));
  }

  get length() {
    return this._currentStorage.length;
  }

  considerStorage(rememberMe) {
    sessionStorage.setItem(KEY_REMEMBER_ME, rememberMe);
    this._toggleStorage(rememberMe);
  }

  determineStorage() {
    const useLocalStorage = parseBoolean(
      sessionStorage.getItem(KEY_REMEMBER_ME)
    );
    if (useLocalStorage) {
      this._currentStorage.setItem(KEY_REMEMBER_ME, true);
      sessionStorage.removeItem(KEY_REMEMBER_ME);
    }
  }

  _toggleStorage(useLocalStorage) {
    if (useLocalStorage) {
      console.log("use local storage.");
      this._currentStorage = localStorage;
    } else {
      console.log("use session storage.");
      this._currentStorage = sessionStorage;
    }
  }

  // set item with the key
  setItem(key, value) {
    this._currentStorage.setItem(key, value);
  }

  // get item with the key
  getItem(key) {
    return this._currentStorage.getItem(key);
  }

  // remove item with the key
  removeItem(key) {
    this._currentStorage.removeItem(key);
  }

  // clear out the storage
  clear() {
    this._currentStorage.clear();
  }
}

export const authStorage = new AuthStorage();
