<template>
    <form @submit.prevent="submitForm">
        <div class="field">
            <p class="control has-icons-left">
                <input 
                    class="input" 
                    type="email" 
                    placeholder="Email" 
                    v-model="email" 
                    @blur="$v.email.$touch()"
                    :class="{ 'is-danger': emailErrors.length > 0 }" 
                    />
                <span class="icon is-small is-left">
                    <font-awesome-icon icon="envelope" />
                </span>
            </p>
            <div class="has-text-danger" :if="emailErrors">
                <ul>
                    <li v-bind:key="index" v-for="(error, index) in emailErrors">{{ error }}</li>
                </ul>
            </div>
        </div>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input 
                    class="input" 
                    type="password" 
                    placeholder="Password" 
                    v-model="password" 
                    v-bind:class="{ 'is-danger': passwordErrors.length > 0 }"
                    />
                <span class="icon is-small is-left">
                    <font-awesome-icon icon="lock" />
                </span>
            </p>
            <div class="has-text-danger" :if="passwordErrors">
                <ul>
                    <li v-bind:key="index" v-for="(error, index) in passwordErrors">{{ error }}</li>
                </ul>
            </div>
        </div>
        <button 
            class="button is-primary" 
            type="submit" 
            :class="{ 'is-loading': loading }" 
            :disabled="$v.$invalid">Sign in</button>
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
        let errors = []
        const serverErrors = ((this.$store.getters.signInErrors || {}).email || [])

        if (!this.$v.email.required && !!this.$v.email.$model) {
            errors.push('Field is required')
        }
        if (!this.$v.email.email && !!this.$v.email.$model) {
            errors.push('Does not match the email')
        }
        if (serverErrors) {
            errors = [
                ...errors,
                ...serverErrors
            ]
        }
        return errors
    },
    passwordErrors() {
        let errors = []
        const serverErrors = ((this.$store.getters.signInErrors || {}).password || [])

        if (!this.$v.password.required && !!this.$v.password.$model) {
            errors.push('Field is required')
        }

        if (serverErrors) {
            errors = [
                ...errors,
                ...serverErrors
            ]
        }

        return errors
    },
    loading() {
        return this.$store.getters.loading
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
