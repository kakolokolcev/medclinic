import { departments } from './mock';
import type { Types } from '../model';

import { PROMISE_TIMEOUT } from '@/constants';

export const useDepartmentApi = () => {
  const fetchAll = (): Promise<Types.IDepartment[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(departments), PROMISE_TIMEOUT));
  };

  return { fetchAll };
};
