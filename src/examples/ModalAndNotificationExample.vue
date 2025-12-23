<script setup>
import { ref } from 'vue';
import ModalConfirm from '../components/ModalConfirm.vue';
import { useNotification } from '../composables/useNotification';

const showModal = ref(false);
const notification = useNotification();

const handleDelete = () => {
  showModal.value = true;
};

const confirmDelete = () => {
  notification.success('Élément supprimé avec succès');
  // Logique de suppression ici
};

const showSuccess = () => {
  notification.success('Opération réussie !');
};

const showError = () => {
  notification.error('Une erreur est survenue');
};

const showInfo = () => {
  notification.info('Information importante');
};

const showWarning = () => {
  notification.warning('Attention requise');
};
</script>

<template>
  <div class="p-6 space-y-4">
    <h2 class="text-2xl font-semibold mb-4">Exemples d'utilisation</h2>

    <div class="space-y-2">
      <h3 class="font-semibold">Modal de confirmation</h3>
      <button class="bg-black text-white px-4 py-2 rounded-md" @click="handleDelete">
        Supprimer (ouvrir modal)
      </button>
    </div>

    <div class="space-y-2">
      <h3 class="font-semibold">Notifications</h3>
      <div class="flex gap-2 flex-wrap">
        <button class="bg-black text-white px-4 py-2 rounded-md" @click="showSuccess">
          Success
        </button>
        <button class="bg-black text-white px-4 py-2 rounded-md" @click="showError">
          Error
        </button>
        <button class="bg-black text-white px-4 py-2 rounded-md" @click="showInfo">
          Info
        </button>
        <button class="bg-black text-white px-4 py-2 rounded-md" @click="showWarning">
          Warning
        </button>
      </div>
    </div>

    <ModalConfirm
      :is-open="showModal"
      title="Confirmer la suppression"
      message="Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."
      confirm-text="Supprimer"
      cancel-text="Annuler"
      confirm-variant="danger"
      @confirm="confirmDelete"
      @cancel="showModal = false"
      @close="showModal = false"
    />
  </div>
</template>

