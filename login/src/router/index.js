import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import store from "../store/";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: "/about",
      name: "about",
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});
router.beforeResolve(async (to, from, next) => {
  console.log(`beforeResolve(to=${to.path}, from=${from.path})`);

  const loggedIn = await store.dispatch("login/loggedIn");
  console.log(`logged in: ${loggedIn}`);

  if (!to.matched.some(record => record.meta.requiresAuth)) {
    if (to.path === "/login" && loggedIn) {
      return next(from.path);
    }
    return next();
  }

  if (loggedIn) {
    return next();
  } else {
    return next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  }
});
export default router;
