<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '../../../components/Sidebar.vue';
import BadgeStatus from '../../../components/BadgeStatus.vue';
import { roleLinks } from '../../../constants/roleLinks';
import { avocats as avocatsMock } from '../../../mock/avocats.mock';
import { demandes } from '../../../mock/demandes.mock';
import { barreaux } from '../../../mock/barreaux.mock';
import { useAuthStore } from '../../../store/auth.store';

const router = useRouter();
const auth = useAuthStore();
const barreauId = auth.barreauId || 1;

const avocats = ref([...avocatsMock.filter((a) => a.barreauId === barreauId)]);
const barreauLabel = (id) => barreaux.find((b) => b.id === id)?.nom || 'Barreau';
const links = roleLinks.admin_barreau;

const badges = computed(() => ({
  '/barreau/demandes': demandes.filter((d) => d.barreauId === barreauId && d.statut === 'en_attente').length,
}));

const goToCreate = () => {
  router.push('/barreau/avocats/create');
};

const goToShow = (id) => {
  router.push(`/barreau/avocats/${id}`);
};

const goToEdit = (id) => {
  router.push(`/barreau/avocats/${id}/edit`);
};
</script>

<template>
  <div class="flex flex-col md:flex-row gap-6 items-start">
    <Sidebar :links="links" title="Espace Barreau" :badges="badges" />
    <section class="flex-1 flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-semibold">Avocats du barreau</h2>
          <p class="text-sm text-gray-dark">{{ barreauLabel(barreauId) }}</p>
        </div>
        <div class="flex items-center gap-4">
          <p class="text-sm text-gray-dark">{{ avocats.length }} dossiers</p>
          <button class="bg-black text-white px-4 py-2 text-sm rounded-md" @click="goToCreate">
            + Ajouter un avocat
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          v-for="a in avocats"
          :key="a.id"
          class="border border-gray-dark/20 bg-white p-4 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer"
          @click="goToShow(a.id)"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <p class="font-semibold">{{ a.nom }}</p>
              <p class="text-xs text-gray-dark">{{ a.email }}</p>
            </div>
            <BadgeStatus :statut="a.statut" />
          </div>
          <div class="flex flex-col gap-1 text-sm text-gray-dark">
            <p>Toque: {{ a.numeroToque }}</p>
            <p>Spécialité: {{ a.specialite }}</p>
          </div>
          <div class="flex gap-2 pt-2 border-t border-gray-dark/10">
            <button
              class="text-xs px-3 py-1 border border-gray-dark/30 hover:bg-gray-light"
              @click.stop="goToEdit(a.id)"
            >
              Modifier
            </button>
            <button
              class="text-xs px-3 py-1 border border-gray-dark/30 hover:bg-gray-light"
              @click.stop="goToShow(a.id)"
            >
              Voir détails
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

