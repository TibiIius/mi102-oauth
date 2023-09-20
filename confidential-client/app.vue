<template>
  <div>
    <button @click="signIn('keycloak')">Login</button>
    <br />
    <button @click="signOut()">Logout</button>
  </div>
</template>

<script setup lang="ts">
const { signIn, signOut, getSession } = useAuth();

const headers = useRequestHeaders(["cookie"]) as HeadersInit;

const data = await useFetch("/api/todo", { headers });
</script>
