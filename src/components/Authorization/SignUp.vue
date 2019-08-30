<template>
    <form @submit.prevent="submitForm">
       <b-field 
                label="Email"
                :type="{ 'is-danger': $v.email.$invalid && $v.email.$model }"
                :message="emailErrors">
                <b-input 
                    type="email" 
                    v-model="email"
                    icon-pack="fas"
                    icon="envelope"
                    >
                </b-input>
            </b-field>
            <b-field 
                label="Password"
                :type="{ 'is-danger': $v.password.$invalid && $v.password.$model }"
                :message="passwordErrors">
                <b-input 
                    type="password" 
                    v-model="password"
                    icon-pack="fas"
                    icon="lock"
                    password-reveal>
                </b-input>
            </b-field>
            <b-field 
                label="Password confirmation"
                :type="{ 'is-danger': $v.passwordConfirmation.$invalid && $v.passwordConfirmation.$model }"
                :message="passwordConfirmationErrors">
                <b-input 
                    type="password" 
                    v-model="passwordConfirmation"
                    icon-pack="fas"
                    icon="lock"
                    password-reveal>
                </b-input>
            </b-field>
            <b-button tag="input" type="is-primary" native-type="submit" value="Sign up" :disabled="$v.$invalid" />
    </form>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators'

export default {
  data() {
      return {
        email: null,
        password: null,
        passwordConfirmation: null
      }
  },
  computed: {
    emailErrors() {
        return [ 
            { 'Field is required': !this.$v.email.required && this.$v.email.$model },
            { 'Does not match the email': !this.$v.email.email && this.$v.email.$model },
            ...((this.$store.getters.signUpErrors || {}).email || [])
        ]
    },
    passwordErrors() {
        return [ 
            { 'Field is required': !this.$v.password.required && this.$v.password.$model },
            ...((this.$store.getters.signUpErrors || {}).password || [])
        ]
    },
    passwordConfirmationErrors() {
        return [ 
            { 'Field is required': !this.$v.passwordConfirmation.required && this.$v.passwordConfirmation.$model },
            { 'Does not match password': !this.$v.passwordConfirmation.sameAsPassword && this.$v.passwordConfirmation.$model },
            ...((this.$store.getters.signUpErrors || {}).passwordConfirmation || [])
        ]
    }
  },
  methods: {
      submitForm() {
          const data = {
              email: this.email,
              password: this.password,
              password_confirmation: this.passwordConfirmation
          }
          this.$store.dispatch('signUp', data)
          .then(response => {
              if (response.status == 200) {
                  this.$router.push({ path: '/users/profile' })
              }
          })
      }
  },
  destroyed() {
      this.$store.commit('SET_SIGN_UP_ERRORS', { errors: {} })
  },
  validations: {
      email: {
          required,
          email
      },
      password: {
          required
      },
      passwordConfirmation: {
          required,
          sameAsPassword: sameAs('password')
      }
  }
}
</script>