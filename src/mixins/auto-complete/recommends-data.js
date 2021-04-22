import { ref } from 'vue';
import { hoverDefaultIndex } from '@/src/constant/search/auto-complete';

// fake data
const fakeResponse = ['貓貓蟲咖波', '貓貓蟲咖波: 奇幻太空之旅', '貓貓蟲咖波: 小萌物到處玩', '貓貓蟲咖波: 暖暖春天文具組, 陪你慵懶每一天', '貓貓蟲咖波: 縮小世界大冒險', '貓貓蟲咖波: 食物世界超棒'];

// hover
export const hoverIndex = ref(hoverDefaultIndex);
export const hoverItemName = ref('');

// recommends source
export const recommendItems = ref([]);
recommendItems.value = fakeResponse; // fake

// recommend list control
export const isShowRecommends = ref(false);
