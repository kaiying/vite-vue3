import { ref } from 'vue';
import { hoverDefaultIndex, arrowKeyEnum } from '@/src/constant/search/auto-complete';

/**
 * key events
 */
const keyDown = ({ hoverIndex }) => (event) => {
  if (event.key === arrowKeyEnum.down) hoverIndex.value += 1;
  if (event.key === arrowKeyEnum.up) hoverIndex.value -= 1;
};

export default function () {
  const hoverIndex = ref(hoverDefaultIndex);
  return {
    hoverIndex,
    keyDown: keyDown({ hoverIndex }),
  };
}
