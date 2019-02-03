import store from "../store";

export const authorizeToken = (to, from, next) => {
  if (!to.matched.some(record => record.meta.requiresAuth)) {
    next();
    return;
  }

  if (store.state.auth && store.state.auth.token) {
    next();
  } else {
    next({ path: "/login" });
  }
};
