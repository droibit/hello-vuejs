import { authStorage, KEY_USER_ID } from "./storage";
import { longStackSupport } from "q";

export default {
  namespaced: true,
  state: {
    userId: null
  },
  mutations: {
    login(state, userId) {
      state.userId = userId;
    }
  },
  actions: {
    async login({ commit }, { email, password, rememberMe }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          authStorage.considerStorage(rememberMe);
          if (email === "test@test.com" && password === "test") {
            authStorage.determineStorage();
            const userId = "591bf46b-e41f";
            authStorage.setItem(KEY_USER_ID, userId);
            commit("login", userId);
            resolve();
          } else {
            reject(new Error("Invalid user."));
          }
        }, 1000);
      });
    },
    async loggedIn({ commit, state }) {
      return new Promise((resolve, reject) => {
        let userId;
        if (state.userId) {
          userId = state.userId;
        } else {
          userId = authStorage.getItem(KEY_USER_ID);
          commit("login", userId);
        }
        resolve(!!userId);
      }).catch(err => {
        return false;
      });
    },
    async longStackSupport({ commit }) {
      return new Promise((resolve, reject) => {
        authStorage.removeItem(KEY_USER_ID);
        commit("login", null);
      });
    }
  }
};
