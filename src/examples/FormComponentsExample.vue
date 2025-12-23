<script setup>
import { ref } from 'vue';
import InputText from '../components/InputText.vue';
import InputPhone from '../components/InputPhone.vue';
import Textarea from '../components/Textarea.vue';
import Select from '../components/Select.vue';

const form = ref({
  nom: '',
  email: '',
  telephone: '',
  barreau: '',
  message: '',
});

const errors = ref({});

const barreaux = [
  { value: 1, label: 'Barreau de Kinshasa' },
  { value: 2, label: 'Barreau de Lubumbashi' },
  { value: 3, label: 'Barreau de Goma' },
];

const validate = () => {
  errors.value = {};
  
  if (!form.value.nom) {
    errors.value.nom = 'Le nom est requis';
  }
  
  if (!form.value.email) {
    errors.value.email = 'L\'email est requis';
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Email invalide';
  }
  
  if (!form.value.barreau) {
    errors.value.barreau = 'Veuillez sélectionner un barreau';
  }
  
  return Object.keys(errors.value).length === 0;
};

const submit = () => {
  if (validate()) {
    console.log('Formulaire valide:', form.value);
    alert('Formulaire soumis avec succès !');
  }
};
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto space-y-6">
    <h2 class="text-2xl font-semibold mb-6">Exemples de composants de formulaire</h2>

    <div class="border border-gray-dark/20 bg-white p-6 rounded-md space-y-4">
      <InputText
        v-model="form.nom"
        label="Nom complet"
        placeholder="Me ..."
        required
        :error="errors.nom"
        helper-text="Entrez votre nom complet"
      />

      <InputText
        v-model="form.email"
        type="email"
        label="Email"
        placeholder="email@example.com"
        required
        :error="errors.email"
      />

      <InputPhone
        v-model="form.telephone"
        label="Téléphone"
        placeholder="820 000 000"
        helper-text="Sélectionnez le préfixe et entrez le numéro"
      />

      <Select
        v-model="form.barreau"
        label="Barreau"
        placeholder="Sélectionner un barreau"
        :options="barreaux"
        required
        :error="errors.barreau"
      />

      <Textarea
        v-model="form.message"
        label="Message"
        placeholder="Votre message..."
        :rows="5"
        helper-text="Maximum 500 caractères"
      />

      <div class="flex gap-3 pt-4">
        <button class="bg-black text-white px-6 py-2 rounded-md" @click="submit">
          Soumettre
        </button>
        <button
          class="border border-gray-dark/40 px-6 py-2 rounded-md hover:bg-gray-light"
          @click="form = { nom: '', email: '', telephone: '', barreau: '', message: '' }"
        >
          Réinitialiser
        </button>
      </div>
    </div>

    <div class="border border-gray-dark/20 bg-white p-6 rounded-md space-y-4">
      <h3 class="font-semibold">Tailles disponibles</h3>
      <InputText v-model="form.nom" label="Petit (sm)" size="sm" placeholder="Taille sm" />
      <InputText v-model="form.nom" label="Moyen (md)" size="md" placeholder="Taille md" />
      <InputText v-model="form.nom" label="Grand (lg)" size="lg" placeholder="Taille lg" />
    </div>

    <div class="border border-gray-dark/20 bg-white p-6 rounded-md space-y-4">
      <h3 class="font-semibold">États</h3>
      <InputText v-model="form.nom" label="Désactivé" disabled placeholder="Champ désactivé" />
      <InputText
        v-model="form.nom"
        label="Avec erreur"
        error="Ce champ contient une erreur"
        placeholder="Champ avec erreur"
      />
    </div>
  </div>
</template>

