import { computed, ref, onMounted } from 'vue';
import { length, map, pipe, splitAt, dropLast } from 'ramda';
import { hoverDefaultIndex, arrowKeyEnum, specialKeyEnum } from '@/src/constant/search/auto-complete';
import { isEmptyValue } from '@/src/helper/data-process';

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

const keyUp = ({ escapeInput, confirmHover }) => (event) => {
  if (event.key === specialKeyEnum.esc) {
    escapeInput();
  }

  // this.normalKeyProcess(event);
  confirmHover(event);
};

/**
 * auto complete `content` control
 */
const isInvalidHover = ({ hoverIndex, items }) => () => {
  return isEmptyValue(hoverIndex.value) || hoverIndex.value < 0 || hoverIndex.value >= length(items.value);
};
const confirmHover = ({ searchKeywords, hideRecommends, items, hoverIndex, isInvalidHover }) => (event) => {
  // 未 hover 或資料異常
  if (isInvalidHover()) return;
  // enter
  if (event.key !== specialKeyEnum.enter) return;
  searchKeywords.value = items.value[hoverIndex.value];
  hideRecommends();
};
const overItem = ({ hoverIndex, hoverItemName }) => (recommend) => {
  hoverIndex.value = recommend.index;
  hoverItemName.value = recommend.text;
};

/**
 * auto complete `display` control
 */
const hideRecommends = ({ hoverIndex, isShowRecommends }) => () => {
  hoverIndex.value = hoverDefaultIndex;
  isShowRecommends.value = false;
};
const showRecommends = ({ isShowRecommends, hideRecommends }) => () => {
  hideRecommends();
  isShowRecommends.value = true;
};
const escapeInput = ({ searchKeywords, searchButton, hideRecommends }) => () => {
  searchKeywords.value = '';
  if (searchButton) searchButton.value.focus();
  hideRecommends();
};
const focusInput = ({ showRecommends }) => () => {
  showRecommends();
};

export default function ({ searchKeywords, searchButton }) {
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
  const showRecommendsMethod = showRecommends({ isShowRecommends, hideRecommends: hideRecommendsMethod });
  const escapeInputMethod = escapeInput({ searchKeywords, searchButton, hideRecommends: hideRecommendsMethod });
  const isInvalidHoverMethod = isInvalidHover({ hoverIndex, items: itemsComputed });
  const confirmHoverMethod = confirmHover({
    searchKeywords,
    hideRecommends: hideRecommendsMethod,
    items: itemsComputed,
    hoverIndex,
    isInvalidHover: isInvalidHoverMethod,
  });
  const focusInputMethod = focusInput({ showRecommends: showRecommendsMethod });
  return {
    hoverIndex,
    hoverItemName,
    isShowRecommends,
    items: itemsComputed,
    keyDown: keyDown({ hoverIndex }),
    keyUp: keyUp({ escapeInput: escapeInputMethod, confirmHover: confirmHoverMethod }),
    overItem: overItem({ hoverIndex, hoverItemName }),
    focusInput: focusInputMethod,
  };
}
