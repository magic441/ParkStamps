import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  state: {
    travel:{},
  },
  mutations: {
    changeTmpTravel:function(state, newTravel){
      state.travel = newTravel
    }
  },
  actions: {
  },
  modules: {
  }
})
