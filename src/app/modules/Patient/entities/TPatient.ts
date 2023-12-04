import * as z from 'zod';

import { GenderEnum } from './TGender';
import { StatusEnum } from './TStatus';

export const PatientSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail format' }),
  name: z.string(),
  height: z.number().positive().nullable(),
  weight: z.number().positive().nullable(),
  birthDate: z
    .string()
    .pipe(z.coerce.date())
    .refine((date) => date <= new Date(), {
      message: 'Birth date cannot be in the future',
    })
    .nullable(),
  gender: GenderEnum.nullable(),
  id: z.string().uuid(),
  userId: z.string().uuid(),
  status: StatusEnum.nullable(),
});

export type TPatient = z.infer<typeof PatientSchema>;
