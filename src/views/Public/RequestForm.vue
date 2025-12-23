<script setup>
import { ref, computed } from 'vue';
import { barreaux } from '../../mock/barreaux.mock';
import { demandes as demandesMock } from '../../mock/demandes.mock';
import BadgeStatus from '../../components/BadgeStatus.vue';

const demandes = ref([...demandesMock]);
const form = ref({
  nom: '',
  email: '',
  barreauId: barreaux[0]?.id || 1,
});
const submitted = ref(false);
const searchEmail = ref('');

const submit = () => {
  if (!form.value.nom || !form.value.email) return;
  demandes.value.unshift({
    id: Date.now(),
    nom: form.value.nom,
    email: form.value.email,
    barreauId: Number(form.value.barreauId),
    statut: 'en_attente',
    submittedAt: new Date().toISOString().slice(0, 10),
  });
  submitted.value = true;
  searchEmail.value = form.value.email; // Auto-remplir la recherche avec l'email soumis
  form.value = { nom: '', email: '', barreauId: barreaux[0]?.id || 1 };
};

const barreauLabel = (id) => barreaux.find((b) => b.id === id)?.nom || 'Barreau';

const filteredDemandes = computed(() => {
  if (!searchEmail.value.trim()) return [];
  return demandes.value.filter((d) =>
    d.email.toLowerCase().includes(searchEmail.value.toLowerCase().trim())
  );
});
</script>

<template>
  <section class="border border-gray-dark/20 bg-white p-6 flex flex-col gap-6">
    <div>
      <h2 class="text-2xl font-semibold">Demande d'inscription</h2>
      <p class="text-gray-dark text-sm mt-1">Soumission publique. Statut local uniquement.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <label class="flex flex-col text-sm gap-2">
        Nom complet
        <input
          v-model="form.nom"
          type="text"
          class="border border-gray-dark/40 px-3 py-2"
          placeholder="Me ..."
        />
      </label>
      <label class="flex flex-col text-sm gap-2">
        Email
        <input
          v-model="form.email"
          type="email"
          class="border border-gray-dark/40 px-3 py-2"
          placeholder="email@test.com"
        />
      </label>
      <label class="flex flex-col text-sm gap-2">
        Barreau
        <select
          v-model="form.barreauId"
          class="border border-gray-dark/40 px-3 py-2 bg-white"
        >
          <option v-for="b in barreaux" :key="b.id" :value="b.id">{{ b.nom }}</option>
        </select>
      </label>
    </div>

    <button class="bg-black text-white px-4 py-2 w-fit" @click="submit">
      Soumettre la demande
    </button>
    <p v-if="submitted" class="text-sm text-gray-dark">
      Demande enregistrée en local. Un administrateur de barreau pourra la traiter.
    </p>

    <div class="border-t border-gray-dark/20 pt-6">
      <div class="mb-4">
        <p class="font-semibold mb-2">Suivi visuel (Public)</p>
        <p class="text-xs text-gray-dark mb-3">
          Recherchez le statut de votre demande en entrant votre adresse email.
        </p>
        <div class="flex gap-2">
          <input
            v-model="searchEmail"
            type="email"
            class="border border-gray-dark/40 px-3 py-2 flex-1 max-w-md"
            placeholder="Entrez votre email pour voir vos demandes"
          />
        </div>
      </div>
      <div v-if="searchEmail.trim() && filteredDemandes.length === 0" class="text-sm text-gray-dark">
        Aucune demande trouvée pour cet email.
      </div>
      <div v-else-if="filteredDemandes.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          v-for="item in filteredDemandes"
          :key="item.id"
          class="border border-gray-dark/20 p-3 flex flex-col md:flex-row md:justify-between md:items-center gap-2"
        >
          <div>
            <p class="font-medium">{{ item.nom }}</p>
            <p class="text-xs text-gray-dark">{{ item.email }}</p>
            <p class="text-xs text-gray-dark">{{ barreauLabel(item.barreauId) }} • {{ item.submittedAt }}</p>
          </div>
          <BadgeStatus :statut="item.statut" />
        </div>
      </div>
    </div>
  </section>
</template>

