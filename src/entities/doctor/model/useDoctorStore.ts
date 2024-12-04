import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useDoctorApi } from '../api';

import type { IDoctor, ICreateDoctor, IStub } from './types';

export const useDoctorStore = defineStore('doctor', () => {
  const api = useDoctorApi();

  const doctors = ref<IDoctor[]>([]);
  const isFetching = ref(false);
  const isSaving = ref(false);
  const isRemoving = ref(false);

  const getStub = (): IStub => ({
    name: '',
    surname: '',
    middlename: '',
    isSupervisor: false,
    department: null,
  });

  const fetchAll = async () => {
    isFetching.value = true;

    doctors.value = await api.fetchAll();

    isFetching.value = false;
  };

  const update = async (doctor: IDoctor) => {
    isSaving.value = true;

    const { data } = await api.update(doctor);

    isSaving.value = false;

    const updatedDoctor = doctors.value.findIndex(({ id }) => id == doctor.id);

    if (updatedDoctor !== -1) {
      doctors.value[updatedDoctor] = { ...doctors.value[updatedDoctor], ...data };
    }
  };

  const create = async (doctor: ICreateDoctor) => {
    isSaving.value = true;

    const { data } = await api.create(doctor);

    isSaving.value = false;

    doctors.value.push(data);
  };

  const remove = async (doctorId: number) => {
    isRemoving.value = true;

    await api.remove(doctorId);

    isRemoving.value = false;

    doctors.value = doctors.value.filter(({ id }) => id !== doctorId);
  };

  return { isSaving, isFetching, isRemoving, doctors, fetchAll, update, remove, create, getStub };
});
