<template>
    <form @submit.prevent="submitForm">
        <p>
            <label for="name">Email</label>
            <input
                v-model="email"
                type="email"
                name="email"
                >
            <div class="errors" v-if="errors && errors.email">
                <ul>
                    <li v-for="(item, index) in errors.email">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </p>

        <p>
            <label for="password">Password</label>
            <input
                v-model="password"
                type="password"
                name="password"
                >
            <div class="errors" v-if="errors && errors.password">
                <ul>
                    <li v-for="(item, index) in errors.password">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </p>
        <p> 
            <div class="errors" v-if="errors && errors.user">
                <ul>
                    <li v-for="(item, index) in errors.user">
                        {{ item }}
                    </li>
                </ul>
            </div>
            <input
            type="submit"
            value="Sign in"
            >
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