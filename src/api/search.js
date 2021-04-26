import axios from 'axios';

export const fetchRecommendWords = (params, cancelToken) =>
  axios({
    method: 'get',
    url: `${import.meta.env.VITE_API_ATHENA}${import.meta.env.VITE_API_AUTO_COMPLETE}`,
    params,
    cancelToken: cancelToken.token,
  });
