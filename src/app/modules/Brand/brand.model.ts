import { Schema, model } from 'mongoose';
import { TBrand } from './brand.interface';


const brandSchema = new Schema<TBrand>(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true, unique: true },

  },
  { timestamps: true },
);

export const BrandModel = model<TBrand>('Brand', brandSchema);
