<script setup>
import { computed } from 'vue';

const props = defineProps({
  statut: {
    type: String,
    default: 'en_attente',
  },
});

const styleClass = computed(() => {
  if (props.statut === 'approuve') return 'bg-black text-white';
  if (props.statut === 'rejete') return 'bg-gray-dark text-white';
  return 'bg-gray-light text-black';
});
</script>

<template>
  <span :class="['px-3 py-1 text-xs uppercase tracking-wide', styleClass]">
    {{ statut.replace('_', ' ') }}
  </span>
</template>

