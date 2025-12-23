<script setup>
import { computed } from 'vue';
import { useNotification } from '../composables/useNotification';

const { notifications, remove } = useNotification();

const getNotificationClass = (type) => {
  const baseClass = 'px-4 py-3 rounded-md shadow-lg border flex items-center gap-3 min-w-[300px] max-w-md';
  const typeClasses = {
    success: 'bg-white border-gray-dark/20 text-gray-dark',
    error: 'bg-black text-white border-white/20',
    info: 'bg-gray-light border-gray-dark/30 text-gray-dark',
    warning: 'bg-white border-black text-gray-dark',
  };
  return `${baseClass} ${typeClasses[type] || typeClasses.info}`;
};

const getIcon = (type) => {
  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };
  return icons[type] || icons.info;
};
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <TransitionGroup name="notification" tag="div">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="getNotificationClass(notification.type)"
        >
          <span class="text-lg font-bold">{{ getIcon(notification.type) }}</span>
          <p class="flex-1 text-sm">{{ notification.message }}</p>
          <button
            class="text-gray-dark hover:text-black transition-colors"
            @click="remove(notification.id)"
          >
            ✕
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>

