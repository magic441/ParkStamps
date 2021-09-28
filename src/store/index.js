import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import travel from '@/store/travel'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  state: {
    travel:{},
    user:{},
  },
  mutations: {
    changeTmpTravel:function(state, newTravel){
      state.travel = newTravel
    },
    changeUser:function(state, newUser){
      state.user = newUser
    }
  },
  actions: {
  },
  modules: {
  }
})
