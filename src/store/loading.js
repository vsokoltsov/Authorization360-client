const state = {
    loading: false
}

const mutations = {
    SET_LOADING: (state) => {
        state.loading = true
    },
    REMOVE_LOADING: (state) => {
        state.loading = false
    }
}

const getters = {
    loading: state => state.loading
}

export default {
    state,
    mutations,
    getters
}