import { type IDepartment } from '@/entities/department/shared';

export interface IDoctor {
  id: number;
  name: string;
  surname: string;
  middlename: string;
  department: IDepartment;
  isSupervisor: boolean;
}

export type ICreateDoctor = Omit<IDoctor, 'id'>;

export interface IStub extends Omit<IDoctor, 'id' | 'department'> {
  department: null;
}

export const isDoctorWithId = (doctor: ICreateDoctor | IDoctor): doctor is IDoctor => {
  return !!(doctor as IDoctor).id;
};
