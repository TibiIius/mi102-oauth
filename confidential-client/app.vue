<template>
  <div>
    <button @click="signIn('keycloak')">Login</button>
    <br />
    <button @click="signOut()">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { ERROR_REFRESH_TOKEN_INVALID } from "./common/globals";

const { signIn, signOut, getSession } = useAuth();

const session = await getSession();
const sessionError = (session as any).error;

if (sessionError === ERROR_REFRESH_TOKEN_INVALID) {
  await signIn("keycloak");
  console.log("refresh token invalid");
}

const headers = useRequestHeaders(["cookie"]) as HeadersInit;

try {
  const data = await useFetch("/api/todo", { headers });
} catch (error) {
  if (error === ERROR_REFRESH_TOKEN_INVALID) {
    await signOut();
  }
}
</script>
