import prisma from '../../../shared/database/prisma';
import PatientController, { optionsController } from '../controller';
import PatientRepositories from '../repositories/patient/PatientRepositories';
import CreatePatientService from '../services/Create';

class PatientModule {
  private controller: PatientController;
  constructor() {
    this.controller = new PatientController(
      new CreatePatientService(new PatientRepositories(prisma))
    );
  }

  getController(controller: optionsController) {
    return this.controller[controller];
  }
}

export default new PatientModule();
