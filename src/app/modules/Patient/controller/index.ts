import PatientController from './PatientController';

export type optionsController =
  | 'create'
  | 'findAll'
  | 'delete'
  | 'findByUserId'
  | 'update';

export default PatientController;
