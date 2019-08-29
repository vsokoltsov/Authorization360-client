import Vue from 'vue';
import Vuex from 'vuex';

import axios from '../utils/api'
import { tokenName } from '../utils/api'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        current_user: {},
    },
    getters: {
        currentUser: state => {
            return state.current_user
        }
    },
    mutations: {
        SET_TOKEN: (state, data) => {
            localStorage.setItem(tokenName, data.token)
        },
        REMOVE_TOKEN: () => {
            localStorage.removeItem(tokenName)
        },
        SET_CURRENT_USER:  (state, payload) => {
            state.current_user = payload.current_user
        },
        REMOVE_CURRENT_USER: state => {
            state.current_user = {}
        }
    },
    actions: {
        signIn({ commit, dispatch }, data) {
            return axios.post('/sign_in', data)
                .then(response => {
                    commit('SET_TOKEN', response.data)
                    dispatch('currentUser')
                    return response
                })
                .catch(error => {
                    return error.response
                })
        },
        signUp({ commit, dispatch }, data) {
            return axios.post('/sign_up', data)
                .then(response => {
                    commit('SET_TOKEN', response.data)
                    dispatch('currentUser')
                })
                .catch(error => {
                    return error.response
                })
        },
        currentUser({ commit }) {
            return axios.get('/users/current')
                .then(response => {
                    commit('SET_CURRENT_USER', response.data)
                    return response.data
                })
                .catch(error => {
                    return error.response
                })
        },
        signOut({ commit }) {
            return new Promise((resolve, reject) => {
                commit('REMOVE_CURRENT_USER')
                commit('REMOVE_TOKEN')
                resolve()
            })
        }
    },
    strict: true
});