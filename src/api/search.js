import axios from 'axios';

// export default (params, cancelToken) =>
//   axios({
//     method: 'get',
//     // 暫時保留：可以查到 `デザインアイディア & テクニック事典 01` 但會影響作者 `+Design`不能查
//     // url: `${API_PATH}?${decodeURIComponent(qs.stringify(params))}`,
//
//     // 一般可以查的串接方式，但無法查到 `デザインアイディア & テクニック事典 01`
//     // url: `${API_PATH}?${toQueryString(params)}`,
//
//     url: `${process.env.NUXT_ENV_API}${process.env.NUXT_ENV_API_SEARCH}`,
//     params,
//     cancelToken: cancelToken.token,
//   });
//
// export const fetchRecommendWords = (params, cancelToken) =>
//   axios({
//     method: 'get',
//     url: `${process.env.NUXT_ENV_API}${process.env.NUXT_ENV_API_SEARCH_KEYWORDS}`,
//     params,
//     cancelToken: cancelToken.token,
//   });
