<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
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
  rows: {
    type: Number,
    default: 4,
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
});

const emit = defineEmits(['update:modelValue', 'blur', 'focus']);

const textareaValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const sizeClasses = {
  sm: 'px-2 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base',
};

const textareaClasses = computed(() => {
  const base = 'w-full border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 resize-y';
  const sizeClass = sizeClasses[props.size];
  const errorClass = props.error ? 'border-black focus:ring-black' : 'border-gray-dark/40 focus:ring-gray-dark/50';
  const disabledClass = props.disabled ? 'bg-gray-light cursor-not-allowed opacity-60' : 'bg-white';
  
  return `${base} ${sizeClass} ${errorClass} ${disabledClass}`;
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="text-sm font-medium text-gray-dark">
      {{ label }}
      <span v-if="required" class="text-black">*</span>
    </label>
    <textarea
      v-model="textareaValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :rows="rows"
      :class="textareaClasses"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
    <p v-if="error" class="text-xs text-black font-medium">{{ error }}</p>
    <p v-else-if="helperText" class="text-xs text-gray-dark">{{ helperText }}</p>
  </div>
</template>

