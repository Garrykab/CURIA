<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Confirmation',
  },
  message: {
    type: String,
    required: true,
  },
  confirmText: {
    type: String,
    default: 'Confirmer',
  },
  cancelText: {
    type: String,
    default: 'Annuler',
  },
  confirmVariant: {
    type: String,
    default: 'primary', // 'primary' | 'danger'
  },
});

const emit = defineEmits(['confirm', 'cancel', 'close']);

const handleConfirm = () => {
  emit('confirm');
  emit('close');
};

const handleCancel = () => {
  emit('cancel');
  emit('close');
};

const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    handleCancel();
  }
};

const handleEscape = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    handleCancel();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click="handleBackdropClick"
      >
        <div
          class="bg-white rounded-lg shadow-xl max-w-md w-full border border-gray-dark/20"
          @click.stop
        >
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-dark mb-3">{{ title }}</h3>
            <p class="text-sm text-gray-dark mb-6">{{ message }}</p>
            <div class="flex gap-3 justify-end">
              <button
                class="px-4 py-2 text-sm border border-gray-dark/40 rounded-md hover:bg-gray-light transition-colors"
                @click="handleCancel"
              >
                {{ cancelText }}
              </button>
              <button
                class="px-4 py-2 text-sm rounded-md transition-colors font-medium"
                :class="
                  confirmVariant === 'danger'
                    ? 'bg-black text-white hover:bg-gray-dark'
                    : 'bg-black text-white hover:bg-gray-dark'
                "
                @click="handleConfirm"
              >
                {{ confirmText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  opacity: 0;
  transform: scale(0.95);
}
</style>

