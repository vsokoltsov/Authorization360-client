import axios from '../../utils/api'

export default {
    signIn({ commit, dispatch }, data) {
        commit('SET_LOADING')
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
            .finally(() => {
                commit('REMOVE_LOADING')
            })
    },
    signUp({ commit, dispatch }, data) {
        commit('SET_LOADING')
        return axios.post('/sign_up', data)
            .then(response => {
                commit('SET_TOKEN', response.data)
                dispatch('currentUser')
            })
            .catch(error => {
                commit('SET_SIGN_UP_ERRORS', error.response.data)
                return error.response
            })
            .finally(() => {
                commit('REMOVE_LOADING')
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
        return new Promise((resolve) => {
            commit('REMOVE_CURRENT_USER')
            commit('REMOVE_TOKEN')
            resolve()
        })
    }
}