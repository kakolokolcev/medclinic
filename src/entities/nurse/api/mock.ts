import { surgicalDepartment, cardiologyDepartment } from '@/entities/department/shared';

import { Types } from '../model';

export const nurses: Types.INurse[] = [
  {
    id: 1,
    name: 'Любовь',
    middlename: 'Михайловна',
    surname: 'Скрябина',
    department: surgicalDepartment,
  },
  {
    id: 2,
    name: 'Маргарита',
    middlename: 'Павловна',
    surname: 'Королева',
    department: cardiologyDepartment,
  },
];
