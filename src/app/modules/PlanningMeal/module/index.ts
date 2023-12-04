import prisma from '../../../shared/database/prisma';
import PatientRepositories from '../../../shared/database/repositories/patient';
import PlanningMealRepositories from '../../../shared/database/repositories/planningMeal';
import ValidatePatientHasPlanning from '../../../shared/services/ValidatePatientHasPlanning';
import ValidatePatientOwnershipService from '../../../shared/services/ValidatePatientOwnership';
import PlanningMealController, { optionsController } from '../controller';
import CreatePlanningMealService from '../services/CreatePlanningMeal';

class PlanningMealModule {
  private controller: PlanningMealController;

  constructor() {
    this.controller = new PlanningMealController(
      new CreatePlanningMealService(
        new PlanningMealRepositories(prisma),
        new ValidatePatientOwnershipService(new PatientRepositories(prisma)),
        new ValidatePatientHasPlanning(new PlanningMealRepositories(prisma))
      )
    );
  }

  getController(controller: optionsController) {
    return this.controller[controller];
  }
}

export default new PlanningMealModule();
