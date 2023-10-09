import { Request, Response } from 'express';

import returnErrorMissingField from '../../../shared/utils/returnErrorMissingField';
import CreatePatient from '../services/Create';

class PatientController {
  constructor(private readonly createService: CreatePatient) {
    this.create = this.create.bind(this);
  }

  async create(request: Request, response: Response) {
    returnErrorMissingField(request.body, [
      'birthDate',
      'email',
      'gender',
      'height',
      'name',
      'weight',
    ]);

    const { birthDate, email, gender, height, name, weight } = request.body;

    const create = await this.createService.execute(
      { birthDate, email, gender, height, name, weight },
      'dcaba1e5-f50b-4f74-be6f-d9cae320d760'
    );

    return response.json(create);
  }
}

export default PatientController;
