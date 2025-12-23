<script setup>
defineProps({
  label: String,
  value: [String, Number],
  sublabel: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div class="border border-gray-dark/30 bg-white p-4">
    <p class="text-sm text-gray-dark">{{ label }}</p>
    <p class="text-3xl font-bold mt-2">{{ value }}</p>
    <p v-if="sublabel" class="text-xs text-gray-dark mt-1">{{ sublabel }}</p>
  </div>
</template>

