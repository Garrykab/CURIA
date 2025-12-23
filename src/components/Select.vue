<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Sélectionner...',
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
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  optionLabel: {
    type: String,
    default: 'label',
  },
  optionValue: {
    type: String,
    default: 'value',
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
});

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'change']);

const selectValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
    emit('change', value);
  },
});

const sizeClasses = {
  sm: 'px-2 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base',
};

const selectClasses = computed(() => {
  const base = 'w-full border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 appearance-none bg-white';
  const sizeClass = sizeClasses[props.size];
  const errorClass = props.error ? 'border-black focus:ring-black' : 'border-gray-dark/40 focus:ring-gray-dark/50';
  const disabledClass = props.disabled ? 'bg-gray-light cursor-not-allowed opacity-60' : '';
  
  return `${base} ${sizeClass} ${errorClass} ${disabledClass}`;
});

const getOptionLabel = (option) => {
  if (typeof option === 'string' || typeof option === 'number') {
    return option;
  }
  return option[props.optionLabel] || option.label || option;
};

const getOptionValue = (option) => {
  if (typeof option === 'string' || typeof option === 'number') {
    return option;
  }
  return option[props.optionValue] !== undefined ? option[props.optionValue] : option.value;
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="text-sm font-medium text-gray-dark">
      {{ label }}
      <span v-if="required" class="text-black">*</span>
    </label>
    <div class="relative">
      <select
        v-model="selectValue"
        :required="required"
        :disabled="disabled"
        :class="selectClasses"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      >
        <option v-if="placeholder" :value="''" disabled>{{ placeholder }}</option>
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="getOptionValue(option)"
        >
          {{ getOptionLabel(option) }}
        </option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    <p v-if="error" class="text-xs text-black font-medium">{{ error }}</p>
    <p v-else-if="helperText" class="text-xs text-gray-dark">{{ helperText }}</p>
  </div>
</template>

