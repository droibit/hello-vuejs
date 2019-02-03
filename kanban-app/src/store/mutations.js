import * as types from "./mutation-types";

export default {
  [types.AUTH_LOGIN](state, payload) {
    state.auth = payload;
  },

  [types.FETCH_TAK_LIST](state, payload) {
    // TODO:
    throw new Error("Not implemented yet.");
  },

  [types.ADD_TASK](state, payload) {
    // TODO:
    throw new Error("Not implemented yet.");
  },

  [types.UPDATE_TASK](state, payload) {
    // TODO:
    throw new Error("Not implemented yet.");
  },

  [types.REMOVE_TASK](state, payload) {
    // TODO:
    throw new Error("Not implemented yet.");
  },

  [types.AUTH_LOGOUT](state, payload) {
    // TODO:
    throw new Error("Not implemented yet.");
  }
};
