<template>
    <div class="notifications-list hover">
      <transition-group name="fade">
        <div  
          v-for="notification in notifications" 
          v-bind:key="notification.id" 
          class="notification center"
          :class="notification.type ? `is-${notification.type}` : 'is-primary'">
            <button @click="removeNotification(notification)" class="delete"></button>
            {{ notification.text }}
          </div>
      </transition-group>
    </div>
</template>

<script>
export default {
  computed: {
    notifications() {
      return this.$store.getters.notifications
    }
  },
  methods: {
    removeNotification(notification) {
      this.$store.dispatch('hideNotification', notification)
    }
  }
}
</script>

<style lang="scss">
    .fade-enter-active, .fade-leave-active {
      transition: opacity 0.4s ease;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }

    .notifications-list {
        position: absolute;
        top: 1em;
        width: 100%;
        z-index: 9999;

        .notification {
          max-width: 300px;

          &.left {
            margin-left: 2em;
          }

          &.right {
            margin-right: 2em;
          }

          &.center {
            margin: 0 auto;
          }
        }
    }
</style>