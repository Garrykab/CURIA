<script setup>
import { ref, onMounted } from 'vue';

const isVisible = ref(true);
const isFading = ref(false);

onMounted(() => {
  // Afficher le splash pendant au moins 1.5 secondes
  setTimeout(() => {
    isFading.value = true;
    setTimeout(() => {
      isVisible.value = false;
    }, 500); // Durée de la transition fade-out
  }, 1500);
});
</script>

<template>
  <Transition name="splash-fade">
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-white z-[9999] flex items-center justify-center"
    >
      <div class="text-center space-y-6 animate-fade-in">
        <div class="space-y-4">
          <h1 class="text-5xl md:text-6xl font-bold text-black tracking-tight">
            CURIA
          </h1>
          <div class="w-24 h-1 bg-black mx-auto"></div>
          <p class="text-sm uppercase tracking-wider text-gray-dark font-medium mt-4">
            Plateforme dédiée
          </p>
          <p class="text-base text-gray-dark max-w-md mx-auto">
            Identification des avocats et gestion des barreaux
          </p>
        </div>
        <div class="flex justify-center space-x-2 pt-8">
          <div
            class="w-2 h-2 bg-black rounded-full animate-bounce"
            style="animation-delay: 0s"
          ></div>
          <div
            class="w-2 h-2 bg-black rounded-full animate-bounce"
            style="animation-delay: 0.2s"
          ></div>
          <div
            class="w-2 h-2 bg-black rounded-full animate-bounce"
            style="animation-delay: 0.4s"
          ></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.splash-fade-enter-active,
.splash-fade-leave-active {
  transition: opacity 0.5s ease;
}

.splash-fade-enter-from,
.splash-fade-leave-to {
  opacity: 0;
}
</style>

