import { z } from 'zod';
import type { ZodType } from 'zod';

export const CreateBakerySchema: ZodType = z.object({
  title: z.string().min(1, { message: 'A title is required' }),
  address: z.string().min(1, { message: 'An address is required' }),
  suiteNumber: z.string().transform(Number),
  city: z.string().min(1, { message: 'A city is required' }),
  state: z.string(),
  zipCode: z.string().regex(/^\d{5}$/, { message: 'Invalid zip code' }),
});

export type CreateBakerySchemaType = z.infer<typeof CreateBakerySchema>;
