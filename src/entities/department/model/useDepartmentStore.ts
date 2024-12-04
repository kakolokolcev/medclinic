import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useDepartmentApi } from '../api';

import type { IDepartment } from './types';

export const useDepartmentStore = defineStore('department', () => {
  const api = useDepartmentApi();

  const departments = ref<IDepartment[]>([]);

  const fetchAll = async () => {
    departments.value = await api.fetchAll();
  };

  return { departments, fetchAll };
});
