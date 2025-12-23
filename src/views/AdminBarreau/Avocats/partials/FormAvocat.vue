<script setup>
import InputText from '../../../../components/InputText.vue';
import InputPhone from '../../../../components/InputPhone.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:modelValue']);

const updateField = (field, value) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputText
        :model-value="modelValue.nom || ''"
        @update:model-value="updateField('nom', $event)"
        label="Nom complet"
        placeholder="Me ..."
        required
        :error="errors.nom"
      />
      <InputText
        :model-value="modelValue.email || ''"
        @update:model-value="updateField('email', $event)"
        type="email"
        label="Email"
        placeholder="email@test.com"
        required
        :error="errors.email"
      />
      <InputText
        :model-value="modelValue.numeroToque || ''"
        @update:model-value="updateField('numeroToque', $event)"
        label="Numéro de toque"
        placeholder="KIN-4587"
        required
        :error="errors.numeroToque"
      />
      <InputPhone
        :model-value="modelValue.telephone || ''"
        @update:model-value="updateField('telephone', $event)"
        label="Téléphone"
        placeholder="Numéro de téléphone"
        :error="errors.telephone"
        default-country="CD"
      />
      <InputText
        :model-value="modelValue.specialite || ''"
        @update:model-value="updateField('specialite', $event)"
        label="Spécialité"
        placeholder="Droit des affaires"
        class="md:col-span-2"
        :error="errors.specialite"
      />
    </div>
  </div>
</template>
