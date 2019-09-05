const state = {
    notificationId: 0,
    notifications: []
}

const getters = {
    notificationId: state => state.notificationId,
    notifications: state => state.notifications
}

const mutations = {
    ADD_NOTIFICATION: (state, payload) => {
        state.notifications.push(payload)
    },
    REMOVE_NOTIFICATION: (state, id) => {
        state.notifications = state.notifications.filter(notif => notif.id !== id)
    }
}

const actions = {
    showNotification({ commit }, notification) {
        const notificationId = state.notificationId + 1
        const timeOut = setTimeout(() => {
            commit('REMOVE_NOTIFICATION', notificationId)
        }, 3000)
        commit('ADD_NOTIFICATION', { ...notification, id: notificationId, timeOut })
    },
    hideNotification({ commit }, notification) {
        clearTimeout(notification.timeOut)
        commit('REMOVE_NOTIFICATION', notification.id)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}