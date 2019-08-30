import { tokenName } from '../../utils/api'

export default {
    SET_TOKEN: (state, data) => {
        localStorage.setItem(tokenName, data.token)
    },
    REMOVE_TOKEN: () => {
        localStorage.removeItem(tokenName)
    },
    SET_CURRENT_USER: (state, payload) => {
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
}