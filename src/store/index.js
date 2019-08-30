import Vue from 'vue';
import Vuex from 'vuex';

import authorization from './authorization'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        ...authorization.state
    },
    getters: {
        ...authorization.getters
    },
    mutations: {
        ...authorization.mutations
    },
    actions: {
        ...authorization.actions
    },
    strict: true
});