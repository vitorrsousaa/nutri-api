import { Request, Response } from 'express';

import { DataBaseIdSchema } from '../../../shared/entities/TUuid';
import returnErrorMissingField from '../../../shared/utils/returnErrorMissingField';
import { CreatePatientSchema } from '../dtos/create-patient-dto';
import { UpdatePatientSchema } from '../dtos/update-patient-dto';
import { ICreatePatientService } from '../services/Create';
import DeletePatient from '../services/Delete';
import FindAllPatient from '../services/FindAll';
import FindByPatientId from '../services/FindByUserId';
import { IUpdateService } from '../services/Update';

class PatientController {
  constructor(
    private readonly createService: ICreatePatientService,
    private readonly findByPatientIdService: FindByPatientId,
    private readonly findAllService: FindAllPatient,
    private readonly deleteService: DeletePatient,
    private readonly updateService: IUpdateService
  ) {}

  create = async (request: Request, response: Response) => {
    const result = returnErrorMissingField(CreatePatientSchema, request.body);

    const { birthDate, email, gender, height, name, weight } = result;

    const create = await this.createService.execute({
      createPatientDTO: { birthDate, email, gender, height, name, weight },
      userId: request.metadata.accountId,
    });

    return response.json(create);
  };

  findAll = async (request: Request, response: Response) => {
    const findAll = await this.findAllService.execute(
      request.metadata.accountId
    );

    return response.json(findAll);
  };

  findByUserId = async (request: Request, response: Response) => {
    const { params, metadata } = request;

    const patient = returnErrorMissingField(DataBaseIdSchema, params);

    const findByUserId = await this.findByPatientIdService.execute(
      metadata.accountId,
      patient.id
    );

    return response.json(findByUserId);
  };

  delete = async (request: Request, response: Response) => {
    const { metadata, params } = request;

    const patient = returnErrorMissingField(DataBaseIdSchema, params);

    await this.deleteService.execute(metadata.accountId, patient.id);

    return response.sendStatus(204);
  };

  update = async (request: Request, response: Response) => {
    const { metadata, params, body } = request;

    const patient = returnErrorMissingField(DataBaseIdSchema, params);

    const updateDTO = returnErrorMissingField(UpdatePatientSchema, body);

    const update = await this.updateService.execute({
      patient: updateDTO,
      userId: metadata.accountId,
      patientId: patient.id,
    });

    return response.json(update);
  };
}

export default PatientController;
