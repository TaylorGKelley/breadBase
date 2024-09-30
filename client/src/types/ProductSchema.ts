import { z } from 'zod';
import type { ZodType } from 'zod';
import { FormData } from './Forms';

export const ProductSchema: ZodType<FormData> = z.object({
  name: z.string({
    required_error: 'required field',
  }),
  price: z
    .number({
      required_error: 'required field',
      invalid_type_error: 'Price is required',
    })
    .min(0.01)
    .max(1000),
});
