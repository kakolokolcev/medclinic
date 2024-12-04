<template>
  <div class="flex items-center gap-[6px]">
    <InputGroup>
      <InputGroupAddon>
        <MultiSelect
          v-model="selectedSearchFields"
          :options="searchedColumns"
          optionLabel="header"
          placeholder="По каким столбцам искать"
        />
      </InputGroupAddon>

      <InputText
        v-model="searchValue"
        placeholder="Введите для поиска"
      />
    </InputGroup>

    <Button
      icon="pi pi-trash"
      class="flex-shrink-0"
      :loading="isRemoveLoading"
      :disabled="!haveSelected"
      @click="$emit('remove')"
    />
    <Button
      icon="pi pi-user-edit"
      class="flex-shrink-0"
      :disabled="!haveSelected"
      @click="$emit('edit')"
    />
    <Button
      icon="pi pi-user-plus"
      class="flex-shrink-0"
      @click="$emit('create')"
    />
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';

import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

interface IOption {
  header: string;
}

defineProps({
  searchedColumns: {
    type: Array as PropType<IOption[]>,
    default: () => [],
  },
  haveSelected: {
    type: Boolean,
    default: false,
  },
  isRemoveLoading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['remove', 'edit', 'create']);

const selectedSearchFields = defineModel('selected-search-fields');
const searchValue = defineModel<string>('search-value');
</script>

<style scoped>
:deep(.p-multiselect-label-container) {
  display: none;
}

:deep(.p-multiselect-dropdown) {
  height: 100%;
  width: 40px;
  box-sizing: border-box;
}

:deep(.p-multiselect) {
  height: 100%;
  border: none;
  box-sizing: border-box;
}
</style>
