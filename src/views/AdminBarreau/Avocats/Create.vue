<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '../../../components/Sidebar.vue';
import FormAvocat from './partials/FormAvocat.vue';
import ModalConfirm from '../../../components/ModalConfirm.vue';
import { roleLinks } from '../../../constants/roleLinks';
import { avocats as avocatsMock } from '../../../mock/avocats.mock';
import { demandes } from '../../../mock/demandes.mock';
import { useAuthStore } from '../../../store/auth.store';
import { useNotification } from '../../../composables/useNotification';

const router = useRouter();
const auth = useAuthStore();
const notification = useNotification();
const barreauId = auth.barreauId || 1;
const links = roleLinks.admin_barreau;

const badges = computed(() => ({
  '/barreau/demandes': demandes.filter((d) => d.barreauId === barreauId && d.statut === 'en_attente').length,
}));

const form = ref({
  nom: '',
  email: '',
  numeroToque: '',
  telephone: '',
  specialite: '',
});

const errors = ref({});
const showCancelModal = ref(false);

const updateForm = (newForm) => {
  form.value = { ...newForm };
  errors.value = {};
};

const validate = () => {
  errors.value = {};
  let isValid = true;

  if (!form.value.nom?.trim()) {
    errors.value.nom = 'Le nom est requis';
    isValid = false;
  }

  if (!form.value.email?.trim()) {
    errors.value.email = 'L\'email est requis';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Email invalide';
    isValid = false;
  }

  if (!form.value.numeroToque?.trim()) {
    errors.value.numeroToque = 'Le numéro de toque est requis';
    isValid = false;
  }

  return isValid;
};

const submit = () => {
  if (!validate()) {
    notification.error('Veuillez corriger les erreurs du formulaire');
    return;
  }

  // Ajouter l'avocat (simulation locale)
  const newAvocat = {
    id: Date.now(),
    barreauId,
    statut: 'actif',
    ...form.value,
  };

  avocatsMock.push(newAvocat);
  notification.success('Avocat ajouté avec succès');
  router.push('/barreau/avocats');
};

const handleCancel = () => {
  const hasData = Object.values(form.value).some((v) => v?.trim());
  if (hasData) {
    showCancelModal.value = true;
  } else {
    router.push('/barreau/avocats');
  }
};

const confirmCancel = () => {
  router.push('/barreau/avocats');
};
</script>

<template>
  <div class="flex flex-col md:flex-row gap-6 items-start">
    <Sidebar :links="links" title="Espace Barreau" :badges="badges" />
    <section class="flex-1 flex flex-col gap-6">
      <div>
        <h2 class="text-2xl font-semibold">Ajouter un avocat</h2>
        <p class="text-sm text-gray-dark mt-1">Créer un nouveau dossier avocat dans le registre</p>
      </div>

      <div class="border border-gray-dark/20 bg-white p-6 rounded-md">
        <FormAvocat :model-value="form" :errors="errors" @update:model-value="updateForm" />
        <div class="flex gap-3 mt-6 pt-6 border-t border-gray-dark/10">
          <button class="bg-black text-white px-6 py-2 rounded-md" @click="submit">
            Enregistrer
          </button>
          <button
            class="border border-gray-dark/40 px-6 py-2 rounded-md hover:bg-gray-light"
            @click="handleCancel"
          >
            Annuler
          </button>
        </div>
      </div>
    </section>

    <ModalConfirm
      :is-open="showCancelModal"
      title="Annuler la création"
      message="Les modifications non enregistrées seront perdues. Êtes-vous sûr de vouloir continuer ?"
      confirm-text="Oui, annuler"
      cancel-text="Non, continuer"
      @confirm="confirmCancel"
      @cancel="showCancelModal = false"
      @close="showCancelModal = false"
    />
  </div>
</template>
