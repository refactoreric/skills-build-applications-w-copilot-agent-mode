import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  type: string;
  duration: number;
  distance?: number;
  calories?: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number },
    calories: { type: Number },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>('Activity', activitySchema);
