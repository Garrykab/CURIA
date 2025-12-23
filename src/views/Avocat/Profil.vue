<script setup>
import { computed } from 'vue';
import Sidebar from '../../components/Sidebar.vue';
import { roleLinks } from '../../constants/roleLinks';
import { useAuthStore } from '../../store/auth.store';
import { avocats } from '../../mock/avocats.mock';
import { barreaux } from '../../mock/barreaux.mock';

const auth = useAuthStore();
const links = roleLinks.avocat;

const dossier = computed(() =>
  avocats.find((a) => a.email === auth.user?.email) || {
    nom: auth.user?.name || 'Avocat',
    numeroToque: 'N/A',
    specialite: 'Non renseigné',
    telephone: 'N/A',
    barreauId: auth.barreauId,
  },
);

const barreauLabel = (id) => barreaux.find((b) => b.id === id)?.nom || 'Barreau';
</script>

<template>
  <div class="flex flex-col md:flex-row gap-6 items-start">
    <Sidebar :links="links" title="Espace Avocat" />
    <section class="flex-1 flex flex-col gap-6 w-full">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-semibold">Profil avocat</h2>
          <p class="text-sm text-gray-dark">{{ dossier.nom }}</p>
        </div>
        <!-- <div class="border border-gray-dark/40 px-4 py-2 text-sm bg-white">
          Rôle : Avocat
        </div> -->
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div class="border border-gray-dark/20 bg-white p-4 col-span-2 flex flex-col gap-2">
          <p class="text-sm text-gray-dark">Identité</p>
          <p class="text-lg font-semibold">{{ dossier.nom }}</p>
          <p class="text-sm">Email : {{ auth.user?.email }}</p>
          <p class="text-sm">Numéro de toque : {{ dossier.numeroToque }}</p>
          <p class="text-sm">Spécialité : {{ dossier.specialite }}</p>
          <p class="text-sm">Barreau : {{ barreauLabel(dossier.barreauId) }}</p>
        </div>
        <div class="border border-gray-dark/20 bg-white p-4 flex flex-col gap-3 items-center w-full">
          <p class="font-semibold">Badge numérique</p>
          <div class="w-40 h-40 border border-black bg-gray-light flex items-center justify-center text-xs">
            QR code placeholder
          </div>
          <!-- <p class="text-xs text-gray-dark text-center">
            Placeholder monochrome. Non connecté à une API.
          </p> -->
        </div>
      </div>
    </section>
  </div>
</template>

