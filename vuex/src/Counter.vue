<script>
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function getCountNum(type) {
  return new Promise(resolve => {
    setTimeout(() => {
      let amount;
      switch (type) {
        case "one":
          amount = 1;
          break;
        case "two":
          amount = 2;
          break;
        case "ten":
          amount = 10;
          break;
        default:
          amount = 0;
          break;
      }
      resolve({ amount });
    }, 1000);
  });
}

const store = new Vuex.Store({
  state: {
    count: 10
  },

  mutations: {
    increment(state, { amount }) {
      state.count = state.count + amount;
    }
  },
  getters: {
    squared: state => state.count * state.count,
    cubed: (state, getters) => state.count * getters.squared
  },
  actions: {
    incrementAsync({ commit }, payload) {
      return getCountNum(payload.type).then(data => {
        console.log(data);
        commit("increment", { amount: data.amount });
      });
    },
    incrementAction(ctx) {
      ctx.commit("increment");
    }
  }
});
console.log(store.state.count);
store.dispatch("incrementAsync", { type: "one" }).then(() => {
  console.log(store.state.count);
  console.log(store.getters.cubed);
});
// store.commit("increment", { amount: 5 });

export default {};
</script>
