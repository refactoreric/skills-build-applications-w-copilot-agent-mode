import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  teamId?: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
