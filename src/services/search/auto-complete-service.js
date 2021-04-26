import { fetchRecommendWords } from '@/src/api/search';

const get = (keyword, cancelToken) => {
  return fetchRecommendWords({ q: keyword }, cancelToken).then((res) => ({
    keyword,
    list: res?.data?.keyword || [],
  }));
};

export default {
  get,
};
