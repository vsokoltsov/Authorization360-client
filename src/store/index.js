import Vue from 'vue';
import Vuex from 'vuex';

import authorization from './authorization'
import loading from './loading'
import notifications from './notifications'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        ...loading.state,
        ...notifications.state,
        ...authorization.state
    },
    getters: {
        ...loading.getters,
        ...notifications.getters,
        ...authorization.getters
    },
    mutations: {
        ...loading.mutations,
        ...notifications.mutations,
        ...authorization.mutations
    },
    actions: {
        ...notifications.actions,
        ...authorization.actions
    },
    strict: true
});