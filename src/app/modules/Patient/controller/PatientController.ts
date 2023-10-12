import { Request, Response } from 'express';

import returnErrorMissingField from '../../../shared/utils/returnErrorMissingField';
import { CreatePatientSchema } from '../dtos/create-patient-dto';
import CreatePatient from '../services/Create';

class PatientController {
  constructor(private readonly createService: CreatePatient) {
    this.create = this.create.bind(this);
  }

  async create(request: Request, response: Response) {
    const result = returnErrorMissingField(CreatePatientSchema, request.body);

    const { birthDate, email, gender, height, name, weight } = result;

    const create = await this.createService.execute(
      { birthDate, email, gender, height, name, weight },
      request.user.id
    );

    return response.json(create);
  }
}

export default PatientController;
