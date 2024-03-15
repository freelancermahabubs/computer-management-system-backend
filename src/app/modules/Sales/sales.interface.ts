import mongoose from 'mongoose';

export type TSales = {
  productId: mongoose.Types.ObjectId;
  quantitySold: number;
  buyerName: string;
  saleDate: Date;
};

