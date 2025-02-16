import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Content {
  title: string,
  paragraph: string
}

export interface InterfaceContract {
  file: string;
  name: string | null;
  company: string | null;
  description: string | null;
  fullContract: string | null;
  json: Content[];
  status: "pending" | "processed";
}

export interface InterfaceContractsDocument extends InterfaceContract, Document {
  createdAt: Date;
  updatedAt: Date;
}

const contractSchema = new Schema<InterfaceContractsDocument>(
  {
    file: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    company: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    fullContract: {
      type: String,
      required: false
    },
    status: {
      type: String,
      enum: ['pending', 'processed'],
      default: 'pending',
      required: true,
    },
    json: [{
      title: { type: String },
      paragraph: { type: String }
    }]
  },
  {
    timestamps: true
  }
);

const Contracts: Model<InterfaceContractsDocument> =
  mongoose.models?.contracts || mongoose.model<InterfaceContractsDocument>('contracts', contractSchema);

export default Contracts;
