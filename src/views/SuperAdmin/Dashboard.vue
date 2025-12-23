<script setup>
import Sidebar from '../../components/Sidebar.vue';
import StatCard from '../../components/StatCard.vue';
import { roleLinks } from '../../constants/roleLinks';
import { barreaux } from '../../mock/barreaux.mock';
import { demandes } from '../../mock/demandes.mock';
import { avocats } from '../../mock/avocats.mock';

const links = roleLinks.super_admin;
</script>

<template>
  <div class="flex flex-col md:flex-row gap-6 items-start">
    <Sidebar :links="links" title="Espace Super Admin" />
    <section class="flex-1 flex flex-col gap-6">
      <div class="flex flex-col gap-1">
        <h2 class="text-2xl font-semibold">Super Admin - Pilotage</h2>
        <p class="text-sm text-gray-dark">Vue consolidée des barreaux et demandes.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <StatCard label="Barreaux actifs" :value="barreaux.length" sublabel="Couverture nationale" />
        <StatCard label="Avocats référencés" :value="avocats.length" sublabel="Mock statique" />
        <StatCard
          label="Demandes en attente"
          :value="demandes.filter((d) => d.statut === 'en_attente').length"
          sublabel="Workflow local"
        />
      </div>
      <div class="border border-gray-dark/20 bg-white">
        <div class="px-4 py-3 border-b border-gray-dark/20 flex justify-between">
          <p class="font-semibold">Barreaux</p>
          <p class="text-sm text-gray-dark">Synthèse rapide</p>
        </div>
        <div class="divide-y divide-gray-dark/10">
          <div
            v-for="b in barreaux"
            :key="b.id"
            class="px-4 py-3 grid grid-cols-5 text-sm"
          >
            <span class="font-medium">{{ b.nom }}</span>
            <span>{{ b.ville }}</span>
            <span>{{ b.president }}</span>
            <span>{{ b.avocats }} avocats</span>
            <span>{{ b.demandesEnCours }} demandes</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

