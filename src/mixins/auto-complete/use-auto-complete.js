import { computed, ref } from 'vue';
import { length, map, pipe, splitAt, dropLast } from 'ramda';
import { hoverDefaultIndex, arrowKeyEnum, specialKeyEnum } from '@/src/constant/search/auto-complete';

// fake data
const fakeResponse = ['貓貓蟲咖波', '貓貓蟲咖波: 奇幻太空之旅', '貓貓蟲咖波: 小萌物到處玩', '貓貓蟲咖波: 暖暖春天文具組, 陪你慵懶每一天', '貓貓蟲咖波: 縮小世界大冒險', '貓貓蟲咖波: 食物世界超棒'];

/**
 * computed
 */
// 推薦詞集合
const items = ({ recommendItems }) =>
  computed({
    get: () => {
      const showLength = 5;
      return dropLast(length(recommendItems.value) - showLength)([...recommendItems.value]);
    },
    set: (value) => {
      recommendItems.value = [...value];
    },
  });

/**
 * key events
 */
const keyDown = ({ hoverIndex }) => (event) => {
  if (event.key === arrowKeyEnum.down) hoverIndex.value += 1;
  if (event.key === arrowKeyEnum.up) hoverIndex.value -= 1;
};

const keyUp = ({ confirmHover }) => (event) => {
  if (event.key === specialKeyEnum.esc) {
    // this.escapeInput();
  }

  // this.normalKeyProcess(event);
  confirmHover(event);
};

/**
 * auto complete `content` control
 */
const confirmHover = ({ searchKeywords, hideRecommends, items, hoverIndex }) => (event) => {
  // 未 hover 或資料異常
  // if (this.isInvalidHover()) return;
  // enter
  if (event.key !== specialKeyEnum.enter) return;
  searchKeywords.value = items.value[hoverIndex.value];
  hideRecommends();
};

/**
 * auto complete `display` control
 */
const hideRecommends = ({ hoverIndex, isShowRecommends }) => () => {
  hoverIndex.value = hoverDefaultIndex;
  isShowRecommends.value = false;
};

const overItem = ({ hoverIndex, hoverItemName }) => (recommend) => {
  hoverIndex.value = recommend.index;
  hoverItemName.value = recommend.text;
};

export default function ({ searchKeywords }) {
  // the hover recommend
  const hoverIndex = ref(hoverDefaultIndex);
  const hoverItemName = ref('');
  // recommends source
  const recommendItems = ref([]);
  recommendItems.value = fakeResponse; // fake
  // recommend list control
  const isShowRecommends = ref(false);

  // computed
  const itemsComputed = items({ recommendItems });

  // methods
  const hideRecommendsMethod = hideRecommends({ hoverIndex, isShowRecommends });
  const confirmHoverMethod = confirmHover({ searchKeywords, hideRecommends: hideRecommendsMethod, items: itemsComputed, hoverIndex });

  return {
    hoverIndex,
    hoverItemName,
    isShowRecommends,
    items: itemsComputed,
    keyDown: keyDown({ hoverIndex }),
    keyUp: keyUp({ confirmHover: confirmHoverMethod }),
    overItem: overItem({ hoverIndex, hoverItemName }),
  };
}
