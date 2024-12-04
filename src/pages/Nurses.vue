<template>
  <PreloaderLayout :is-loading="nurseStore.isFetching">
    <Table />
  </PreloaderLayout>
</template>

<script setup lang="ts">
import { Table } from '@/widgets/nurse-table';

import { PreloaderLayout } from '@/shared/ui/preloader-layout';

import { useNurseStore } from '@/entities/nurse';

const nurseStore = useNurseStore();

nurseStore.fetchAll();
</script>
