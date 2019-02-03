import * as types from "./mutation-types";
import { Auth, List, Task } from "../api";

export default {
  login: ({ commit }, authInfo) => {
    return Auth.login(authInfo)
      .then(({ token, userId }) => {
        commit(types.AUTH_LOGIN, { token, userId });
      })
      .catch(err => {
        throw err;
      });
  },

  fetchLists: ({ commit }) => {
    // TODO:
    throw new Error("Not implemented yet.");
  },

  addTask: ({ commit }) => {
    // TODO:
    throw new Error("Not implemented yet.");
  },

  updataTask: ({ commit }) => {
    // TODO:
    throw new Error("Not implemented yet.");
  },

  remoteTask: ({ commit }) => {
    // TODO:
    throw new Error("Not implemented yet.");
  },

  logout: ({ commit }) => {
    // TODO:
    throw new Error("Not implemented yet.");
  }
};
