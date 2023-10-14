import { Request, Response } from 'express';

import RecoverUserService from '../service/Recover';

class UserController {
  constructor(private readonly recoverService: RecoverUserService) {
    this.recover = this.recover.bind(this);
  }

  async recover(request: Request, response: Response) {
    const recover = await this.recoverService.execute(request.user.id);
    return response.json(recover);
  }
}

export default UserController;
