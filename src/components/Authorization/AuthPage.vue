<template>
  <div class="auth panel">
    <div class="auth navigation">
      <router-link to="sign-in">Sign in</router-link>
      <router-link to="sign-up">Sign up</router-link>
    </div>
    <router-view class="auth pages"></router-view>
  </div>
</template>