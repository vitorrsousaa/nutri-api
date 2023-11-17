import * as z from 'zod';

import { GenderEnum } from '../entities/TGender';

export const UpdatePatientSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail format' }),
  name: z.string(),
  height: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  birthDate: z
    .string()
    .pipe(z.coerce.date())
    .refine((date) => date <= new Date(), {
      message: 'Birth date cannot be in the future',
    })
    .optional(),
  gender: GenderEnum.optional(),
});

export type IUpdatePatientDTO = z.infer<typeof UpdatePatientSchema>;
