<template lang="pug">
.list
  .item(v-for="(item, index) in items")
    span {{item.keyword}}
    span.font-weight-bold {{item.otherWords}}
</template>

<script>
import { toRefs, computed } from 'vue';
import { splitAt, map, length, pipe } from 'ramda';

const items = ({ list, keyword }) =>
  computed(() => {
    return pipe(
      // reset keywords format
      map((x) => splitAt(length(keyword.value))(x)),
      map((x) => ({ keyword: x[0], otherWords: x[1] })),
    )(list.value);
  });

const props = {
  list: {
    type: Array,
    default: [],
  },
  keyword: {
    type: String,
    default: '',
  },
};

const setup = function (props) {
  const { list, keyword } = toRefs(props);
  return {
    items: items({ list, keyword }),
  };
};
export default {
  name: 'AutoCompleteList',
  props,
  setup,
};
</script>

<style lang="scss" scoped>
div {
  border: darkgray 1px solid;
}
.hover {
  background-color: aquamarine;
}
</style>
