export enum EDepartments {
  cardiology = 'cardiology',
  surgical = 'surgical',
}

export interface IDepartment {
  id: number;
  name: string;
  type: EDepartments;
}
