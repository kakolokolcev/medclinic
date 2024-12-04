import { nurses } from './mock';
import type { Types } from '../model';

import { PROMISE_TIMEOUT } from '@/constants';

export const useNurseApi = () => {
  const fetchAll = (): Promise<Types.INurse[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(nurses), PROMISE_TIMEOUT));
  };

  const update = (nurse: Types.INurse): Promise<{ data: Types.INurse }> => {
    return new Promise<{ data: Types.INurse }>((resolve) =>
      setTimeout(() => resolve({ data: nurse as Types.INurse }), PROMISE_TIMEOUT),
    );
  };

  const create = (doctor: Types.ICreateNurse): Promise<{ data: Types.INurse }> => {
    const newId = Math.max(...nurses.map(({ id }) => id)) + 1;

    return new Promise<{ data: Types.INurse }>((resolve) =>
      setTimeout(() => resolve({ data: { id: newId, ...doctor } }), PROMISE_TIMEOUT),
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const remove = (id: number) => {
    return new Promise((resolve) => setTimeout(() => resolve(true), PROMISE_TIMEOUT));
  };

  return { fetchAll, create, remove, update };
};
