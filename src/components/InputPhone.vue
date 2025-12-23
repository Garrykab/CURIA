<script setup>
import { computed } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Téléphone',
  },
  placeholder: {
    type: String,
    default: 'Numéro de téléphone',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  helperText: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  defaultCountry: {
    type: String,
    default: 'CD', // RDC par défaut
  },
});

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'validate']);

const phoneData = computed(() => {
  return props.modelValue || '';
});

const sizeClasses = {
  sm: 'px-2 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base',
};

const inputClasses = computed(() => {
  const base = 'w-full border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0';
  const sizeClass = sizeClasses[props.size];
  const errorClass = props.error
    ? 'border-black focus:ring-black'
    : 'border-gray-dark/40 focus:ring-gray-dark/50';
  const disabledClass = props.disabled
    ? 'bg-gray-light cursor-not-allowed opacity-60'
    : 'bg-white';

  return `${base} ${sizeClass} ${errorClass} ${disabledClass}`;
});

const handleInput = (phone, phoneObject) => {
  emit('update:modelValue', phone);
  if (phoneObject?.valid) {
    emit('validate', phoneObject);
  }
};

const handleBlur = (event) => {
  emit('blur', event);
};

const handleFocus = (event) => {
  emit('focus', event);
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="text-sm font-medium text-gray-dark">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="vue-tel-input-wrapper">
      <VueTelInput
        :model-value="phoneData"
        :default-country="defaultCountry"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :input-classes="inputClasses"
        :dropdown-classes="'bg-white border border-gray-dark/20 rounded-md shadow-lg'"
        :dropdown-options-classes="'hover:bg-gray-light'"
        :preferred-countries="['CD', 'FR', 'BE', 'CH', 'US', 'GB']"
        :only-countries="[]"
        :ignored-countries="[]"
        :mode="'international'"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
    </div>
    <p v-if="error" class="text-xs text-red-500 font-medium">{{ error }}</p>
    <p v-else-if="helperText" class="text-xs text-gray-dark">{{ helperText }}</p>
  </div>
</template>

<style scoped>
/* Personnalisation du style pour correspondre au design noir & blanc */
:deep(.vue-tel-input) {
  @apply w-full;
}

:deep(.vue-tel-input .vti__dropdown) {
  @apply border-r-0 rounded-l-md border-gray-dark/40 bg-white hover:bg-gray-light transition-colors;
}

:deep(.vue-tel-input .vti__dropdown-list) {
  @apply bg-white border border-gray-dark/20 rounded-md shadow-lg;
  max-height: 300px;
  overflow-y: auto;
}

:deep(.vue-tel-input .vti__dropdown-item) {
  @apply hover:bg-gray-light text-gray-dark;
}

:deep(.vue-tel-input .vti__dropdown-item.highlighted) {
  @apply bg-gray-light;
}

:deep(.vue-tel-input input) {
  @apply rounded-l-none;
}

:deep(.vue-tel-input .vti__flag) {
  @apply border-gray-dark/20;
}

/* Scrollbar personnalisée pour le dropdown */
:deep(.vue-tel-input .vti__dropdown-list::-webkit-scrollbar) {
  width: 6px;
}

:deep(.vue-tel-input .vti__dropdown-list::-webkit-scrollbar-track) {
  background: #f2f2f2;
}

:deep(.vue-tel-input .vti__dropdown-list::-webkit-scrollbar-thumb) {
  background: #333;
  border-radius: 3px;
}

:deep(.vue-tel-input .vti__dropdown-list::-webkit-scrollbar-thumb:hover) {
  background: #000;
}
</style>
