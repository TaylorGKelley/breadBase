import { z, ZodType } from 'zod';

export const LoginSchema: ZodType = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string({ message: 'Please provide a password' }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
