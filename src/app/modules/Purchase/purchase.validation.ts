import { z } from 'zod';

const PurchaseValidationSchema = z.object({
  body: z.object({
    quantity: z.number({ required_error: 'Product Quantity is required' }),
    buyerName: z.string({ required_error: 'Buyer is required' }),
    purchaseDate: z.date(z.date()),
  }),
});

export const PurchaseValidations = {
  PurchaseValidationSchema,
};
