<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth.store';

const router = useRouter();
const auth = useAuthStore();

const isMenuOpen = ref(false);
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const handleLogout = () => {
  auth.logout();
  closeMenu();
  closeDropdown();
  router.push('/');
};

// Fermer le dropdown si clic en dehors
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <nav class="bg-black text-white">
    <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between relative">
      <div class="flex items-center gap-3">
        <div class="h-10 w-10 bg-white text-black flex items-center justify-center font-bold">
          CU
        </div>
        <div>
          <p class="font-bold text-lg tracking-wide">CURIA</p>
          <p class="text-xs text-gray-300">Plateforme d'identification</p>
        </div>
      </div>

      <!-- Desktop links -->
      <div class="hidden md:flex items-center gap-6">
        <RouterLink
            v-if="!auth.isAuthenticated"
            class="text-sm hover:underline" to="/" 
            @click="closeMenu">
          Accueil
        </RouterLink>
        <RouterLink v-if="!auth.isAuthenticated" class="text-sm hover:underline" to="/verify">
          Vérifier
        </RouterLink>
        <RouterLink v-if="!auth.isAuthenticated" class="text-sm hover:underline" to="/request">
          Demande
        </RouterLink>
        <RouterLink v-if="!auth.isAuthenticated" class="text-sm hover:underline" to="/login">
          Connexion
        </RouterLink>
        <template v-else>
          <!-- User Dropdown -->
          <div class="relative" ref="dropdownRef">
            <button
              @click="toggleDropdown"
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div class="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">
                {{ auth.userName.charAt(0).toUpperCase() }}
              </div>
              <div class="flex flex-col items-start">
                <span class="text-sm font-medium">{{ auth.userName }}</span>
                <span class="text-xs text-gray-300 uppercase">
                  {{ auth.userRole.replace('_', ' ') }}
                </span>
              </div>
              <svg
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': isDropdownOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-64 bg-white border border-gray-dark/20 rounded-lg shadow-lg overflow-hidden z-50"
            >
              <!-- Header with profile -->
              <div class="px-4 py-4 bg-gray-light">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                    {{ auth.userName.charAt(0).toUpperCase() }}
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-gray-dark">{{ auth.userName }}</p>
                    <p class="text-xs text-gray-dark uppercase">
                      {{ auth.userRole.replace('_', ' ') }}
                    </p>
                  </div>
                </div>
              </div>

            <!-- Divider -->
            <div class="border-t border-gray-dark/10"></div>

            <!-- Accueil -->
            <RouterLink
              to="/"
              @click="closeDropdown"
              class="w-full flex items-center px-4 py-3 text-sm text-gray-dark hover:bg-gray-light transition-colors"
            >
              <span class="w-2 h-2 rounded-full bg-gray-dark mr-3"></span>
              Accueil
            </RouterLink>

            <!-- Logout -->
            <button
              @click="handleLogout"
              class="w-full flex items-center px-4 py-3 text-sm text-gray-dark hover:bg-gray-light transition-colors"
            >
              <span class="w-2 h-2 rounded-full bg-gray-dark mr-3"></span>
              Déconnexion
            </button>
            </div>
          </div>
        </template>
      </div>

      <!-- Mobile toggle -->
      <button
        class="md:hidden text-sm border border-white px-3 py-1"
        @click="toggleMenu"
        aria-label="Menu"
      >
        {{ isMenuOpen ? 'Fermer' : 'Menu' }}
      </button>

      <!-- Mobile menu -->
      <div
        v-if="isMenuOpen"
        class="absolute top-full left-0 right-0 bg-black text-white flex flex-col gap-2 px-4 py-3 md:hidden"
      >
        <RouterLink
            v-if="!auth.isAuthenticated"
            class="text-sm py-1 border-b border-white/10" to="/" 
            @click="closeMenu">
          Accueil
        </RouterLink>
        
        <RouterLink
          v-if="!auth.isAuthenticated"
          class="text-sm py-1 border-b border-white/10"
          to="/verify"
          @click="closeMenu"
        >
          Vérifier
        </RouterLink>
        <RouterLink
          v-if="!auth.isAuthenticated"
          class="text-sm py-1 border-b border-white/10"
          to="/request"
          @click="closeMenu"
        >
          Demande
        </RouterLink>
        <RouterLink
          v-if="!auth.isAuthenticated"
          class="text-sm py-1"
          to="/login"
          @click="closeMenu"
        >
          Connexion
        </RouterLink>
        <template v-else>
          <!-- Mobile User Profile -->
          <div class="border-t border-white/10 pt-3 mt-2">
            <div class="flex items-center gap-3 mb-3 pb-3 border-b border-white/10">
              <div class="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
                {{ auth.userName.charAt(0).toUpperCase() }}
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium">{{ auth.userName }}</p>
                <p class="text-xs text-gray-300 uppercase">
                  {{ auth.userRole.replace('_', ' ') }}
                </p>
              </div>
            </div>
            <RouterLink
              to="/"
              @click="closeMenu"
              class="bg-white text-black px-3 py-2 text-sm w-full rounded-md font-medium text-center"
            >
              Accueil
            </RouterLink>
            <button
              class="bg-white text-black px-3 py-2 text-sm w-full rounded-md font-medium mt-2"
              @click="handleLogout"
            >
              Déconnexion
            </button>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

