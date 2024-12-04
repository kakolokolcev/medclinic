import { ref } from 'vue';

import { Types } from '@/entities/doctor';

import { EPersonModalType } from '@/types';

export const useCreateDialog = (getStub: () => Types.IStub) => {
  const editableDoctor = ref<Types.IStub | Types.IDoctor | null>(null);
  const isOpenModal = ref(false);

  const open = (selectedDoctor: Types.IDoctor | null, type: EPersonModalType) => {
    if (type === EPersonModalType.create) {
      editableDoctor.value = getStub();
    } else if (selectedDoctor) {
      editableDoctor.value = { ...selectedDoctor };
    }

    isOpenModal.value = true;
  };

  const close = () => {
    isOpenModal.value = false;
    editableDoctor.value = null;
  };

  return { editableDoctor, isOpenModal, open, close };
};
