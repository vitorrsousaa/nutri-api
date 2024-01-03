import prisma from '../../../shared/database/prisma';
import PatientRepositories from '../../../shared/database/repositories/patient';
import PlanningMealRepositores from '../../../shared/database/repositories/planningMeal';
import ValidatePatientHasPlanning from '../../../shared/services/ValidatePatientHasPlanning';
import ValidatePatientOwnershipService from '../../../shared/services/ValidatePatientOwnership';
import PlanningMealController, { optionsController } from '../controller';
import CreatePlanningMealService from '../services/CreatePlanningMeal';
import DeletePlanningMealService from '../services/DeletePlanningMeal';

const patientRepositoriesInstance = new PatientRepositories(prisma);

const planningMealRepositoresInstance = new PlanningMealRepositores(prisma);

const validatePatientOwnershipServiceInstance =
  new ValidatePatientOwnershipService(patientRepositoriesInstance);

class PlanningMealModule {
  private controller: PlanningMealController;

  constructor() {
    this.controller = new PlanningMealController(
      new CreatePlanningMealService(
        planningMealRepositoresInstance,
        validatePatientOwnershipServiceInstance,
        new ValidatePatientHasPlanning(planningMealRepositoresInstance)
      ),
      new DeletePlanningMealService(
        planningMealRepositoresInstance,
        validatePatientOwnershipServiceInstance
      )
    );
  }

  getController(controller: optionsController) {
    return this.controller[controller];
  }
}

export default new PlanningMealModule();
