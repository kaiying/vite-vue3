<template lang="pug">
.list
  .item(v-for="(item, index) in items" :class="classIsHover(index)")
    span {{item.keyword}}
    span.font-weight-bold {{item.otherWords}}
</template>

<script>
import { toRefs, computed, ref, watch } from 'vue';
import { splitAt, map, length, pipe } from 'ramda';
import { hoverDefaultIndex } from '@/src/constant/search/auto-complete';

/**
 * computed
 */
// 推薦詞集合
const items = ({ list, keyword }) =>
  computed(() => {
    return pipe(
      // reset keywords format
      map((x) => splitAt(length(keyword.value))(x)),
      map((x) => ({ keyword: x[0], otherWords: x[1] })),
    )(list.value);
  });
// Hover 處理
const hover = ({ hoverItem }) =>
  computed({
    get: () => hoverItem.value,
    set: (value) => {
      hoverItem.value = parseInt(value, 10);
    },
  });

/**
 * watch
 */
const watchModelValue = ({ setHover }) => (modelValue) => {
  setHover(modelValue);
};

/**
 * methods
 */
// hover 項目的 class : 變色
const classIsHover = ({ hover }) => (index) => {
  return { hover: hover.value === index };
};
// 發射事件：目前正在選擇的項目
const emitCurrentItem = ({ emit, list }) => (index) => {
  emit('overItem', {
    index,
    text: list.value[index] || '', // using source
  });
};
// 離開 auto complete list： reset hover 值
const leave = ({ hover, emitCurrentItem }) => () => {
  hover.value = hoverDefaultIndex;
  emitCurrentItem(hoverDefaultIndex);
};
// 紀錄 hover 的 index：過小視為 reset，過大以最後一個為主。
const setHover = ({ hover, items, emitCurrentItem, leave }) => (index) => {
  // over min
  if (index < 0) {
    leave();
  }
  // over max
  if (index >= length(items.value)) {
    index = 0; // 回到最前面
    emitCurrentItem(0);
  }
  hover.value = index;
};

const props = {
  list: {
    type: Array,
    default: () => [],
  },
  keyword: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Number,
    default: hoverDefaultIndex,
  },
};

const setup = function (props, context) {
  const hoverItem = ref(hoverDefaultIndex);
  const { list, keyword, modelValue } = toRefs(props);

  // computed
  const itemsComputed = items({ list, keyword });
  const hoverComputed = hover({ hoverItem });

  // methods
  const emitCurrentItemMethod = emitCurrentItem({ emit: context.emit, list });
  const leaveMethod = leave({ hover: hoverComputed, emitCurrentItem: emitCurrentItemMethod });
  const setHoverMethod = setHover({ hover: hoverComputed, items: itemsComputed, emitCurrentItem: emitCurrentItemMethod, leave: leaveMethod });

  // watch
  watch(modelValue, watchModelValue({ setHover: setHoverMethod }));
  return {
    // data
    hoverItem,

    // computed
    items: itemsComputed,
    // hover: hoverComputed,

    // methods
    classIsHover: classIsHover({ hover: hoverComputed }),
  };
};
export default {
  name: 'AutoCompleteList',
  props,
  emits: ['overItem'],
  setup,
};
</script>

<style lang="scss" scoped>
div {
  border: darkgray 1px solid;
}
.hover {
  background-color: #95ccee;
}
</style>
