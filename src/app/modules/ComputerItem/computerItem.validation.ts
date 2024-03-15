import { z } from 'zod';

const ComputerItemValidationSchema = z.object({
  body: z.object({
    productName: z.string({ required_error: 'Product name is required' }),
    productPrice: z.number({ required_error: 'Product price is required' }),
    productImage: z.string().optional(),
    productQuantity: z.number({
      required_error: 'Product quantity is required',
    }),
    category: z.string({ required_error: 'Category is required' }),
    brand: z.string({ required_error: 'Brand is required' }),
    compatibility: z.array(z.string()),
    priceRange: z.object({
      min: z.optional(z.number()),
      max: z.optional(z.number()),
    }),
    interfaceType: z.array(z.string()),
    condition: z.union([z.enum(['new', 'used']), z.string()]),
    capacity: z.optional(z.string()),
  }),
});

export const ComputerItemValidations = {
  ComputerItemValidationSchema,
};
