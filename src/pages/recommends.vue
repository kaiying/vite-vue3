<template lang="pug">
.test-display
  span hover Index
  h3 {{ undefined || 'none'}}
  span v-model
  h3 {{ searchKeywords }}
.row.col-6
  form.d-flex.w-100
    input.form-control.w-75(v-model="searchKeywords")
    button.btn.btn-secondary -x-) |||
auto-complete-list
</template>

<script>
import { ref } from 'vue';
import AutoCompleteList from '@/src/components/search/auto-complete-list.vue';

const setup = function () {
  const searchKeywords = ref('');
  return { searchKeywords };
};

export default {
  name: 'Recommends',
  components: { AutoCompleteList },
  setup,
};
</script>

<style scoped></style>
