<template>
  <div class="flex flex-col gap-[10px]">
    <TableHeader
      v-model:selected-search-fields="selectedSearchFields"
      v-model:search-value="searchValue"
      :searched-columns="COLUMNS"
      :have-selected="!!selectedDoctor"
      :is-remove-loading="isRemoving"
      @remove="
        () => {
          if (selectedDoctor) {
            remove(selectedDoctor.id);
            resetSelecting();
          }
        }
      "
      @create="openDialog(selectedDoctor, EPersonModalType.create)"
      @edit="openDialog(selectedDoctor, EPersonModalType.edit)"
    />

    <DataTable
      v-model:selection="selectedDoctor"
      :value="filteredDoctors"
      selectionMode="single"
      tableStyle="min-width: 50rem"
    >
      <Column
        v-for="column in COLUMNS"
        :key="column.field"
        :field="column.field"
        :header="column.header"
      />

      <Column
        field="isSupervisor"
        header="Заведующий"
      >
        <template #body="{ data: { isSupervisor } }">
          <i :class="`pi ${isSupervisor ? 'pi-check' : 'pi-times'}`" />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-if="editableDoctor && isOpenModal"
      v-model:visible="isOpenModal"
      modal
      header="Редактирование"
      :style="{ width: '100%', maxWidth: '800px' }"
      class="m-[20px]"
    >
      <PreloaderLayout :is-loading="isSaving">
        <Form
          :doctor="editableDoctor"
          :departments="departments"
          @save="save"
          @close="closeDialog"
        />
      </PreloaderLayout>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';

import { useDoctorStore, Types, Form } from '@/entities/doctor';
import { useDepartmentStore } from '@/entities/department';

import { TableHeader } from '@/shared/ui/table-header';

import { PreloaderLayout } from '@/shared/ui/preloader-layout';

import { useFilter, useCreateDialog, COLUMNS } from '../model';

import { EPersonModalType } from '@/types';

const selectedDoctor = ref<Types.IDoctor | null>(null);

const doctorStore = useDoctorStore();
const { doctors, isSaving, isRemoving } = storeToRefs(doctorStore);
const { create, update, remove, getStub } = doctorStore;

const { departments } = storeToRefs(useDepartmentStore());

const {
  editableDoctor,
  isOpenModal,
  open: openDialog,
  close: closeDialog,
} = useCreateDialog(getStub);

const { searchValue, selectedSearchFields, filteredDoctors } = useFilter(doctors);

const resetSelecting = () => {
  selectedDoctor.value = null;
};

const save = async (doctor: Types.ICreateDoctor | Types.IDoctor) => {
  await (Types.isDoctorWithId(doctor) ? update(doctor) : create(doctor));

  resetSelecting();
  closeDialog();
};
</script>
