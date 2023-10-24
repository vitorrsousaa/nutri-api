import { Request, Response } from 'express';

import { DataBaseIdSchema } from '../../../shared/entities/TUuid';
import returnErrorMissingField from '../../../shared/utils/returnErrorMissingField';
import { CreatePatientSchema } from '../dtos/create-patient-dto';
import CreatePatient from '../services/Create';
import DeletePatient from '../services/Delete';
import FindAllPatient from '../services/FindAll';
import FindByPatientId from '../services/FindByUserId';

class PatientController {
  constructor(
    private readonly createService: CreatePatient,
    private readonly findByPatientIdService: FindByPatientId,
    private readonly findAllService: FindAllPatient,
    private readonly deleteService: DeletePatient
  ) {
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.delete = this.delete.bind(this);
    this.findByUserId = this.findByUserId.bind(this);
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

  async findByUserId(request: Request, response: Response) {
    const { params, user } = request;

    const patient = returnErrorMissingField(DataBaseIdSchema, params);

    const findByUserId = await this.findByPatientIdService.execute(
      user.id,
      patient.id
    );

    return response.json(findByUserId);
  }

  async delete(request: Request, response: Response) {
    const { user, params } = request;

    const patient = returnErrorMissingField(DataBaseIdSchema, params);

    await this.deleteService.execute(user.id, patient.id);

    return response.sendStatus(204);
  }
}

export default PatientController;
