<template>
  <button
    class="px-4 py-1 font-bold rounded-full border hover:text-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2"
    :class="props.color"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { Colors } from '@/types/ui/colors'

interface Props {
  color?: Colors
}

const props = withDefaults(defineProps<Props>(), {
  color: Colors.Default
})
</script>
