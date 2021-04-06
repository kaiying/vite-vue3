<template lang="pug">
h1 Axios
h2 {{url}}
h2 {{res()}}
router-link(to="/about") about
router-link(to="/home") index
</template>

<script setup>
import axios from '@/src/services/axios'

const url = `${import.meta.env.VITE_API_HOST}${import.meta.env.VITE_API_POSTS}`;

const res = async () => await axios({
  method: 'get',
  url: url,
}).then(res => res.data);
const text = import.meta.env.VITE_API_HOST;
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
</style>