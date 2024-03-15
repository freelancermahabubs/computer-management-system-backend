import mongoose from 'mongoose';

export type TComputerItem = {
  productName: string;
  productPrice: number;
  productImage: string;
  productQuantity: number;
  category: mongoose.Types.ObjectId;
  brand: mongoose.Types.ObjectId;
  compatibility: string[];
  priceRange: { min: number; max: number };
  interfaceType: string[];
  condition: string;
  capacity: string;
};
