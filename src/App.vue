<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import { tokenName } from './utils/api'

const defaultLayout = 'default'

export default {
  name: 'app',
  created() {
    const token = localStorage.getItem(tokenName)
    if (token) {
      this.$store.dispatch('currentUser')
    }
  },
  computed: {
    layout() {
      return `${(this.$route.meta.layout || defaultLayout)}-layout`
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
