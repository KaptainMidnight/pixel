import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        name: '',
        surname: '',
        posts: []
    },
    actions: {
        async getUserData({ dispatch }, email, password) {
            await axios.post()
        }
    },
    mutations: {

    }
})