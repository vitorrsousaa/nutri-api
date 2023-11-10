import prisma from '../../../shared/database/prisma';
import PlanningMealRepositores from '../../../shared/database/repositories/planningMeal';
import ValidatePatientOwnershipService from '../../../shared/services/ValidatePatientOwnership';
import PatientRepositories from '../../Patient/repositories/patient/PatientRepositories';
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
