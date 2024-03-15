import { Schema, model } from 'mongoose';
import { TPurchase } from './purchase.interface';

const purchaseSchema = new Schema<TPurchase>(
  {
    quantity: Number,
    buyerName: {
      type: String,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'ComputerItem',
      required: true,
    },
    purchaseDate: { type: Date, required: true },
  },

  { timestamps: true },
);

export const PurchaseModel = model<TPurchase>('Purchase', purchaseSchema);
