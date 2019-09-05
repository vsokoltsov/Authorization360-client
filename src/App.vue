<template>
  <div class='root'>
    <Notifications></Notifications>
    <div id="app">
      <component :is="layout">
        <router-view></router-view>
      </component>
    </div>
  </div>
</template>

<script>
import { tokenName } from './utils/api'
import Notifications from '@/components/Notifications/Notifications'

const defaultLayout = 'default'

export default {
  name: 'app',
  components: {
    Notifications
  },
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
  color: #2c3e50;
}
</style>
