import prisma from '../../../shared/database/prisma';
import PatientRepositories from '../../../shared/database/repositories/patient';
import PlanningMealRepositores from '../../../shared/database/repositories/planningMeal';
import ValidatePatientOwnershipService from '../../../shared/services/ValidatePatientOwnership';
import PlanningMealController, { optionsController } from '../controller';
import CreatePlanningMealService from '../services/CreatePlanningMeal';

class PlanningMealModule {
  private controller: PlanningMealController;

  constructor() {
    this.controller = new PlanningMealController(
      new CreatePlanningMealService(
        new PlanningMealRepositores(prisma),
        new ValidatePatientOwnershipService(new PatientRepositories(prisma))
      )
    );
  }

  getController(controller: optionsController) {
    return this.controller[controller];
  }
}

export default new PlanningMealModule();
