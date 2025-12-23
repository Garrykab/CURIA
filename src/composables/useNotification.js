import { ref } from 'vue';

const notifications = ref([]);
let notificationId = 0;

export const useNotification = () => {
  const show = (message, type = 'info', duration = 3000) => {
    const id = ++notificationId;
    const notification = {
      id,
      message,
      type, // 'success' | 'error' | 'info' | 'warning'
      duration,
    };

    notifications.value.push(notification);

    if (duration > 0) {
      setTimeout(() => {
        remove(id);
      }, duration);
    }

    return id;
  };

  const remove = (id) => {
    const index = notifications.value.findIndex((n) => n.id === id);
    if (index > -1) {
      notifications.value.splice(index, 1);
    }
  };

  const success = (message, duration) => show(message, 'success', duration);
  const error = (message, duration) => show(message, 'error', duration);
  const info = (message, duration) => show(message, 'info', duration);
  const warning = (message, duration) => show(message, 'warning', duration);

  const clear = () => {
    notifications.value = [];
  };

  return {
    notifications,
    show,
    remove,
    success,
    error,
    info,
    warning,
    clear,
  };
};

