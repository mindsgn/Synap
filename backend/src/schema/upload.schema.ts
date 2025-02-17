import mongoose, { Schema, Document, Model } from "mongoose";

type StatusInterface = "processing" | "failed" | "successful"

export interface UploadInterface {
    youtube: string;
    link: string;
    sections: string[];
    status: StatusInterface
}

export interface UploadInterfacehDocument extends UploadInterface, Document {
    createdAt: Date;
    updatedAt: Date;
  }

export const authSchema = new Schema<any>(
    {
        youtube: {
            type: String, 
            required: true, 
            unique: true 
        },
        link: {
            type: String, 
            required: true, 
            unique: true 
        },
        sections: {
            type: String, 
            required: true, 
            unique: true 
        },
        status: {
            type: String,
            required: true,
            enum: ["processing", "failed", "successful"],
        },
    },
    {
        timestamps: true
    }
);

authSchema.index({ expires: 1 }, { expireAfterSeconds: 200000 })

const UploadSchema: Model<UploadInterface> = mongoose.models?.auth || mongoose.model<UploadInterfacehDocument>('auth', authSchema);

export default UploadSchema;