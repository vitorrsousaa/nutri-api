import { z } from 'zod';

export const StatusEnum = z.enum(['ACTIVE', 'INACTIVE']);
