export default {
    currentUser: state => {
        return state.current_user
    },
    signInErrors: state => {
        return state.signInErrors
    },
    signUpErrors: state => {
        return state.signUpErrors
    }
}