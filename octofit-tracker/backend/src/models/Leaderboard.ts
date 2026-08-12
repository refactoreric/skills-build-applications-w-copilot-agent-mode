import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  teamId?: mongoose.Schema.Types.ObjectId;
  points: number;
  rank: number;
  month: string;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
    month: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
