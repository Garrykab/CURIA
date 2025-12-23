<script setup>
import { ref, computed } from 'vue';
import Sidebar from '../../../components/Sidebar.vue';
import BadgeStatus from '../../../components/BadgeStatus.vue';
import ModalConfirm from '../../../components/ModalConfirm.vue';
import { roleLinks } from '../../../constants/roleLinks';
import { demandes as demandesMock } from '../../../mock/demandes.mock';
import { useAuthStore } from '../../../store/auth.store';
import { useNotification } from '../../../composables/useNotification';

const auth = useAuthStore();
const notification = useNotification();
const barreauId = auth.barreauId || 1;
const links = roleLinks.admin_barreau;

const demandes = ref([...demandesMock.filter((d) => d.barreauId === barreauId)]);

const counts = computed(() => ({
  en_attente: demandes.value.filter((d) => d.statut === 'en_attente').length,
  approuve: demandes.value.filter((d) => d.statut === 'approuve').length,
  rejete: demandes.value.filter((d) => d.statut === 'rejete').length,
}));

const badges = computed(() => ({
  '/barreau/demandes': counts.value.en_attente,
}));

const selectedDemande = ref(null);
const showConfirmModal = ref(false);
const pendingAction = ref(null);

const setStatus = (id, statut) => {
  const target = demandes.value.find((d) => d.id === id);
  if (!target) return;

  const demande = demandes.value.find((d) => d.id === id);
  selectedDemande.value = demande;

  if (statut === 'rejete') {
    pendingAction.value = () => {
      target.statut = statut;
      notification.warning(`Demande de ${demande.nom} rejetée`);
    };
    showConfirmModal.value = true;
  } else {
    target.statut = statut;
    const messages = {
      approuve: `Demande de ${demande.nom} approuvée`,
      en_attente: `Demande de ${demande.nom} mise en attente`,
    };
    notification.success(messages[statut]);
  }
};

const confirmReject = () => {
  if (pendingAction.value) {
    pendingAction.value();
    pendingAction.value = null;
  }
  showConfirmModal.value = false;
  selectedDemande.value = null;
};
</script>

<template>
  <div class="flex flex-col md:flex-row gap-6 items-start">
    <Sidebar :links="links" title="Espace Barreau" :badges="badges" />
    <section class="flex-1 flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-semibold">Demandes d'inscription avocats</h2>
          <p class="text-sm text-gray-dark">Gérer les demandes d'inscription</p>
        </div>
        <div class="flex gap-3 text-sm">
          <span>En attente: {{ counts.en_attente }}</span>
          <span>Approuvées: {{ counts.approuve }}</span>
          <span>Rejetées: {{ counts.rejete }}</span>
        </div>
      </div>

      <div class="border border-gray-dark/20 bg-white divide-y divide-gray-dark/10 rounded-md overflow-hidden">
        <div
          v-for="d in demandes"
          :key="d.id"
          class="px-4 py-3 flex items-center justify-between hover:bg-gray-light transition-colors"
        >
          <div>
            <p class="font-medium">{{ d.nom }}</p>
            <p class="text-xs text-gray-dark">{{ d.email }} • {{ d.submittedAt }}</p>
          </div>
          <div class="flex items-center gap-2">
            <BadgeStatus :statut="d.statut" />
            <button
              class="px-3 py-1 border border-black text-xs rounded-md hover:bg-gray-light transition-colors"
              @click="setStatus(d.id, 'approuve')"
            >
              Approuver
            </button>
            <button
              class="px-3 py-1 border border-gray-dark text-xs rounded-md hover:bg-gray-light transition-colors"
              @click="setStatus(d.id, 'rejete')"
            >
              Rejeter
            </button>
            <button
              class="px-3 py-1 bg-gray-light text-xs rounded-md hover:bg-gray-dark/10 transition-colors"
              @click="setStatus(d.id, 'en_attente')"
            >
              Attente
            </button>
          </div>
        </div>
      </div>
    </section>

    <ModalConfirm
      v-if="selectedDemande"
      :is-open="showConfirmModal"
      title="Confirmer le rejet"
      :message="`Êtes-vous sûr de vouloir rejeter la demande de ${selectedDemande?.nom} ? Cette action est irréversible.`"
      confirm-text="Oui, rejeter"
      cancel-text="Annuler"
      confirm-variant="danger"
      @confirm="confirmReject"
      @cancel="showConfirmModal = false; selectedDemande = null; pendingAction = null"
      @close="showConfirmModal = false; selectedDemande = null; pendingAction = null"
    />
  </div>
</template>
