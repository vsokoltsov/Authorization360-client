import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuelidate from 'vuelidate'
import Vuex from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SignUp from '@/components/Authorization/SignUp.vue'

const localVue = createLocalVue()
localVue.component('font-awesome-icon', FontAwesomeIcon)
localVue.use(Vuelidate)
localVue.use(Vuex)

jest.mock('axios')

describe('SignUp', () => {
    let store
    let wrapper
    let actions
    let getters

    beforeEach(() => {
        actions = {
            signUp: jest.fn()
        }
        getters = {
            signUpErrors: jest.fn()
        }
        store = new Vuex.Store({
            state: {

            },
            mutations: {

            },
            actions,
            getters
        })
        wrapper = shallowMount(SignUp, {
            store,
            localVue,
            sync: false
        })
    })

    it('expects to component exist', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('calls $getters after component rendering', () => {
        expect(getters.signUpErrors).toHaveBeenCalledTimes(1)
    })

    it('tests failed email input validation', (done) => {
        wrapper.setData({ email: 'admin' })

        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('.is-danger').exists()).toBe(true)
            done()
        })
    })

    it('tests success email input validation', (done) => {
        const email = "admin@gmail.com"
        wrapper.setData({ email: email })

        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('input[type="email"]').classes()).not.toContain('is-danger')
            done()
        })
    })

    it('test failed passwordConfirmation validation', (done) => {
        const email = "admin@gmail.com"
        wrapper.setData({ email: email, password: 'password', passwordConfirmation: 'pass' })

        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('input[name="password-confirmation"]').classes()).toContain('is-danger')
            done()
        })
    })

    it('test success passwordConfirmation validation', (done) => {
        const email = "admin@gmail.com"
        wrapper.setData({ email: email, password: 'password', passwordConfirmation: 'password' })

        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('input[name="password-confirmation"]').classes()).not.toContain('is-danger')
            done()
        })
    })

    it('expects sign in button to be available', (done) => {
        const signInButton = wrapper.find('button[type="submit"]')
        expect(signInButton.attributes('disabled')).toBeDefined()

        wrapper.setData({ email: 'admin@gmail.com', password: 'password', passwordConfirmation: 'password' })

        wrapper.vm.$nextTick(() => {
            expect(signInButton.attributes('disabled')).not.toBeDefined()
            done()
        })
    })

    it('calls the store "signUp" function when form is submitted', () => {
        wrapper.setData({ email: 'admin@gmail.com', password: 'password', passwordConfirmation: 'password' })
        wrapper.find('form').trigger('submit')
        expect(actions.signUp).toHaveBeenCalled()
    })
})