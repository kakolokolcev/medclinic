<template>
  <div class="flex flex-col gap-[10px]">
    <TableHeader
      v-model:selected-search-fields="selectedSearchFields"
      v-model:search-value="searchValue"
      :searched-columns="COLUMNS"
      :have-selected="!!selectedNurse"
      :is-remove-loading="isRemoving"
      @remove="
        () => {
          if (selectedNurse) {
            remove(selectedNurse.id);
            resetSelecting();
          }
        }
      "
      @create="openDialog(selectedNurse, EPersonModalType.create)"
      @edit="openDialog(selectedNurse, EPersonModalType.edit)"
    />

    <DataTable
      v-model:selection="selectedNurse"
      :value="filteredNurses"
      selectionMode="single"
      tableStyle="min-width: 50rem"
    >
      <Column
        v-for="column in COLUMNS"
        :key="column.field"
        :field="column.field"
        :header="column.header"
      />
    </DataTable>

    <Dialog
      v-if="editableNurse && isOpenModal"
      v-model:visible="isOpenModal"
      modal
      header="Редактирование"
      :style="{ width: '100%', maxWidth: '800px' }"
      class="m-[20px]"
    >
      <PreloaderLayout :is-loading="isSaving">
        <PersonForm
          :person="editableNurse"
          :departments="departments"
          @save="(nurse: Types.ICreateNurse | Types.INurse) => save(nurse)"
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

import { useNurseStore, Types } from '@/entities/nurse';
import { useDepartmentStore } from '@/entities/department';

import { TableHeader } from '@/shared/ui/table-header';
import { PersonForm } from '@/shared/ui/person-form';
import { PreloaderLayout } from '@/shared/ui/preloader-layout';

import { useFilter, useCreateDialog, COLUMNS } from '../model';

import { EPersonModalType } from '@/types';

const selectedNurse = ref<Types.INurse | null>(null);

const nurseStore = useNurseStore();
const { nurses, isSaving, isRemoving } = storeToRefs(nurseStore);
const { create, update, remove, getStub } = nurseStore;

const { departments } = storeToRefs(useDepartmentStore());

const {
  editableNurse,
  isOpenModal,
  open: openDialog,
  close: closeDialog,
} = useCreateDialog(getStub);

const { searchValue, selectedSearchFields, filteredNurses } = useFilter(nurses);

const resetSelecting = () => {
  selectedNurse.value = null;
};

const save = async (nurse: Types.ICreateNurse | Types.INurse) => {
  await (Types.isNurseWithId(nurse) ? update(nurse) : create(nurse));

  resetSelecting();
  closeDialog();
};
</script>
