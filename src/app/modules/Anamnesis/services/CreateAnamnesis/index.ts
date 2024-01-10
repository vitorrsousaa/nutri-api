import {
  CreateAnamnesisSchema,
  CreateAnamnesisService,
  ICreateAnamnesisService,
  ICreateAnamnesisServiceInput,
  ICreateAnamnesisServiceOutput,
  TAnamnesisCreateDTO,
} from './CreateAnamnesis';

export type {
  TAnamnesisCreateDTO,
  ICreateAnamnesisService,
  ICreateAnamnesisServiceOutput,
  ICreateAnamnesisServiceInput,
};

export { CreateAnamnesisSchema };
export default CreateAnamnesisService;
