<template>
  <Header />

  <div class="app container m-auto flex flex-col h-full p-[20px]">
    <RouterView />
  </div>

  <div id="modal" />
</template>

<script setup lang="ts">
import { useDepartmentStore } from '@/entities/department';

import { Header } from '@/widgets/header';

const departmentStore = useDepartmentStore();

if (!departmentStore.departments.length) {
  departmentStore.fetchAll();
}
</script>

<style scoped></style>
