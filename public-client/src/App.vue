<script setup lang="ts">
import { keycloak as keycloakInject } from '@/plugins/keycloak'
import { Colors } from '@/types/ui/colors'
import { inject, ref } from 'vue'
import ButtonMain from './components/ButtonMain.vue'

const keycloak = inject(keycloakInject)!
const newTodoText = ref('')
const todos = ref<Array<string>>([])

function addTodo() {
  try {
    todos.value.push(newTodoText.value)
  } catch (error) {
  } finally {
    newTodoText.value = ''
  }
}

function removeTodo(todo: string) {
  todos.value = todos.value.filter((t) => t != todo)
}
</script>

<template>
  <main class="h-screen flex justify-center items-center">
    <div class="flex flex-col" v-if="!keycloak.authenticated">
      <p class="pb-2">You need to be logged in to use this app.</p>
      <button-main @click="$keycloak.login">Login</button-main>
    </div>
    <div v-else class="container border-2 p-4">
      <div class="flex justify-between items-center">
        <h1 class="ml-2 my-2 text-center underline text-4xl">
          {{ $keycloak.idTokenParsed ? $keycloak.idTokenParsed.given_name + "'s" : '' }} Todos
        </h1>
        <button-main @click="$keycloak.logout" :color="Colors.Error">Logout</button-main>
      </div>
      <div class="flex mt-4">
        <input
          class="placeholder:italic placeholder:text-slate-400 w-full border border-slate-300 rounded-full py-2 pl-9 pr-3 mr-4 sm:text-sm focus:border-teal-500"
          placeholder="New Todo..."
          type="text"
          name="search"
          v-model="newTodoText"
        />
        <button-main @click="addTodo">+</button-main>
      </div>
      <div class="mt-4 flex flex-row items-center border-t pt-2" v-for="todo in todos">
        <div class="w-full pl-2">{{ todo }}</div>
        <button-main @click="removeTodo(todo)" :color="Colors.Error">-</button-main>
      </div>
    </div>
  </main>
</template>
