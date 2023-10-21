import { Request, Response } from 'express';

import returnErrorMissingField from '../../../shared/utils/returnErrorMissingField';
import { CreatePatientSchema } from '../dtos/create-patient-dto';
import CreatePatient from '../services/Create';
import DeletePatient from '../services/Delete';
import FindAllPatient from '../services/FindAll';

class PatientController {
  constructor(
    private readonly createService: CreatePatient,
    private readonly findAllService: FindAllPatient,
    private readonly deleteService: DeletePatient
  ) {
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.delete = this.delete.bind(this);
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

  async findAll(request: Request, response: Response) {
    const findAll = await this.findAllService.execute(request.user.id);

    return response.json(findAll);
  }

  async delete(request: Request, response: Response) {
    const { user } = request;

    const { params } = request;

    await this.deleteService.execute(user.id, params.id);

    return response.sendStatus(204);
  }
}

export default PatientController;
