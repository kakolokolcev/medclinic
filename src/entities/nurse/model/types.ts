import { type IDepartment } from '@/entities/department/shared';

export interface INurse {
  id: number;
  name: string;
  surname: string;
  middlename: string;
  department: IDepartment;
}

export type ICreateNurse = Omit<INurse, 'id'>;

export interface IStub extends Omit<INurse, 'id' | 'department'> {
  department: null;
}

export const isNurseWithId = (nurse: ICreateNurse | INurse): nurse is INurse => {
  return !!(nurse as INurse).id;
};
