<template lang="pug">
.test-display
  span hover Index
  h3 {{ undefined || 'none'}}
  span v-model
  h3 {{ searchKeywords }}
  div
    span hover Index
    h4 {{hoverIndex}}
.row.col-6
  form.d-flex.w-100
    input.form-control.w-75(v-model="searchKeywords" @keydown="keyDown")
    button.btn.btn-secondary -x-) |||
.row.col-6
  auto-complete-list.w-75(:list="recommendList" :keyword="searchKeywords")
</template>

<script>
// package
import { ref } from 'vue';

// components
import AutoCompleteList from '@/src/components/search/auto-complete-list.vue';

// mixins or composition api
import useAutoComplete from '@/src/mixins/auto-complete/use-auto-complete';

// helper

const fakeResponse = ['貓貓蟲咖波', '貓貓蟲咖波: 奇幻太空之旅', '貓貓蟲咖波: 小萌物到處玩', '貓貓蟲咖波: 暖暖春天文具組, 陪你慵懶每一天', '貓貓蟲咖波: 縮小世界大冒險', '貓貓蟲咖波: 食物世界超棒'];

const setup = function () {
  const searchKeywords = ref('');
  const { hoverIndex, keyDown } = useAutoComplete();
  return {
    searchKeywords,
    recommendList: fakeResponse,
    hoverIndex,
    keyDown,
  };
};

export default {
  name: 'Recommends',
  components: { AutoCompleteList },
  setup,
};
</script>

<style scoped></style>
