import { Schema, model } from 'mongoose';
import { TComputerItem } from './computerItem.interface';

const computerItemSchema = new Schema<TComputerItem>(
  {
    productName: { type: String, required: true, unique: true },
    productPrice: { type: Number, required: true },
    productQuantity: { type: Number, required: true },
    productImage: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
    compatibility: [{ type: String }],
    priceRange: { min: { type: Number }, max: { type: Number } },
    interfaceType: [{ type: String }],
    condition: { type: String, enum: ['new', 'used'], required: true },
    capacity: { type: String },
  },
  { timestamps: true },
);

export const ComputerItemModel = model<TComputerItem>(
  'ComputerItem',
  computerItemSchema,
);
