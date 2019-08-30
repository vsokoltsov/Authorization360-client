<template>
    <form @submit.prevent="submitForm">
            <b-field 
                label="Email"
                :type="{ 'is-danger': errors.email }"
                :message="errors.email">
                <b-input
                    placeholder="Email"
                    type="email" 
                    v-model="email"
                    icon-pack="fas"
                    icon="envelope">
                </b-input>
            </b-field>
            <b-field 
                label="Password"
                :type="{ 'is-danger': errors.password }"
                :message="errors.password">
                <b-input
                    placeholder="Password"
                    type="password" 
                    v-model="password" 
                    icon-pack="fas"
                    icon="lock"
                    password-reveal>
                </b-input>
            </b-field>
            <b-button tag="input" type="is-primary" native-type="submit" value="Sign in" />
    </form>
</template>

<script>
export default {
  data() {
      return {
        email: null,
        password: null
      }
  },
  computed: {
    errors() {
        return this.$store.getters.signInErrors
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
  }
}
</script>
