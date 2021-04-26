<template lang="pug">
.test-display
  div
    span v-model / searchKeywords
    h4 {{searchKeywords}}
  div
    span recommendKeywords
    h4 {{recommendKeywords}}
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
// components
import AutoCompleteList from '@/src/components/search/auto-complete-list.vue';

// mixins or composition api
import useAutoComplete from '@/src/mixins/auto-complete/use-auto-complete';
import useDefineAutoCompleteData from '@/src/mixins/auto-complete/use-define-auto-complete-data';
import { isEmptyValue } from '@/src/helper/data-process';

// constant
import { hoverDefaultIndex } from '@/src/constant/search/auto-complete';

// helper
// x

// methods
const submitStopping = ({ searchKeywords, hoverIndex, setLocal }) => (event) => {
  if (isEmptyValue(searchKeywords.value)) {
    event.preventDefault();
    return false;
  }
  if (hoverIndex.value === hoverDefaultIndex) setLocal();
  return true;
};

const setup = function (props, context) {
  const { searchKeywords, searchButton, recommendKeywords } = useDefineAutoCompleteData();
  const { isShowRecommends, hoverIndex, hoverItemName, keyDown, keyUp, overItem, items, focusInput, setLocal } = useAutoComplete({ searchKeywords, searchButton, recommendKeywords });

  return {
    // ref
    searchButton,
    // data
    searchKeywords,
    recommendKeywords,

    isShowRecommends,
    hoverIndex,
    hoverItemName,
    items,
    // methods
    keyUp,
    keyDown,
    overItem,
    submitStopping: submitStopping({ searchKeywords, hoverIndex, setLocal }),
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
