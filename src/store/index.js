import Vue from 'vue';
import Vuex from 'vuex';

import axios from '../utils/api'
import { tokenName } from '../utils/api'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        current_user: {},
        signInErrors: {},
        signUpErrors: {
            email: [],
            password: [],
            passwordConfirmation: []
        }
    },
    getters: {
        currentUser: state => {
            return state.current_user
        },
        signInErrors: state => {
            return state.signInErrors
        },
        signUpErrors: state => {
            return state.signUpErrors
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
        },
        SET_SIGN_IN_ERRORS: (state, payload) => {
            state.signInErrors = payload.errors
        },
        SET_SIGN_UP_ERRORS: (state, payload) => {
            state.signUpErrors = payload.errors
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
                    commit('SET_SIGN_IN_ERRORS', error.response.data)
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
                    commit('SET_SIGN_UP_ERRORS', error.response.data)
                    return error.response
                })
        },
        currentUser({ commit, dispatch }) {
            return axios.get('/users/current')
                .then(response => {
                    commit('SET_CURRENT_USER', response.data)
                    return response.data
                })
                .catch(error => {
                    dispatch('signOut')
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