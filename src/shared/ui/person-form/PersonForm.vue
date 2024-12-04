<template>
  <div class="form-field">
    <label
      for="name"
      class="form-field-label"
    >
      Имя
    </label>

    <InputText
      id="name"
      class="flex-auto w-full"
      autocomplete="off"
      v-model="editedPerson.name"
    />
  </div>

  <div class="form-field">
    <label
      for="middlename"
      class="form-field-label"
    >
      Отчество
    </label>

    <InputText
      id="middlename"
      class="flex-auto w-full"
      autocomplete="off"
      v-model="editedPerson.middlename"
    />
  </div>

  <div class="form-field">
    <label
      for="surname"
      class="form-field-label"
    >
      Фамилия
    </label>

    <InputText
      id="surname"
      class="flex-auto w-full"
      autocomplete="off"
      v-model="editedPerson.surname"
    />
  </div>

  <div class="form-field">
    <label
      for="department"
      class="form-field-label"
    >
      Департамент
    </label>

    <Select
      v-model="editedPerson.department"
      :options="departments"
      optionLabel="name"
      placeholder="Выберите департамент"
      :invalid="wasClickedSave && !editedPerson.department"
      class="w-full"
    />
  </div>

  <slot />

  <div class="flex justify-end gap-2">
    <Button
      type="button"
      label="Cancel"
      severity="secondary"
      @click="$emit('close')"
    />
    <Button
      type="button"
      label="Save"
      @click="save"
    />
  </div>
</template>

<script setup lang="ts" generic="T extends { name: string }">
import { type PropType, ref, reactive, type UnwrapRef } from 'vue';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Select from 'primevue/select';

type IPerson = {
  name: string;
  surname: string;
  middlename: string;
  department: T | null;
};

type IPersonWithNullableDepartment = Omit<IPerson, 'department'> & {
  department: UnwrapRef<T> | null;
};
type IPersonWithDepartment = Omit<IPerson, 'department'> & { department: UnwrapRef<T> };

const isSelectDepartment = (
  person: IPersonWithNullableDepartment,
): person is IPersonWithDepartment => {
  return !!person.department;
};

const { person } = defineProps({
  person: {
    type: Object as PropType<IPerson>,
    default: () => ({}),
  },
  departments: {
    type: Array as PropType<T[]>,
    default: () => [],
  },
});

const emits = defineEmits<{
  (event: 'save', person: IPersonWithDepartment): void;
  (event: 'close'): void;
}>();

const editedPerson = reactive(person);

const wasClickedSave = ref(false);

const save = () => {
  wasClickedSave.value = true;

  if (!isSelectDepartment(editedPerson)) {
    return;
  }

  emits('save', editedPerson);
};
</script>
