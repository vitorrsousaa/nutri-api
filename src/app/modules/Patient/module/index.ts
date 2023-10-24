import prisma from '../../../shared/database/prisma';
import PatientController, { optionsController } from '../controller';
import PatientRepositories from '../repositories/patient/PatientRepositories';
import CreatePatientService from '../services/Create';
import DeleteService from '../services/Delete';
import FindAllPatientService from '../services/FindAll';
import FindByPatientId from '../services/FindByUserId';
import ValidatePatientOwnershipService from '../services/ValidatePatientOwnership';

const patientRepositoriesInstance = new PatientRepositories(prisma);

const validateOwnershipServiceInstance = new ValidatePatientOwnershipService(
  patientRepositoriesInstance
);

class PatientModule {
  private controller: PatientController;
  constructor() {
    this.controller = new PatientController(
      new CreatePatientService(patientRepositoriesInstance),
      new FindByPatientId(
        patientRepositoriesInstance,
        validateOwnershipServiceInstance
      ),
      new FindAllPatientService(patientRepositoriesInstance),
      new DeleteService(
        patientRepositoriesInstance,
        validateOwnershipServiceInstance
      )
    );
  }

  getController(controller: optionsController) {
    return this.controller[controller];
  }
}

export default new PatientModule();
