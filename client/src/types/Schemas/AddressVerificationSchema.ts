import { z } from 'zod';
import type { ZodType } from 'zod';

export const AddressSchema: ZodType = z.object({
  address: z.string().min(1, { message: 'Please enter your address' }),
  suiteNumber: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
});

export type AddressSchemaType = z.infer<typeof AddressSchema>;
