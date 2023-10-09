import prisma from '../../../shared/database/prisma';
import UserRepositories from '../../../shared/database/repositories/user';
import AuthController, { optionsController } from '../controller';
import { Crypt } from '../providers/crypt';
import SignIn from '../services/SignIn';
import SignUp from '../services/SignUp';

const userRepositoriesInstance = new UserRepositories(prisma);

class AuthModule {
  private controller: AuthController;
  constructor() {
    this.controller = new AuthController(
      new SignUp(userRepositoriesInstance, Crypt),
      new SignIn(userRepositoriesInstance, Crypt)
    );
  }

  getController(controller: optionsController) {
    return this.controller[controller];
  }
}

export default new AuthModule();
