import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuelidate from 'vuelidate'
import Vuex from 'vuex'
import SignIn from '@/components/Authorization/SignIn.vue'

const localVue = createLocalVue()
localVue.use(Vuelidate)
localVue.use(Vuex)

describe('SignIn', () => {
    let store

    beforeEach(() => {
        store = new Vuex.Store({
            state: {

            },
            mutations: {

            },
            actions: {

            },
            getters: {

            }
        })
    })

    it ('test', () => {
        const wrapper = shallowMount(SignIn, {
            store,
            localVue,
        })
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})