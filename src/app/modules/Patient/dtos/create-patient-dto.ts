export type createPatientDTO = {
  email: string;
  name: string;
  height: number;
  weight: number;
  birthDate: Date;
  gender: Gender;
};

export enum Gender {
  MASC = 'MASC',
  FEM = 'FEM',
}
