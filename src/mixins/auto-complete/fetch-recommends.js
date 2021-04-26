/**
 *  fetch remote recommends
 *  取得遠端關鍵字
 */
import axios from 'axios';
import { dropLast, length } from 'ramda';
import autoCompleteService from '@/src/services/search/auto-complete-service';
import { isEmptyValue } from '@/src/helper/data-process';
import { autoCompleteCount } from '@/src/constant/search/auto-complete';
import { ref } from 'vue';

const setCancelToken = (cancelToken) => {
  // remove prev request
  if (cancelToken.value) {
    cancelToken.value.cancel('cancel');
  }
  // set cancelToken
  cancelToken.value = axios.CancelToken.source();
};

export const fetchRecommends = ({ searchKeywords, recommendKeywords, items }) => (keyword) => {
  const cancelToken = ref(null);
  setCancelToken(cancelToken);

  // call auto complete api
  return autoCompleteService
    .get(keyword, cancelToken.value)
    .then((recommends) => {
      // 已切換回 history，避免 debounce 過慢，後蓋前。
      if (isEmptyValue(searchKeywords.value)) return;
      recommendKeywords.value = recommends.keyword;
      items.value = dropLast(length(recommends.list) - autoCompleteCount.recommends, recommends.list);
    })
    .catch((error) => {
      // 預期內的 cancel，不算在 error
      if (error?.message === 'cancel') return;
      console.log(error);
    });
};
