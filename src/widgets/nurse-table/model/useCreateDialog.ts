import { ref } from 'vue';

import { Types } from '@/entities/nurse';

import { EPersonModalType } from '@/types';

export const useCreateDialog = (getStub: () => Types.IStub) => {
  const editableNurse = ref<Types.IStub | Types.INurse | null>(null);
  const isOpenModal = ref(false);

  const open = (selectedDoctor: Types.INurse | null, type: EPersonModalType) => {
    if (type === EPersonModalType.create) {
      editableNurse.value = getStub();
    } else if (selectedDoctor) {
      editableNurse.value = { ...selectedDoctor };
    }

    isOpenModal.value = true;
  };

  const close = () => {
    isOpenModal.value = false;
    editableNurse.value = null;
  };

  return { editableNurse, isOpenModal, open, close };
};
