<template>
  <div>
    <button @click="signIn('keycloak')">Test</button>
  </div>
</template>

<script setup lang="ts">
const { data, signIn } = useAuth();

console.log(data.value);
</script>
