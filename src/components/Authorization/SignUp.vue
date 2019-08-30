<template>
    <form @submit.prevent="submitForm">
       <b-field 
                label="Email"
                :type="{ 'is-danger': errors.email }"
                :message="errors.email">
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
                :type="{ 'is-danger': errors.password }"
                :message="errors.password">
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
                :type="{ 'is-danger': errors.password_confirmation }"
                :message="errors.password">
                <b-input 
                    type="password" 
                    v-model="passwordConfirmation"
                    icon-pack="fas"
                    icon="lock"
                    password-reveal>
                </b-input>
            </b-field>
            <b-button tag="input" type="is-primary" native-type="submit" value="Sign up" />
    </form>
</template>

<script>
export default {
  data() {
      return {
        email: null,
        password: null,
        passwordConfirmation: null
      }
  },
  computed: {
    errors() {
        return this.$store.getters.signUpErrors
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
  }
}
</script>