import mongoose, { Schema, Document, Model } from "mongoose";

// Define the allowed status values.
export type StatusInterface = "unprocessed" | "processing" | "failed" | "successful";

// Define the Question interface
export interface QuestionInterface {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

// Define the Segment interface
export interface SegmentsInterface {
    title: string;
    authorName: string;
    category: string;
    transcription: string;
    summary: string;
    questions: QuestionInterface[];
    totalPoints: number;
    startTime: number
    endTime: number
}

// Define the main Upload interface
export interface UploadInterface {
  youtube: string;
  link?: string;
  segments: SegmentsInterface[];
  status: StatusInterface;
}

export interface UploadInterfaceDocument extends UploadInterface, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Create a sub-schema for Question
const questionSchema = new Schema<QuestionInterface>(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
    explanation: { type: String, required: true },
    points: { type: Number, required: true },
  },
  { _id: false }
);

// Create a sub-schema for Segment
const segmentSchema = new Schema<SegmentsInterface>(
  {
    startTime: { type: Number, required: false },
    endTime: { type: Number, required: false },
    title: { type: String, required: false },
    authorName: { type: String, required: false },
    category: { type: String, required: false },
    transcription: { type: String, required: false },
    summary: { type: String, required: false },
    questions: { type: [questionSchema], default: [] },
    totalPoints: { type: Number, default: 0 },
  },
  { _id: false }
);

// Create the main upload schema and use the sub-schema for segments.
const uploadSchema = new Schema<UploadInterfaceDocument>(
  {
    youtube: { type: String, required: true },
    link: { type: String, required: false },
    segments: { type: [segmentSchema], default: [] },
    status: {
      type: String,
      required: true,
      enum: ["unprocessed", "processing", "failed", "successful"],
      default: "unprocessed"
    },
  },
  {
    timestamps: true,
  }
);

uploadSchema.index({ expires: 1 }, { expireAfterSeconds: 2000000 });

const UploadModel: Model<UploadInterfaceDocument> =
  mongoose.models.upload || mongoose.model<UploadInterfaceDocument>("upload", uploadSchema);

export default UploadModel;