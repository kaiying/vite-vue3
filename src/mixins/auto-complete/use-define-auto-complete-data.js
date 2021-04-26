/**
 *  mixin : recommends.vue
 *   - 宣告參數的部分 ( vue data() )
 */

import { ref } from 'vue';

export default function () {
  const searchButton = ref(null);
  const searchKeywords = ref('');
  const recommendKeywords = ref('');
  return {
    searchButton,
    searchKeywords,
    recommendKeywords,
  };
}
