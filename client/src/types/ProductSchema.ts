import { z } from 'zod';
import type { ZodType } from 'zod';

export const CreateProductForm: ZodType = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  price: z
    .string()
    .refine((val) => {
      // Validate using regex (matches $1000.00 down to 0.00)
      return /^(\$)?(\d{1,3}(,\d{3})*|(\d+))(\.\d{2})?$/.test(val);
    }, 'Invalid price format')
    .transform((val) => {
      // Remove any commas and dollar sign, then parse as a float
      const cleanedValue = val.replace(/[\$,]/g, '');
      return parseFloat(cleanedValue);
    })
    .refine((n) => {
      // Ensure it's a positive value
      return n >= 0;
    }, 'Invalid price value')
    .refine((n) => {
      // Check if the item is not too expensive
      return n <= 1000;
    }, 'Item is too expensive'),
});

export type CreateProductFormType = z.infer<typeof CreateProductForm>;
