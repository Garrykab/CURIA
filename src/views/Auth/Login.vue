<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth.store';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const email = ref('');
const password = ref('');
const error = ref('');

const destinations = {
  super_admin: '/super/dashboard',
  admin_barreau: '/barreau/dashboard',
  avocat: '/avocat/profil',
};

const submit = () => {
  error.value = '';
  const result = auth.login(email.value, password.value);
  if (!result.success) {
    error.value = result.message;
    password.value = '';
    return;
  }
  const redirect = route.query.redirect || destinations[auth.userRole] || '/';
  router.push(redirect);
};

const fillForm = (userEmail, userPassword) => {
  email.value = userEmail;
  password.value = userPassword;
  error.value = '';
};
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center">
    <section class="w-full max-w-md border border-gray-dark/20 bg-white p-6 flex flex-col gap-4 shadow-sm rounded-md">
      <div class="flex items-center justify-center flex-col">
        <h2 class="text-2xl font-semibold">Connexion sécurisée</h2>
        <p class="text-sm text-gray-dark">Connectez-vous à votre espace personnel.</p>
      </div>
      <p v-if="error" class="flex items-center justify-center text-sm text-red-500 bg-red-50 p-2 rounded-md w-full">{{ error }}</p>
      <label class="flex flex-col text-sm gap-2">
        Email
        <input
          v-model="email"
          type="email"
          class="border border-gray-dark/40 px-3 py-2 rounded-md"
          :class="{ 'border-red-500': error }"
          placeholder="ex: super@barreau.test"
          required
        />
      </label>
      <label class="flex flex-col text-sm gap-2">
        Mot de passe
        <input
          v-model="password"
          type="password"
          class="border border-gray-dark/40 px-3 py-2 rounded-md"
          placeholder="123456"
          required
        />
      </label>
      <button class="bg-black text-white px-4 py-2 rounded-md" @click="submit">Se connecter</button>
      <div class="text-xs text-gray-dark border-t border-gray-dark/20 pt-3">
        <p class="mb-2 font-medium">Utilisateurs mock :</p>
        <ul class="space-y-1">
          <li
            class="cursor-pointer hover:bg-gray-light px-2 py-1 rounded-md transition-colors border border-transparent hover:border-gray-dark/20"
            @click="fillForm('super@barreau.test', '123456')"
          >
            <span class="font-medium">super@barreau.test</span> / 123456
          </li>
          <li
            class="cursor-pointer hover:bg-gray-light px-2 py-1 rounded-md transition-colors border border-transparent hover:border-gray-dark/20"
            @click="fillForm('admin@kin.test', '123456')"
          >
            <span class="font-medium">admin@kin.test</span> / 123456
          </li>
          <li
            class="cursor-pointer hover:bg-gray-light px-2 py-1 rounded-md transition-colors border border-transparent hover:border-gray-dark/20"
            @click="fillForm('avocat@test.com', '123456')"
          >
            <span class="font-medium">avocat@test.com</span> / 123456
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

