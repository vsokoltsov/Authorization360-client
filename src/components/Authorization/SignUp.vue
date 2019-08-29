<template>
    <form @submit.prevent="submitForm">
        <p>
            <label for="name">Email</label>
            <input
                v-model="email"
                type="email"
                name="email"
                >
        </p>

        <p>
            <label for="password">Password</label>
            <input
                v-model="password"
                type="password"
                name="password"
                >
        </p>
        <p>
            <label for="password">Password confirmation</label>
            <input
                v-model="passwordConfirmation"
                type="password"
                name="passwordConfirmation"
                >
        </p>
        <p>
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
        errors: [],
        email: null,
        password: null,
        passwordConfirmation: null
      }
  },
  methods: {
      submitForm() {
          const data = {
              email: this.email,
              password: this.password,
              password_confirmation: this.passwordConfirmation
          }
          this.$store.dispatch('signUp', data).then(response => {
              this.$router.push({ path: '/users/profile' })
          })
      }
  }
}
</script>