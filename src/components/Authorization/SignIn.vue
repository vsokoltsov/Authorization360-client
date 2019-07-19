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
        password: null
      }
  },
  methods: {
      submitForm() {
          console.log(this.email, this.password)
      }
  }
}
</script>