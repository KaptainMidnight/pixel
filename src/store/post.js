import axios from 'axios'
import { baseURL } from '../config'

export default {
    state: {
        posts: []
    },
    actions: {
        async getPostsServer({ commit }) {
            await axios.get(baseURL + '/api/post/all', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                if (response.data) {
                    commit('setPosts', response.data)
                }
            }).catch(e => {
                console.error(e)
            })
        },
        async createPost({ commit, dispatch }, { title, content }) {
            await axios.post(baseURL + '/api/post/create', { title, content }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                if (response.data.message) {
                    dispatch('getPostsServer')
                }
            }).catch(e => {
                console.error(e)
            })
        }
    },
    mutations: {
        setPosts(state, payload) {
            state.posts = payload
        }
    },
    getters: {
        getPosts(state) {
            return state.posts.reverse()
        }
    }
}