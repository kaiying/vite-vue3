import { ref } from 'vue';
import { length } from 'ramda';
import { hoverDefaultIndex, arrowKeyEnum } from '@/src/constant/search/auto-complete';

/**
 * key events
 */
const keyDown = ({ hoverIndex }) => (event) => {
  if (event.key === arrowKeyEnum.down) hoverIndex.value += 1;
  if (event.key === arrowKeyEnum.up) hoverIndex.value -= 1;
};

/**
 * auto complete display control
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
  // recommend list control
  const isShowRecommends = ref(false);
  return {
    hoverIndex,
    hoverItemName,
    isShowRecommends,
    keyDown: keyDown({ hoverIndex }),
    overItem: overItem({ hoverIndex, hoverItemName }),
  };
}
