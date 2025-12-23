<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  links: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: '',
  },
  badges: {
    type: Object,
    default: () => ({}),
  },
});

const route = useRoute();
const isOpen = ref(false);
const toggle = () => {
  isOpen.value = !isOpen.value;
};

// Fonction pour déterminer si un lien est actif
const isLinkActive = (link) => {
  const currentPath = route.path;
  const linkPath = link.to;
  
  // Si le chemin correspond exactement
  if (currentPath === linkPath) {
    return true;
  }
  
  // Cas spécial pour l'onglet "Avocats" : actif sur toutes les pages /barreau/avocats/* sauf /barreau/demandes
  if (linkPath === '/barreau/avocats') {
    return currentPath.startsWith('/barreau/avocats') && currentPath !== '/barreau/demandes';
  }
  
  // Pour les autres liens, vérifier si le chemin commence par le chemin du lien
  // (utile pour les sous-routes)
  if (currentPath.startsWith(linkPath + '/')) {
    return true;
  }
  
  return false;
};

const getBadgeClass = (link, count) => {
  const isActive = isLinkActive(link);
  const isHigh = count >= 5;
  const isMedium = count >= 3;
  
  if (isActive) {
    // Lien actif : badge blanc sur fond noir
    return 'bg-white text-black';
  } else if (isHigh) {
    // Nombre élevé : badge noir avec animation
    return 'bg-black text-white animate-pulse';
  } else if (isMedium) {
    // Nombre moyen : badge noir avec bordure plus visible
    return 'bg-black text-white border-2 border-gray-dark';
  } else {
    // Nombre faible : badge noir standard
    return 'bg-black text-white';
  }
};
</script>

<template>
  <div class="w-full md:w-auto">
    <!-- Mobile toggle -->
    <div class="md:hidden flex items-center justify-between bg-white border-b border-gray-dark/20 p-4 shadow-sm">
      <div class="text-base font-bold text-gray-dark uppercase tracking-wide">{{ title }}</div>
      <button
        class="text-sm font-medium text-gray-dark hover:text-black transition-colors px-3 py-1 rounded-md hover:bg-gray-light"
        @click="toggle"
      >
        {{ isOpen ? '✕ Fermer' : '☰ Menu' }}
      </button>
    </div>
    <div
      v-if="isOpen"
      class="md:hidden bg-white border-b border-gray-dark/20 shadow-lg"
    >
      <nav class="flex flex-col p-2">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 border-l-4 border-transparent hover:bg-gray-light hover:border-gray-dark hover:pl-5 flex items-center justify-between"
          :class="{
            'bg-black text-white border-l-4 border-white shadow-md font-semibold': isLinkActive(link)
          }"
          @click="isOpen = false"
        >
          <span>{{ link.label }}</span>
          <span
            v-if="badges[link.to] && badges[link.to] > 0"
            class="text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center transition-all duration-200 font-semibold"
            :class="getBadgeClass(link, badges[link.to])"
          >
            {{ badges[link.to] }}
          </span>
        </RouterLink>
      </nav>
    </div>

    <!-- Desktop sidebar -->
    <aside class="hidden md:block bg-white border-r border-gray-dark/20 min-w-[260px] h-full shadow-sm">
      <div class="p-6 border-b border-gray-dark/10">
        <p class="text-base font-bold text-gray-dark uppercase tracking-wide">{{ title }}</p>
      </div>
      <nav class="flex flex-col p-4 gap-1">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 border-l-4 border-transparent hover:bg-gray-light hover:border-gray-dark hover:pl-5 hover:shadow-sm flex items-center justify-between"
          :class="{
            'bg-black text-white border-l-4 border-white shadow-md font-semibold': isLinkActive(link)
          }"
        >
          <span>{{ link.label }}</span>
          <span
            v-if="badges[link.to] && badges[link.to] > 0"
            class="text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center transition-all duration-200 font-semibold"
            :class="getBadgeClass(link, badges[link.to])"
          >
            {{ badges[link.to] }}
          </span>
        </RouterLink>
      </nav>
    </aside>
  </div>
</template>

