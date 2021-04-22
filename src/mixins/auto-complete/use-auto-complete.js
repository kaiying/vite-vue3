import { computed, ref } from 'vue';
import { length, dropLast, includes } from 'ramda';
import { hoverDefaultIndex, arrowKeyEnum, specialKeyEnum } from '@/src/constant/search/auto-complete';
import { isEmptyValue } from '@/src/helper/data-process';
import { getLocalRecordsService, getLocalRecommends, setLocalRecommends } from '@/src/mixins/auto-complete/local-recommends';
import { hoverIndex, hoverItemName, recommendItems, isShowRecommends } from '@/src/mixins/auto-complete/recommends-data';

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
  console.log(event.key);
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
const normalKeyProcess = ({ isInvalidHover, hideRecommends }) => (event) => {
  // special keys
  if (event.key === specialKeyEnum.esc) return;
  // isArrowUpDown
  if (includes(event.key, [arrowKeyEnum.up, arrowKeyEnum.down])) return;

  // [mac] 注音輸入法輸入中會以底線的方式 ___  先把完成的字咬住，最後搭配 `enter` 才將完整的字帶入 `this.query(input)`，所以這邊 enter 不能完全濾掉。
  if (event.key === specialKeyEnum.enter && !isInvalidHover()) return;
  // todo : check axios 能不能把後面拿掉
  // if (event.key === specialKeyEnum.enter) return;

  // console.log(event.key === specialKeyEnum.enter);
  // console.log('isInvalidHover()', isInvalidHover(), ' ! ', !isInvalidHover());
  // clear before
  hideRecommends();

  console.log('normalKeyProcess ==>', 'get!!');

  // get recommends
  // this.debounceGetRecommends(event);
};

// const getRecommends =

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
  const focusInputMethod = focusInput({ showRecommends: showRecommendsMethod });
  const normalKeyProcessMethod = normalKeyProcess({ isInvalidHover: isInvalidHoverMethod, hideRecommends: hideRecommendsMethod });
  const getLocal = getLocalRecommends({ items, recommendKeywords, localService: localRecordsService });
  const setLocal = setLocalRecommends({ searchKeywords, localService: localRecordsService });

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
  };
}
