<template>
    <div>
    <h1>User profile page</h1>
        <div class="user-data">
            <div class="email">Email: {{ currentUser.email }}</div>
        </div>
    </div>
    
</template>

<script>
export default {
    data() {
      return {
      }
    },
    computed: {
        currentUser() {
            console.log('CURRENT USER IS', this.$store.getters.currentUser)
            return this.$store.getters.currentUser
        }
    }
}
</script>