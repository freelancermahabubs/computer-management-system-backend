import { z } from 'zod';

const UserValidationSchema = z.object({
  body: z.object({
    username: z
      .string({ invalid_type_error: 'username must be string' })
      .min(3)
      .max(20),
    name: z.string({ invalid_type_error: 'name must be string' }),
    email: z.string().email(),
    // password: z
    //   .string({ invalid_type_error: 'Password must be string' })
    //   .max(20, { message: 'Password cannot be more than 20 characters' })
    //   .min(6, { message: 'Password must be at least 6 characters' }),
    role: z
      .enum(['buyer', 'seller'])
      .refine(value => value === 'buyer' || value === 'seller', {
        message: 'Role must be either "buyer" or "seller"',
      }),
  }),
});

export const UserValidation = {
  UserValidationSchema,
};
