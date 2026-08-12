import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  description?: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
  }>;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
      },
    ],
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);
