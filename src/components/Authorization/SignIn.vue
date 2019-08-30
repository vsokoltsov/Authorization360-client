<template>
    <form @submit.prevent="submitForm">
            <div>
                <b-field 
                    label="Email"
                    :type="{ 'is-danger': $v.email.$invalid && $v.email.$model }"
                    :message="emailErrors">
                    <b-input
                        placeholder="Email"
                        type="email" 
                        v-model="email"
                        icon-pack="fas"
                        icon="envelope">
                    </b-input>
                </b-field>
            </div>
            <div>
                <b-field 
                    label="Password"
                    :type="{ 'is-danger': $v.password.$invalid && $v.password.$model }"
                    :message="passwordErrors">
                    <b-input
                        placeholder="Password"
                        type="password" 
                        v-model="password" 
                        icon-pack="fas"
                        icon="lock"
                        password-reveal>
                    </b-input>
                </b-field>
            </div>
            <b-button tag="input" type="is-primary" native-type="submit" value="Sign in" :disabled="$v.$invalid" />
    </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
      return {
        email: null,
        password: null
      }
  },
  computed: {
    emailErrors() {
        return [ 
            { 'Field is required': !this.$v.email.required && this.$v.email.$model },
            { 'Does not match the email': !this.$v.email.email && this.$v.email.$model },
            ...((this.$store.getters.signInErrors || {}).email || [])
        ]
    },
    passwordErrors() {
        return [ 
            { 'Field is required': !this.$v.password.required && this.$v.password.$model },
            ...((this.$store.getters.signInErrors || {}).password || [])
        ]
    }
  },
  methods: {
      submitForm() {
          const data = {
              email: this.email,
              password: this.password
          }
          this.$store.dispatch('signIn', data)
          .then(response => {
              if (response.status == 200) {
                  this.$router.push({ path: '/users/profile' })
              }
          })
      }
  },
  destroyed() {
      this.$store.commit('SET_SIGN_IN_ERRORS', { errors: {} })
  },
  validations: {
      email: {
          required,
          email
      },
      password: {
          required
      }
  }
}
</script>
