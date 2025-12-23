<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import StatCard from '../../components/StatCard.vue';
import LottieAnimation from '../../components/LottieAnimation.vue';
import { avocats } from '../../mock/avocats.mock';
import { barreaux } from '../../mock/barreaux.mock';
import { demandes } from '../../mock/demandes.mock';

// Pour utiliser des animations Lottie réelles :
// 1. Allez sur https://lottiefiles.com/
// 2. Téléchargez ou copiez l'URL d'une animation JSON
// 3. Remplacez les URLs ci-dessous par les vraies URLs
// Exemple d'URL LottieFiles : https://lottie.host/embed/[ID]/[name].json
// Ou utilisez des fichiers locaux : import animation from '@/assets/animations/hero.json'

const stats = {
  avocats: avocats.length,
  barreaux: barreaux.length,
  demandes: demandes.filter((d) => d.statut === 'approuve').length,
};

// URLs d'animations Lottie - Remplacez par de vraies URLs depuis LottieFiles
// Pour activer les animations, remplacez null par une URL valide depuis https://lottiefiles.com/
// Format d'URL LottieFiles : https://lottie.host/embed/[ID]/[name].json
// Ou utilisez des fichiers locaux dans le dossier public/
const enableLottie = false; // Mettre à true pour activer les animations Lottie

const lottieAnimations = {
  hero: enableLottie ? 'https://lottie.host/embed/0c8e5e5e-5e5e-5e5e-5e5e-5e5e5e5e5e5/hero.json' : null,
  stats: enableLottie ? 'https://lottie.host/embed/1c8e5e5e-5e5e-5e5e-5e5e-5e5e5e5e5e5/stats.json' : null,
  check: enableLottie ? 'https://lottie.host/embed/8c8e5e5e-5e5e-5e5e-5e5e-5e5e5e5e5e5/check.json' : null,
  form: enableLottie ? 'https://lottie.host/embed/8c8e5e5e-5e5e-5e5e-5e5e-5e5e5e5e5e6/form.json' : null,
  security: enableLottie ? 'https://lottie.host/embed/8c8e5e5e-5e5e-5e5e-5e5e-5e5e5e5e5e7/security.json' : null,
  analytics: enableLottie ? 'https://lottie.host/embed/8c8e5e5e-5e5e-5e5e-5e5e-5e5e5e5e5e8/analytics.json' : null,
  automation: enableLottie ? 'https://lottie.host/embed/8c8e5e5e-5e5e-5e5e-5e5e-5e5e5e5e5e9/automation.json' : null,
  badge: enableLottie ? 'https://lottie.host/embed/8c8e5e5e-5e5e-5e5e-5e5e-5e5e5e5e5ea/badge.json' : null,
  benefit1: enableLottie ? 'https://lottie.host/embed/2c8e5e5e-5e5e-5e5e-5e5e-5e5e5e5e5e5/benefit1.json' : null,
  benefit2: enableLottie ? 'https://lottie.host/embed/3c8e5e5e-5e5e-5e5e-5e5e-5e5e5e5e5e5/benefit2.json' : null,
  benefit3: enableLottie ? 'https://lottie.host/embed/4c8e5e5e-5e5e-5e5e-5e5e-5e5e5e5e5e5/benefit3.json' : null,
};

const features = [
  {
    icon: '✓',
    title: 'Vérification instantanée',
    description: 'Vérifiez l\'authenticité d\'un avocat en quelques secondes avec notre système de recherche avancé.',
    lottieUrl: lottieAnimations.check,
  },
  {
    icon: '📋',
    title: 'Demande d\'inscription simplifiée',
    description: 'Processus de demande en ligne rapide et sécurisé pour les nouveaux avocats.',
    lottieUrl: lottieAnimations.form,
  },
  {
    icon: '🔒',
    title: 'Sécurité renforcée',
    description: 'Données protégées et accès sécurisé pour tous les utilisateurs de la plateforme.',
    lottieUrl: lottieAnimations.security,
  },
  {
    icon: '📊',
    title: 'Gestion centralisée',
    description: 'Pilotage institutionnel avec statistiques consolidées et suivi en temps réel.',
    lottieUrl: lottieAnimations.analytics,
  },
  {
    icon: '⚡',
    title: 'Workflow automatisé',
    description: 'Processus d\'admission optimisé avec validation locale et suivi des demandes.',
    lottieUrl: lottieAnimations.automation,
  },
  {
    icon: '🎯',
    title: 'Badge numérique',
    description: 'Identification visuelle avec badge numérique pour chaque avocat certifié.',
    lottieUrl: lottieAnimations.badge,
  },
];

const benefits = [
  {
    category: 'Public',
    title: 'Vérification des avocats',
    description: 'Résultat immédiat et badge numérique pour une identification rapide et fiable.',
    color: 'border-gray-dark/30',
  },
  {
    category: 'Barreaux',
    title: 'Workflow d\'admission',
    description: 'Suivi des demandes et validation locale avec outils de gestion intégrés.',
    color: 'border-gray-dark/30',
  },
  {
    category: 'Autorités',
    title: 'Pilotage institutionnel',
    description: 'Statistiques consolidées par rôle et vue d\'ensemble du système.',
    color: 'border-gray-dark/30',
  },
];

// Refs pour chaque section
const statsSection = ref(null);
const featuresSection = ref(null);
const benefitsSection = ref(null);
const ctaSection = ref(null);

// États d'intersection pour chaque section
const statsVisible = ref(false);
const featuresVisible = ref(false);
const benefitsVisible = ref(false);
const ctaVisible = ref(false);

let observers = [];

const setupIntersectionObserver = (elementRef, visibilityRef) => {
  if (!elementRef.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visibilityRef.value = entry.isIntersecting;
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px',
    }
  );

  observer.observe(elementRef.value);
  observers.push(observer);
};

onMounted(() => {
  // Attendre que les éléments soient rendus
  setTimeout(() => {
    setupIntersectionObserver(statsSection, statsVisible);
    setupIntersectionObserver(featuresSection, featuresVisible);
    setupIntersectionObserver(benefitsSection, benefitsVisible);
    setupIntersectionObserver(ctaSection, ctaVisible);
  }, 100);
});

onUnmounted(() => {
  observers.forEach((observer) => {
    observer.disconnect();
  });
  observers = [];
});
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-b from-gray-light to-white border-b border-gray-dark/20 py-16 md:py-24">
      <div class="container mx-auto px-4 md:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1 text-center md:text-left space-y-6 animate-fade-in">
              <p class="text-sm uppercase tracking-wider text-gray-dark font-medium">Plateforme CURIA</p>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark leading-tight">
                Identification des avocats<br />
                <span class="text-black">et gestion des barreaux</span>
              </h1>
              <p class="text-lg text-gray-dark max-w-2xl mx-auto md:mx-0">
                Une plateforme moderne et sécurisée pour l'identification des avocats et la gestion efficace des barreaux.
              </p>
            </div>
            <div v-if="lottieAnimations.hero" class="w-full md:w-80 lg:w-96 flex-shrink-0">
              <LottieAnimation
                :animation-url="lottieAnimations.hero"
                :height="400"
                :width="400"
                :speed="1"
                :loop="true"
                :auto-play="true"
                :visible="true"
              />
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <RouterLink
              to="/verify"
              class="group flex items-center justify-center bg-black text-white px-6 py-3 text-sm font-medium rounded-md transition-all duration-300 hover:bg-gray-dark hover:shadow-lg hover:scale-105 w-full sm:w-auto"
            >
              <span>Vérifier un avocat</span>
              <span class="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </RouterLink>
            <RouterLink
              to="/request"
              class="group flex items-center justify-center border-2 border-black text-black px-6 py-3 text-sm font-medium rounded-md transition-all duration-300 hover:bg-black hover:text-white hover:shadow-lg hover:scale-105 w-full sm:w-auto"
            >
              <span>Demander une inscription</span>
              <span class="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </RouterLink>
            <RouterLink
              to="/login"
              class="group flex items-center justify-center bg-gray-light text-black px-6 py-3 text-sm font-medium rounded-md transition-all duration-300 hover:bg-gray-dark hover:text-white hover:shadow-lg hover:scale-105 w-full sm:w-auto"
            >
              <span>Espace sécurisé</span>
              <span class="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section
      ref="statsSection"
      class="py-12 md:py-16 bg-white border-b border-gray-dark/20 transition-all duration-700"
      :class="{
        'section-enter': statsVisible,
        'section-leave': !statsVisible,
      }"
    >
      <div class="container mx-auto px-4 md:px-8">
        <div v-if="lottieAnimations.stats" class="flex justify-center mb-8">
          <div class="w-64 h-64">
            <LottieAnimation
              :animation-url="lottieAnimations.stats"
              :height="256"
              :width="256"
              :speed="1"
              :loop="true"
              :auto-play="true"
              :visible="statsVisible"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(stat, index) in [
              { label: 'Avocats certifiés', value: stats.avocats, sublabel: 'Enregistrés sur la plateforme' },
              { label: 'Barreaux actifs', value: stats.barreaux, sublabel: 'Couverture nationale' },
              { label: 'Inscriptions validées', value: stats.demandes, sublabel: 'Demandes approuvées' },
            ]"
            :key="index"
            class="transition-all duration-500"
            :class="{
              'animate-fade-in-up': statsVisible,
              'opacity-0 translate-y-4': !statsVisible,
            }"
            :style="{ animationDelay: statsVisible ? `${index * 0.1}s` : '0s' }"
          >
            <StatCard :label="stat.label" :value="stat.value" :sublabel="stat.sublabel" />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section
      ref="featuresSection"
      class="py-12 md:py-16 bg-gray-light/30 border-b border-gray-dark/20 transition-all duration-700"
      :class="{
        'section-enter': featuresVisible,
        'section-leave': !featuresVisible,
      }"
    >
      <div class="container mx-auto px-4 md:px-8">
        <div
          class="text-center mb-12 transition-all duration-500"
          :class="{
            'animate-fade-in-up': featuresVisible,
            'opacity-0 translate-y-4': !featuresVisible,
          }"
        >
          <h2 class="text-3xl md:text-4xl font-bold text-gray-dark mb-4">Fonctionnalités principales</h2>
          <p class="text-gray-dark max-w-2xl mx-auto">
            Découvrez les outils puissants qui font de CURIA la référence en matière de gestion des barreaux.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="group border border-gray-dark/30 bg-white p-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:border-black hover:-translate-y-2 cursor-default"
            :class="{
              'animate-fade-in-up': featuresVisible,
              'opacity-0 translate-y-4': !featuresVisible,
            }"
            :style="{ animationDelay: featuresVisible ? `${index * 0.1}s` : '0s' }"
          >
            <div class="w-20 h-20 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
              <LottieAnimation
                v-if="feature.lottieUrl"
                :animation-url="feature.lottieUrl"
                :height="80"
                :width="80"
                :speed="1"
                :loop="true"
                :auto-play="true"
                :visible="featuresVisible"
              />
              <span v-else class="text-4xl">{{ feature.icon }}</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-dark mb-2 text-center group-hover:text-black transition-colors">
              {{ feature.title }}
            </h3>
            <p class="text-sm text-gray-dark leading-relaxed text-center">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section
      ref="benefitsSection"
      class="py-12 md:py-16 bg-white border-b border-gray-dark/20 transition-all duration-700"
      :class="{
        'section-enter': benefitsVisible,
        'section-leave': !benefitsVisible,
      }"
    >
      <div class="container mx-auto px-4 md:px-8">
        <div
          class="text-center mb-12 transition-all duration-500"
          :class="{
            'animate-fade-in-up': benefitsVisible,
            'opacity-0 translate-y-4': !benefitsVisible,
          }"
        >
          <h2 class="text-3xl md:text-4xl font-bold text-gray-dark mb-4">Pour qui ?</h2>
          <p class="text-gray-dark max-w-2xl mx-auto">
            CURIA s'adresse à tous les acteurs du système judiciaire avec des fonctionnalités adaptées à chaque rôle.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(benefit, index) in benefits"
            :key="index"
            class="group border-2 p-6 rounded-lg transition-all duration-300 hover:shadow-2xl hover:border-black hover:-translate-y-2 bg-white"
            :class="[
              benefit.color,
              {
                'animate-fade-in-up': benefitsVisible,
                'opacity-0 translate-y-4': !benefitsVisible,
              },
            ]"
            :style="{ animationDelay: benefitsVisible ? `${index * 0.15}s` : '0s' }"
          >
            <div class="w-24 h-24 mb-4 mx-auto flex items-center justify-center">
              <LottieAnimation
                v-if="(index === 0 ? lottieAnimations.benefit1 : index === 1 ? lottieAnimations.benefit2 : lottieAnimations.benefit3)"
                :animation-url="index === 0 ? lottieAnimations.benefit1 : index === 1 ? lottieAnimations.benefit2 : lottieAnimations.benefit3"
                :height="96"
                :width="96"
                :speed="1"
                :loop="true"
                :auto-play="true"
                :visible="benefitsVisible"
              />
            </div>
            <p class="text-xs uppercase tracking-wide text-gray-dark font-medium mb-2 text-center">{{ benefit.category }}</p>
            <h3 class="text-xl font-semibold text-gray-dark mb-3 text-center group-hover:text-black transition-colors">
              {{ benefit.title }}
            </h3>
            <p class="text-sm text-gray-dark leading-relaxed text-center">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      ref="ctaSection"
      class="py-12 md:py-16 bg-black text-white transition-all duration-700"
      :class="{
        'section-enter': ctaVisible,
        'section-leave': !ctaVisible,
      }"
    >
      <div class="container mx-auto px-4 md:px-8 text-center">
        <div
          class="transition-all duration-500"
          :class="{
            'animate-fade-in-up': ctaVisible,
            'opacity-0 translate-y-4': !ctaVisible,
          }"
        >
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Prêt à commencer ?</h2>
          <p class="text-gray-300 max-w-2xl mx-auto mb-8">
            Rejoignez la plateforme CURIA et bénéficiez d'un système moderne de gestion des barreaux.
          </p>
        </div>
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center transition-all duration-500"
          :class="{
            'animate-fade-in-up': ctaVisible,
            'opacity-0 translate-y-4': !ctaVisible,
          }"
          :style="{ animationDelay: ctaVisible ? '0.2s' : '0s' }"
        >
          <RouterLink
            to="/request"
            class="bg-white text-black px-6 py-3 text-sm font-medium rounded-md transition-all duration-300 hover:bg-gray-light hover:shadow-lg hover:scale-105"
          >
            Faire une demande
          </RouterLink>
          <RouterLink
            to="/verify"
            class="border-2 border-white text-white px-6 py-3 text-sm font-medium rounded-md transition-all duration-300 hover:bg-white hover:text-black hover:shadow-lg hover:scale-105"
          >
            Vérifier un avocat
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-out-down {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(30px);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.7s ease-out forwards;
  opacity: 0;
}

.section-enter {
  animation: fade-in 0.5s ease-out;
}

.section-leave {
  animation: fade-out-down 0.5s ease-out forwards;
}

/* Smooth transitions pour les éléments enfants */
.section-enter .animate-fade-in-up {
  animation: fade-in-up 0.7s ease-out forwards;
}

.section-leave .animate-fade-in-up {
  animation: fade-out-down 0.5s ease-out forwards;
}
</style>
