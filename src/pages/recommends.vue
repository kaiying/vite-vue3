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
  form.d-flex.w-100(@submit="submitStopping")
    input.form-control.w-75(v-model="searchKeywords"
      @keydown="keyDown" @keyup="keyUp" @focus="focusInput")
    button.btn.btn-secondary(ref="searchButton") -x-) |||
.row.col-6
  auto-complete-list.w-75(v-if="isShowRecommends" :list="items" :keyword="searchKeywords" :modelValue="hoverIndex"
    @overItem="overItem")
</template>

<script>
// package
import { ref } from 'vue';

// components
import AutoCompleteList from '@/src/components/search/auto-complete-list.vue';

// mixins or composition api
import useAutoComplete from '@/src/mixins/auto-complete/use-auto-complete';
import { isEmptyValue } from '@/src/helper/data-process';

// helper
// x

// methods
const focusOther = () => () => {
  // this.$refs.searchButton.focus();
};
const submitStopping = ({ searchKeywords }) => (event) => {
  if (isEmptyValue(searchKeywords.value)) {
    event.preventDefault();
    return false;
  }
  event.preventDefault();
  return false;
  // return true;
};

const setup = function (props, context) {
  const searchButton = ref(null);
  const searchKeywords = ref('');
  const { isShowRecommends, hoverIndex, hoverItemName, keyDown, keyUp, overItem, items, focusInput } = useAutoComplete({ searchKeywords, searchButton });

  return {
    // ref
    searchButton,
    // data
    isShowRecommends,
    searchKeywords,
    hoverIndex,
    hoverItemName,
    items,
    // methods
    keyUp,
    keyDown,
    overItem,
    submitStopping: submitStopping({ searchKeywords, searchButton }),
    focusInput,
  };
};

export default {
  name: 'Recommends',
  components: { AutoCompleteList },
  setup,
};
</script>

<style scoped></style>
