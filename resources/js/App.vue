<script setup>
import { watch } from 'vue';
import { isAuthenticated } from './helpers/auth'
import router from './plugins/router';

watch(router.currentRoute, (to) => {
  // Redirect to login if not authenticated
  if (!isAuthenticated() && to.name !== 'Login') {
    router.push({ name: 'Login' });
  }

  if (isAuthenticated() && to.name === 'Login') {
    // Redirect to dashboard if authenticated and trying to access login
    router.push({ name: 'Dashboard' });
  }
});
</script>


<template>
  <div>
    <nav>
      <router-link to="/">Login</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/talent-type">Talent Type</router-link> |
    </nav>
    <hr />
    <!-- router-view untuk menampilkan page -->
    <router-view />
  </div>
</template>
