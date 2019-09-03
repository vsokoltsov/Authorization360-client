<template>
    <form @submit.prevent="submitForm">
       <div class="field">
            <p class="control has-icons-left">
                <input 
                    class="input" 
                    type="email" 
                    placeholder="Email" 
                    v-model="email" 
                    v-bind:class="{ 'is-danger': emailErrors.length > 0 }" 
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
            <p class="control has-icons-left">
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
        <div class="field">
            <p class="control has-icons-left">
                <input 
                    class="input" 
                    type="password" 
                    placeholder="Password confirmation" 
                    v-model="passwordConfirmation" 
                    v-bind:class="{ 'is-danger': passwordConfirmationErrors.length > 0 }"
                    />
                <span class="icon is-small is-left">
                    <font-awesome-icon icon="lock" />
                </span>
            </p>
            <div class="has-text-danger" :if="passwordConfirmationErrors">
                <ul>
                    <li v-bind:key="index" v-for="(error, index) in passwordConfirmationErrors">{{ error }}</li>
                </ul>
            </div>
        </div>
        <input 
            class="button is-primary" 
            type="submit" 
            value="Sign up"
            :disabled="$v.$invalid"
        />
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
        let errors = []
        const serverErrors = ((this.$store.getters.signUpErrors || {}).email || [])

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
        const serverErrors = ((this.$store.getters.signUpErrors || {}).password || [])

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
    passwordConfirmationErrors() {
        let errors = []
        const serverErrors = ((this.$store.getters.signUpErrors || {}).password || [])

        if (!this.$v.passwordConfirmation.required && this.$v.passwordConfirmation.$model) {
            errors.push('Field is required')
        }

        if (!this.$v.passwordConfirmation.sameAsPassword && this.$v.passwordConfirmation.$model) {
            errors.push('Does not match password')
        }

        if (serverErrors) {
            errors = [
                ...errors,
                ...serverErrors
            ]
        }

        return errors
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