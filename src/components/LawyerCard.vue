<script setup>
import BadgeStatus from './BadgeStatus.vue';

defineProps({
  lawyer: {
    type: Object,
    required: true,
  },
  barreau: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div class="border border-gray-dark/30 bg-white p-4 flex flex-col gap-2">
    <div class="flex justify-between items-start">
      <div>
        <p class="text-lg font-semibold">{{ lawyer.nom }}</p>
        <p class="text-sm text-gray-dark">{{ barreau }}</p>
      </div>
      <BadgeStatus :statut="lawyer.statut || 'actif'" />
    </div>
    <div class="grid grid-cols-2 gap-2 text-sm text-gray-dark">
      <p><span class="text-black font-medium">Email:</span> {{ lawyer.email }}</p>
      <p><span class="text-black font-medium">Téléphone:</span> {{ lawyer.telephone }}</p>
      <p><span class="text-black font-medium">Toque:</span> {{ lawyer.numeroToque }}</p>
      <p><span class="text-black font-medium">Spécialité:</span> {{ lawyer.specialite }}</p>
    </div>
  </div>
</template>

