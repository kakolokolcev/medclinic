import { doctors } from './mock';
import type { Types } from '../model';
import type { IDoctor } from '../model/types';

import { PROMISE_TIMEOUT } from '@/constants';

export const useDoctorApi = () => {
  const fetchAll = (): Promise<Types.IDoctor[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(doctors), PROMISE_TIMEOUT));
  };

  const update = (doctor: IDoctor): Promise<{ data: Types.IDoctor }> => {
    return new Promise<{ data: Types.IDoctor }>((resolve) =>
      setTimeout(() => resolve({ data: doctor as Types.IDoctor }), PROMISE_TIMEOUT),
    );
  };

  const create = (doctor: Types.ICreateDoctor): Promise<{ data: Types.IDoctor }> => {
    const newId = Math.max(...doctors.map(({ id }) => id)) + 1;

    return new Promise<{ data: Types.IDoctor }>((resolve) =>
      setTimeout(() => resolve({ data: { id: newId, ...doctor } }), PROMISE_TIMEOUT),
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const remove = (id: number) => {
    return new Promise((resolve) => setTimeout(() => resolve(true), PROMISE_TIMEOUT));
  };

  return { fetchAll, create, remove, update };
};
