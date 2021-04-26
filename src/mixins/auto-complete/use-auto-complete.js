import { computed, ref } from 'vue';
import { length, dropLast, includes, values } from 'ramda';
import { hoverDefaultIndex, arrowKeyEnum, specialKeyEnum } from '@/src/constant/search/auto-complete';
import { isEmptyValue } from '@/src/helper/data-process';
import { getLocalRecordsService, getLocalRecommends, setLocalRecommends } from '@/src/mixins/auto-complete/local-recommends';
import { hoverIndex, hoverItemName, recommendItems, isShowRecommends } from '@/src/mixins/auto-complete/recommends-data';
import { fetchRecommends } from '@/src/mixins/auto-complete/fetch-recommends';
import { debounceGetRecommends } from '@/src/mixins/auto-complete/get-recommends';

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

const keyUp = ({ escapeInput, confirmHover, normalKeyProcess }) => (event) => {
  if (event.key === specialKeyEnum.esc) {
    escapeInput();
  }
  normalKeyProcess(event);
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
const normalKeyProcess = ({ isInvalidHover, hideRecommends, getRecommends }) => (event) => {
  // special keys
  if (event.key === specialKeyEnum.esc) return;

  // isArrowUpDown
  if (includes(event.key, values(arrowKeyEnum))) return;

  // [mac] 注音輸入法輸入中會以底線的方式 ___  先把完成的字咬住，最後搭配 `enter` 才將完整的字帶入 `this.query(input)`，所以這邊 enter 不能完全濾掉。
  if (event.key === specialKeyEnum.enter && !isInvalidHover()) return;

  // clear before
  hideRecommends();

  // get recommends
  getRecommends(event.target.value);
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
const focusInput = ({ getRecommends }) => () => {
  getRecommends();
};

export default function ({ searchKeywords, searchButton, recommendKeywords }) {
  // service
  const localRecordsService = getLocalRecordsService();

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
  const getLocal = getLocalRecommends({ items: itemsComputed, recommendKeywords, localService: localRecordsService });
  const getRemote = fetchRecommends({ searchKeywords, recommendKeywords, items: itemsComputed });
  const getRecommends = debounceGetRecommends({ getLocal, getRemote, showRecommends: showRecommendsMethod });

  const focusInputMethod = focusInput({ showRecommends: showRecommendsMethod, getRecommends });
  const normalKeyProcessMethod = normalKeyProcess({ isInvalidHover: isInvalidHoverMethod, hideRecommends: hideRecommendsMethod, getRecommends });

  // export
  return {
    // data
    hoverIndex,
    hoverItemName,
    isShowRecommends,

    // computed
    items: itemsComputed,

    // methods
    keyDown: keyDown({ hoverIndex }),
    keyUp: keyUp({ escapeInput: escapeInputMethod, confirmHover: confirmHoverMethod, normalKeyProcess: normalKeyProcessMethod }),
    overItem: overItem({ hoverIndex, hoverItemName }),
    focusInput: focusInputMethod,
    setLocal: setLocalRecommends({ searchKeywords, localService: localRecordsService }),
  };
}
