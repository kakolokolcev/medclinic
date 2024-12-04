import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useNurseApi } from '../api';

import type { INurse, ICreateNurse, IStub } from './types';

export const useNurseStore = defineStore('nurse', () => {
  const api = useNurseApi();

  const nurses = ref<INurse[]>([]);
  const isFetching = ref(false);
  const isSaving = ref(false);
  const isRemoving = ref(false);

  const getStub = (): IStub => ({
    name: '',
    surname: '',
    middlename: '',
    department: null,
  });

  const fetchAll = async () => {
    isFetching.value = true;

    nurses.value = await api.fetchAll();

    isFetching.value = false;
  };

  const update = async (doctor: INurse) => {
    isSaving.value = true;

    const { data } = await api.update(doctor);

    isSaving.value = false;

    const updatedDoctor = nurses.value.findIndex(({ id }) => id == doctor.id);

    if (updatedDoctor !== -1) {
      nurses.value[updatedDoctor] = { ...nurses.value[updatedDoctor], ...data };
    }
  };

  const create = async (doctor: ICreateNurse) => {
    isSaving.value = true;

    const { data } = await api.create(doctor);

    isSaving.value = false;

    nurses.value.push(data);
  };

  const remove = async (doctorId: number) => {
    isRemoving.value = true;

    await api.remove(doctorId);

    isRemoving.value = false;

    nurses.value = nurses.value.filter(({ id }) => id !== doctorId);
  };

  return { isSaving, isFetching, isRemoving, nurses, fetchAll, update, remove, create, getStub };
});
