<script setup>
import { ref, onMounted, watch } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';

const props = defineProps({
  animationUrl: {
    type: String,
    required: false,
    default: null,
  },
  height: {
    type: [String, Number],
    default: 200,
  },
  width: {
    type: [String, Number],
    default: 200,
  },
  speed: {
    type: Number,
    default: 1,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  autoPlay: {
    type: Boolean,
    default: true,
  },
  visible: {
    type: Boolean,
    default: true,
  },
});

const shouldRender = ref(props.visible);

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      shouldRender.value = true;
    }
  }
);
</script>

<template>
  <div v-if="shouldRender && animationUrl" class="lottie-container">
    <Vue3Lottie
      :animation-link="animationUrl"
      :height="height"
      :width="width"
      :speed="speed"
      :loop="loop"
      :auto-play="autoPlay"
      class="w-full h-auto"
    />
  </div>
</template>

<style scoped>
.lottie-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

