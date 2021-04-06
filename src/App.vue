<template>
  <hr/>
  <h1>{{text}}</h1>
  <hr/>
  <router-view />
  <router-link to="/about">
    about
  </router-link>
  <router-link to="/home">
    index
  </router-link>
</template>

<script setup>
const text = import.meta.env.VITE_API_HOST;
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
</style>