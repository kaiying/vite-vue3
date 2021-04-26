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
