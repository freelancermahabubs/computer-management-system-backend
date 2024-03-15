import { z } from 'zod';

const brandValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).min(3).max(500),
    image: z.string({ required_error: 'Image is required' }),

  }),
});

export const BrandValidations = {
    brandValidationSchema,
};
