<script setup>
import { computed } from 'vue';
import Sidebar from '../../components/Sidebar.vue';
import StatCard from '../../components/StatCard.vue';
import { roleLinks } from '../../constants/roleLinks';
import { demandes } from '../../mock/demandes.mock';
import { avocats } from '../../mock/avocats.mock';
import { barreaux } from '../../mock/barreaux.mock';
import { useAuthStore } from '../../store/auth.store';

const auth = useAuthStore();
const barreauId = auth.barreauId || 1;
const links = roleLinks.admin_barreau;

const demandeListe = computed(() => demandes.filter((d) => d.barreauId === barreauId));
const avocatsListe = computed(() => avocats.filter((a) => a.barreauId === barreauId));
const barreau = barreaux.find((b) => b.id === barreauId);

const badges = computed(() => ({
  '/barreau/demandes': demandeListe.value.filter((d) => d.statut === 'en_attente').length,
}));
</script>

<template>
  <div class="flex flex-col md:flex-row gap-6 items-start">
    <Sidebar :links="links" title="Espace Barreau" :badges="badges" />
    <section class="flex-1 flex flex-col gap-6">
      <div class="flex flex-col gap-1">
        <h2 class="text-2xl font-semibold">Tableau de bord Barreau</h2>
        <p class="text-sm text-gray-dark">{{ barreau?.nom }}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <StatCard label="Demandes reçues" :value="demandeListe.length" />
        <StatCard label="Avocats référencés" :value="avocatsListe.length" />
        <StatCard
          label="En attente"
          :value="demandeListe.filter((d) => d.statut === 'en_attente').length"
          sublabel="Validation locale"
        />
      </div>

      <div class="border border-gray-dark/20 bg-white">
        <div class="px-4 py-3 border-b border-gray-dark/20 flex justify-between">
          <p class="font-semibold">Dernières demandes</p>
          <p class="text-xs text-gray-dark">Workflow mock</p>
        </div>
        <div class="divide-y divide-gray-dark/10">
          <div
            v-for="d in demandeListe"
            :key="d.id"
            class="px-4 py-3 flex justify-between text-sm"
          >
            <div>
              <p class="font-medium">{{ d.nom }}</p>
              <p class="text-xs text-gray-dark">{{ d.email }}</p>
            </div>
            <span class="text-xs uppercase">{{ d.statut }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

