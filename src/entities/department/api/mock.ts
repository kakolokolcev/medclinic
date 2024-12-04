import { type IDepartment, EDepartments } from './../model/types';

export const departments: IDepartment[] = [
  {
    id: 1,
    name: 'Кардиология',
    type: EDepartments.cardiology,
  },
  {
    id: 2,
    name: 'Хирургия',
    type: EDepartments.surgical,
  },
];

export const cardiologyDepartment = departments[0];
export const surgicalDepartment = departments[1];
