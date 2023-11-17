import prisma from '../../../shared/database/prisma';
import PatientRepositories from '../../../shared/database/repositories/patient';
import ValidatePatientOwnershipService from '../../../shared/services/ValidatePatientOwnership';
import PatientController, { optionsController } from '../controller';
import CreatePatientService from '../services/Create';
import DeleteService from '../services/Delete';
import FindAllPatientService from '../services/FindAll';
import FindByPatientId from '../services/FindByUserId';

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
