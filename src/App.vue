<template lang="pug">
.container
  .d-flex.justify-content-around.bg-light.py-3
    router-link(to="/about") about
    router-link(to="/home") index
    router-link(to="/recommends") recommends
  div.mt-2
    router-view
</template>

<script setup>
import axios from '@/src/services/axios';

const url = `${import.meta.env.VITE_API_HOST}${import.meta.env.VITE_API_POSTS}`;

const res = async () =>
  await axios({
    method: 'get',
    url,
  }).then((res) => res.data);
const text = import.meta.env.VITE_API_HOST;
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style scoped lang="scss">
$color: red;
h1 {
  color: $color;
}
</style>
