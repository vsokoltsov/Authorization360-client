import Vue from 'vue';
import Vuex from 'vuex';

import authorization from './authorization'
import loading from './loading'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        ...loading.state,
        ...authorization.state
    },
    getters: {
        ...loading.getters,
        ...authorization.getters
    },
    mutations: {
        ...loading.mutations,
        ...authorization.mutations
    },
    actions: {
        ...authorization.actions
    },
    strict: true
});