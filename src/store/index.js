import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        username: null
    },
    mutations: {
        updateUsername: function(state, payload) {
            state.username = payload;
        },
    },
    actions: {},
    modules: {}
})