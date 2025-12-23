<script setup>
import { ref, computed } from 'vue';
import { avocats } from '../../mock/avocats.mock';
import { barreaux } from '../../mock/barreaux.mock';
import LawyerCard from '../../components/LawyerCard.vue';

const term = ref('');
const selection = ref(null);

const filtered = computed(() => {
  if (!term.value) return [];
  const query = term.value.toLowerCase();
  return avocats.filter(
    (a) =>
      a.nom.toLowerCase().includes(query) ||
      a.numeroToque.toLowerCase().includes(query),
  );
});

const handleSearch = () => {
  selection.value = filtered.value[0] || null;
};

const barreauLabel = (id) => barreaux.find((b) => b.id === id)?.nom || 'Non renseigné';
</script>

<template>
  <section class="border border-gray-dark/20 bg-white p-6 flex flex-col gap-4">
    <div>
      <h2 class="text-2xl font-semibold">Vérifier un avocat</h2>
      <p class="text-gray-dark text-sm mt-1">Recherche par nom ou numéro de toque.</p>
    </div>
    <div class="flex flex-col md:flex-row gap-3 items-start">
      <input
        v-model="term"
        type="text"
        class="border border-gray-dark/40 px-3 py-2 w-full md:w-2/3"
        placeholder="Ex: Jean Mwamba ou KIN-4587"
      />
      <button class="bg-black text-white px-4 py-2" @click="handleSearch">Vérifier</button>
    </div>
    <div v-if="selection" class="mt-2">
      <LawyerCard :lawyer="selection" :barreau="barreauLabel(selection.barreauId)" />
    </div>
    <p v-else-if="term" class="text-sm text-gray-dark">Aucun résultat pour cette recherche.</p>
  </section>
</template>

