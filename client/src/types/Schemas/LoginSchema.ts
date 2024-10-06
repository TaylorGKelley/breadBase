import { z, ZodType } from 'zod';

export const LoginSchema: ZodType = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
