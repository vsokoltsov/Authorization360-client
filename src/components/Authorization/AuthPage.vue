<template>
  <div class="auth panel container">
    <div class="auth navigation tabs is-centered">
      <ul>
        <router-link tag="li" exact-active-class="is-active" active-class="is-active" exact to="sign-in"><a>Sign in</a></router-link>
        <router-link tag="li" exact-active-class="is-active" active-class="is-active" to="sign-up"><a>Sign up</a></router-link>
      </ul>
    </div>
    <router-view class="auth pages"></router-view>
  </div>
</template>

<style>
.auth.panel {
  width: 25em;
}
</style>