<template>
    <form @submit.prevent="submitForm">
            <b-field 
                label="Email"
                :type="{ 'is-danger': errors.email }"
                :message="errors.email">
                <b-input type="email" v-model="email"></b-input>
            </b-field>
            <b-field 
                label="Password"
                :type="{ 'is-danger': errors.password }"
                :message="errors.password">
                <b-input type="password" v-model="password"></b-input>
            </b-field>
        <p> 
            <div class="errors" v-if="errors && errors.user">
                <ul>
                    <li v-for="(item, index) in errors.user">
                        {{ item }}
                    </li>
                </ul>
            </div>
            <b-button tag="input" type="is-primary" native-type="submit">Sign in</b-button>
        </p>
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