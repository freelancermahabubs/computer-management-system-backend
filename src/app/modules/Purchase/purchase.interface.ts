import mongoose from 'mongoose';

export type TPurchase = {
  quantity: number;
  buyerName: string;
  productId: mongoose.Types.ObjectId;
  purchaseDate: Date;
};
