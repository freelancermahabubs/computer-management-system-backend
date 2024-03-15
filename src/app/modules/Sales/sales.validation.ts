import { z } from 'zod';

const SalesValidationSchema = z.object({
  body: z.object({
    productId: z.string({ required_error: 'Product  is required' }),
    quantitySold: z.number({ required_error: 'Product Quantity is required' }),
    buyerName: z.string({ required_error: 'Buyer is required' }),
    saleDate: z.date(z.date()),
  }),
});

export const SalesValidations = {
  SalesValidationSchema,
};
