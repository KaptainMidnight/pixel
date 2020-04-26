import axios from 'axios'
import { baseURL } from '../config'

export default {
    state: {
        fullName: '',
        isVerified: false,
    },
    actions: {
        async getFullName({ commit }) {
            await axios.get(baseURL + '/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                if (response.data) {
                    commit('setFullName', response.data)
                }
            }).catch(e => {
                console.log(e)
            })
        }
    },
    mutations: {
        setFullName(state, { name, surname }) {
            state.fullName = name + ' ' + surname
        }
    },
    getters: {
        getFullName(state) {
            return state.fullName
        }
    }
}