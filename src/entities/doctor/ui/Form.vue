<template>
  <PersonForm
    :person="doctor"
    :departments="departments"
    @save="(person) => $emit('save', { ...person, isSupervisor })"
    @close="$emit('close')"
  >
    <div class="flex items-center gap-8 mb-8">
      <label
        for="department"
        class="font-semibold min-[768px]:w-[200px]"
      >
        Заведующий
      </label>

      <Checkbox
        v-model="isSupervisor"
        class="w-full md:w-56"
        binary
      />
    </div>
  </PersonForm>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { type PropType } from 'vue';

import { Types } from '../model';

import { PersonForm } from '@/shared/ui/person-form';

import { type IDepartment } from '@/entities/department/shared';

import Checkbox from 'primevue/checkbox';

const { doctor } = defineProps({
  doctor: {
    type: Object as PropType<Types.IStub | Types.IDoctor>,
    default: () => ({}),
  },
  departments: {
    type: Array as PropType<IDepartment[]>,
    default: () => [],
  },
});

const isSupervisor = ref(!!doctor.isSupervisor);

defineEmits<{
  (event: 'save', doctor: Types.ICreateDoctor | Types.IDoctor): void;
  (event: 'close'): void;
}>();
</script>
