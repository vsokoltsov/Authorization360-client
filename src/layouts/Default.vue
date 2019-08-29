<template>
<div class="base-layout">
    <div class="header">
        HEADER
        <button @click="signOut">Sign out</button>
    </div>
    <div class="content">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
export default {
    methods: {
        signOut() {
            this.$store.dispatch('signOut').then(() => {
                this.$router.push('/auth/sign-in')
            })
        }
    }
}
</script>