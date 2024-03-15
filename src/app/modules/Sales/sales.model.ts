import { Schema, model } from 'mongoose';
import { TSales } from './sales.interface';

const saleSchema = new Schema<TSales>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'ComputerItem',
      required: true,
    },

    quantitySold: Number,
    buyerName: {
      type: String,
      required: true,
    },
    saleDate: { type: Date, required: true },
  },

  { timestamps: true },
);

export const SaleModel = model<TSales>('Sale', saleSchema);
