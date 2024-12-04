<template>
  <PreloaderLayout :is-loading="doctorStore.isFetching">
    <Table />
  </PreloaderLayout>
</template>

<script setup lang="ts">
import { Table } from '@/widgets/doctor-table';

import { PreloaderLayout } from '@/shared/ui/preloader-layout';

import { useDoctorStore } from '@/entities/doctor';

const doctorStore = useDoctorStore();

doctorStore.fetchAll();
</script>
