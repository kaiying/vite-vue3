import { debounce } from 'lodash/function';
import { trim } from 'ramda';
import { isEmptyValue } from '@/src/helper/data-process';

const getRecommends = ({ getLocal, getRemote, showRecommends }) => async (input) => {
  const words = trim(input || '');
  // 關鍵字空的跑 history
  if (isEmptyValue(words)) {
    getLocal();
    // 關鍵字有內容 -> 問 api
  } else {
    await getRemote(words);
  }
  showRecommends();
};

export const debounceGetRecommends = ({ getLocal, getRemote, showRecommends }) =>
  debounce(async (input) => {
    await getRecommends({ getLocal, getRemote, showRecommends })(input);
  }, 100);
