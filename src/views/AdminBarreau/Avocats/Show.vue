<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Sidebar from '../../../components/Sidebar.vue';
import BadgeStatus from '../../../components/BadgeStatus.vue';
import { roleLinks } from '../../../constants/roleLinks';
import { avocats as avocatsMock } from '../../../mock/avocats.mock';
import { demandes } from '../../../mock/demandes.mock';
import { barreaux } from '../../../mock/barreaux.mock';
import { useAuthStore } from '../../../store/auth.store';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const barreauId = auth.barreauId || 1;
const links = roleLinks.admin_barreau;

const badges = computed(() => ({
  '/barreau/demandes': demandes.filter((d) => d.barreauId === barreauId && d.statut === 'en_attente').length,
}));

const avocatId = parseInt(route.params.id);
const avocat = computed(() => avocatsMock.find((a) => a.id === avocatId));

const barreauLabel = (id) => barreaux.find((b) => b.id === id)?.nom || 'Barreau';

const goToEdit = () => {
  router.push(`/barreau/avocats/${avocatId}/edit`);
};

const goBack = () => {
  router.push('/barreau/avocats');
};

if (!avocat.value) {
  router.push('/barreau/avocats');
}
</script>

<template>
  <div v-if="avocat" class="flex flex-col md:flex-row gap-6 items-start">
    <Sidebar :links="links" title="Espace Barreau" :badges="badges" />
    <section class="flex-1 flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-semibold">Détails de l'avocat</h2>
          <p class="text-sm text-gray-dark">{{ avocat.nom }}</p>
        </div>
        <div class="flex gap-2">
          <button
            class="border border-gray-dark/40 px-4 py-2 text-sm rounded-md hover:bg-gray-light"
            @click="goBack"
          >
            Retour
          </button>
          <button class="bg-black text-white px-4 py-2 text-sm rounded-md" @click="goToEdit">
            Modifier
          </button>
        </div>
      </div>

      <div class="border border-gray-dark/20 bg-white p-6 rounded-md">
        <div class="flex items-start justify-between mb-6 pb-6 border-b border-gray-dark/10">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center font-bold text-xl">
              {{ avocat.nom.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="text-xl font-semibold">{{ avocat.nom }}</p>
              <p class="text-sm text-gray-dark">{{ avocat.email }}</p>
            </div>
          </div>
          <BadgeStatus :statut="avocat.statut" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="text-xs uppercase text-gray-dark mb-1">Numéro de toque</p>
            <p class="font-medium">{{ avocat.numeroToque }}</p>
          </div>
          <div>
            <p class="text-xs uppercase text-gray-dark mb-1">Téléphone</p>
            <p class="font-medium">{{ avocat.telephone || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-xs uppercase text-gray-dark mb-1">Spécialité</p>
            <p class="font-medium">{{ avocat.specialite || 'Non renseigné' }}</p>
          </div>
          <div>
            <p class="text-xs uppercase text-gray-dark mb-1">Barreau</p>
            <p class="font-medium">{{ barreauLabel(avocat.barreauId) }}</p>
          </div>
          <div>
            <p class="text-xs uppercase text-gray-dark mb-1">Statut</p>
            <BadgeStatus :statut="avocat.statut" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

