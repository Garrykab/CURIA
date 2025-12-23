<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import NotificationContainer from './components/NotificationContainer.vue';
import SplashScreen from './components/SplashScreen.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-light text-black">
    <SplashScreen />
    <Navbar />
    <main class="max-w-6xl mx-auto px-4 py-8">
      <RouterView />
    </main>
    <NotificationContainer />
  </div>
</template>
