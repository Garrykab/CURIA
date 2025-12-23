<script setup>
import { ref } from 'vue';
import Sidebar from '../../components/Sidebar.vue';
import { roleLinks } from '../../constants/roleLinks';
import { barreaux as barreauxMock } from '../../mock/barreaux.mock';

const barreaux = ref([...barreauxMock]);
const form = ref({
  nom: '',
  ville: '',
  president: '',
  contact: '',
});
const links = roleLinks.super_admin;

const addBarreau = () => {
  if (!form.value.nom || !form.value.ville) return;
  barreaux.value.push({
    id: Date.now(),
    nom: form.value.nom,
    ville: form.value.ville,
    president: form.value.president || 'Non renseigné',
    contact: form.value.contact || 'contact@test.com',
    avocats: 0,
    demandesEnCours: 0,
  });
  form.value = { nom: '', ville: '', president: '', contact: '' };
};
</script>

<template>
  <div class="flex flex-col md:flex-row gap-6 items-start">
    <Sidebar :links="links" title="Espace Super Admin" />
    <section class="flex-1 flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-semibold">Gestion des barreaux</h2>
          <p class="text-sm text-gray-dark">Tableau + ajout local.</p>
        </div>
      </div>

      <div class="border border-gray-dark/20 bg-white">
        <div class="grid grid-cols-5 px-4 py-3 text-xs uppercase tracking-wide border-b border-gray-dark/20">
          <span>Nom</span>
          <span>Ville</span>
          <span>Président</span>
          <span>Contact</span>
          <span>Avocats</span>
        </div>
        <div class="divide-y divide-gray-dark/10">
          <div
            v-for="b in barreaux"
            :key="b.id"
            class="grid grid-cols-5 px-4 py-3 text-sm"
          >
            <span class="font-medium">{{ b.nom }}</span>
            <span>{{ b.ville }}</span>
            <span>{{ b.president }}</span>
            <span class="text-gray-dark">{{ b.contact }}</span>
            <span>{{ b.avocats }}</span>
          </div>
        </div>
      </div>

      <div class="border border-gray-dark/20 bg-white p-4 flex flex-col gap-3">
        <p class="font-semibold">Ajouter un barreau (mock)</p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input v-model="form.nom" class="border border-gray-dark/40 px-3 py-2" placeholder="Nom" />
          <input v-model="form.ville" class="border border-gray-dark/40 px-3 py-2" placeholder="Ville" />
          <input v-model="form.president" class="border border-gray-dark/40 px-3 py-2" placeholder="Président" />
          <input v-model="form.contact" class="border border-gray-dark/40 px-3 py-2" placeholder="Contact" />
        </div>
        <button class="bg-black text-white px-4 py-2 w-fit" @click="addBarreau">Enregistrer</button>
      </div>
    </section>
  </div>
</template>

