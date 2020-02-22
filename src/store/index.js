import Vuex from "vuex";
import Vue from "vue";
import user from "./modules/user";
import song from "./modules/song";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    song
  }
});
