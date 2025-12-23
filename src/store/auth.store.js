import { defineStore } from 'pinia';
import { users } from '../mock/users.mock';

const STORAGE_KEY = 'curia_session';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'),
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    userRole: (state) => state.user?.role || 'public',
    userName: (state) => state.user?.name || '',
    barreauId: (state) => state.user?.barreauId || null,
  },
  actions: {
    login(email, password) {
      const found = users.find((u) => u.email === email && u.password === password);
      if (found) {
        this.user = { ...found };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user));
        return { success: true, user: this.user };
      }
      return { success: false, message: 'Identifiants invalides' };
    },
    logout() {
      this.user = null;
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

