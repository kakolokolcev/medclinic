import { EColumnsId } from './types';

export const COLUMNS = [
  { id: EColumnsId.name, header: 'Имя', field: 'name' },
  { id: EColumnsId.middlename, header: 'Отчество', field: 'middlename' },
  { id: EColumnsId.surname, header: 'Фамилия', field: 'surname' },
  { id: EColumnsId.departmentName, header: 'Отделение', field: 'department.name' },
];
