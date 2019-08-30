<template>
<div class="base-layout">
    <b-navbar>
        HEADER
        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <b-button type="is-danger" @click="signOut">Sign out</b-button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
    <div class="columns">
        <div class="card navigation column is-narrow">
            Navigation
        </div>
        <div class="column content card">
            <router-view></router-view>
        </div>
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

<style lang="scss"> 
    .navigation {
        margin: 20px 0 20px 20px;
    }

    .content {
        margin: 20px 20px 0 20px;
    }
</style>