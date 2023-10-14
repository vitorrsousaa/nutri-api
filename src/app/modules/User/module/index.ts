import prisma from '../../../shared/database/prisma';
import UserRepositories from '../../../shared/database/repositories/user';
import UserController, { optionsController } from '../controller';
import RecoverUserService from '../service/Recover';

class UserModule {
  private controller: UserController;

  constructor() {
    this.controller = new UserController(
      new RecoverUserService(new UserRepositories(prisma))
    );
  }

  getController(controller: optionsController) {
    return this.controller[controller];
  }
}

export default new UserModule();
