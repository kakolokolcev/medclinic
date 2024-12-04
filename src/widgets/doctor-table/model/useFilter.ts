import { ref, type Ref, computed } from 'vue';

import type { Types } from '@/entities/doctor';

import { COLUMNS } from './constants';
import { EColumnsId } from './types';

const isAvailable = (str: string, search: Ref<string>) =>
  str.toLowerCase().includes(search.value.toLowerCase());

export const useFilter = (doctors: Ref<Types.IDoctor[]>) => {
  const selectedSearchFields = ref(COLUMNS);
  const searchValue = ref('');

  const filteredDoctors = computed(() => {
    const searchedColumns = selectedSearchFields.value.map(({ id }) => id);

    return doctors.value.filter(
      (item) =>
        (searchedColumns.includes(EColumnsId.name) && isAvailable(item.name, searchValue)) ||
        (searchedColumns.includes(EColumnsId.middlename) &&
          isAvailable(item.middlename, searchValue)) ||
        (searchedColumns.includes(EColumnsId.surname) && isAvailable(item.surname, searchValue)) ||
        (searchedColumns.includes(EColumnsId.departmentName) &&
          isAvailable(item.department.name, searchValue)),
    );
  });

  return { selectedSearchFields, searchValue, filteredDoctors };
};
