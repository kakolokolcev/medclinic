<template>
  <div
    v-if="isLoading"
    class="flex items-center flex-auto"
  >
    <ProgressSpinner />
  </div>

  <slot v-else />
</template>

<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';

defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>
