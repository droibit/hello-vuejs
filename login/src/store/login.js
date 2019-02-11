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
    async login({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === "test@test.com" && password === "test") {
            commit("login", "591bf46b-e41f");
            resolve();
          } else {
            reject(new Error("Invalid user."));
          }
        }, 1000);
      });
    },
    async loggedIn({ state }) {
      return new Promise((resolve, reject) => {
        resolve(!!state.userId);
      }).catch(err => {
        return false;
      });
    }
  }
};
