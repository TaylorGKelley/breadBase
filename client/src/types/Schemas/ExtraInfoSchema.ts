import { z, ZodType } from 'zod';

export const ExtraInfoSchema: ZodType = z.object({
  phoneNumber: z
    .string()
    .regex(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
      message: 'Please provide a valid phone number',
    }),
  address: z.string().min(1, { message: 'Please provide an address' }),
  suiteNumber: z.string().transform(Number),
  state: z.string().min(1, { message: 'Please provide a state' }),
  county: z.string().min(1, { message: 'Please provide a county' }),
  zipCode: z.string().regex(/^\d{5}$/, { message: 'Invalid zip code' }),
});

export type ExtraInfoSchemaType = z.infer<typeof ExtraInfoSchema>;
