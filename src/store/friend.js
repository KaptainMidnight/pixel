import axios from 'axios'
import { baseURL } from '../config'

export default {
    state: {
        friends: []
    },
    actions: {
        async getAllFriends({ commit }) {
            await axios.get(baseURL + '/api/users/list', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                if (response.data) {
                    commit('setFriends', response.data)
                }
            }).catch(e => {
                console.error(e)
            })
        }
    },
    mutations: {
        setFriends(state, payload) {
            state.friends = payload
        }
    },
    getters: {
        getFriends(state) {
            return state.friends
        }
    },
}