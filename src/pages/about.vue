<template lang="pug">
.container
  div
    h1 about page
  div
    .animation-49157(ref ="animationElement")
</template>

<script>
import lottie from 'lottie-web';
import { ref, onMounted } from 'vue';
import loveLetterJson from '@/src/animations/49157-love-letter.json';

const setup = function () {
  const animationElement = ref(null);
  const animation = ref(null);
  onMounted(() => {
    animation.value = lottie.loadAnimation({
      container: animationElement.value,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: loveLetterJson,
    });
  });
  return {
    animation,
    animationElement,
  };
};

export default {
  name: 'About',
  setup,
};
</script>

<style lang="scss" scoped>
.animation-49157 {
  max-width: 400px;
  max-height: 400px;
}
</style>
