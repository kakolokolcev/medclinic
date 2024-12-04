import { surgicalDepartment, cardiologyDepartment } from '@/entities/department/shared';

import { Types } from '../model';

export const doctors: Types.IDoctor[] = [
  {
    id: 1,
    name: 'Виктор',
    middlename: 'Иванович',
    surname: 'Павлов',
    department: surgicalDepartment,
    isSupervisor: false,
  },
  {
    id: 2,
    name: 'Андрей',
    middlename: 'Евгеньевич',
    surname: 'Быков',
    department: cardiologyDepartment,
    isSupervisor: true,
  },
  {
    id: 3,
    name: 'Иван',
    middlename: 'Натанович',
    surname: 'Купитман',
    department: surgicalDepartment,
    isSupervisor: true,
  },
];
