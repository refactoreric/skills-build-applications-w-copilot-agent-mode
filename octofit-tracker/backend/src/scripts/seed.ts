import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Workout from '../models/Workout';
import Leaderboard from '../models/Leaderboard';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      Leaderboard.deleteMany({}),
    ]);

    const marathonTeam = await Team.create({
      name: 'Aurora Striders',
      description: 'Endurance athletes focused on long-distance training and recovery.',
      members: [],
    });

    const strengthTeam = await Team.create({
      name: 'Summit Power',
      description: 'Strength-focused athletes building power, stability, and speed.',
      members: [],
    });

    const users = await User.insertMany([
      { name: 'Maya Chen', email: 'maya.chen@octofit.local', teamId: marathonTeam._id },
      { name: 'Lucas Patel', email: 'lucas.patel@octofit.local', teamId: marathonTeam._id },
      { name: 'Noah Brooks', email: 'noah.brooks@octofit.local', teamId: strengthTeam._id },
      { name: 'Ava Nguyen', email: 'ava.nguyen@octofit.local', teamId: strengthTeam._id },
    ]);

    const marathonMemberIds = users.slice(0, 2).map((user) => user._id);
    const strengthMemberIds = users.slice(2).map((user) => user._id);

    await Promise.all([
      Team.findByIdAndUpdate(marathonTeam._id, { members: marathonMemberIds }),
      Team.findByIdAndUpdate(strengthTeam._id, { members: strengthMemberIds }),
    ]);

    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Running',
        duration: 42,
        distance: 8.5,
        calories: 520,
        date: new Date('2026-08-01T06:15:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'Cycling',
        duration: 35,
        distance: 18.2,
        calories: 410,
        date: new Date('2026-08-03T18:00:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'Strength',
        duration: 50,
        distance: 0,
        calories: 610,
        date: new Date('2026-08-02T17:10:00Z'),
      },
      {
        userId: users[3]._id,
        type: 'HIIT',
        duration: 28,
        distance: 3.1,
        calories: 390,
        date: new Date('2026-08-04T07:45:00Z'),
      },
    ]);

    const workouts = await Workout.insertMany([
      {
        userId: users[0]._id,
        name: 'Tempo Run Builder',
        description: 'Build aerobic capacity with controlled, steady-state intervals.',
        exercises: [
          { name: 'Warm-up jog', sets: 1, reps: 10 },
          { name: 'Tempo intervals', sets: 4, reps: 8 },
          { name: 'Cooldown walk', sets: 1, reps: 12 },
        ],
        date: new Date('2026-08-05T06:30:00Z'),
      },
      {
        userId: users[2]._id,
        name: 'Lower Body Power',
        description: 'Focus on compound lifts and explosive leg work.',
        exercises: [
          { name: 'Barbell squat', sets: 5, reps: 5 },
          { name: 'Romanian deadlift', sets: 4, reps: 8 },
          { name: 'Jump squats', sets: 3, reps: 12 },
        ],
        date: new Date('2026-08-05T18:15:00Z'),
      },
      {
        userId: users[3]._id,
        name: 'Core and Conditioning',
        description: 'Stability work paired with short power intervals.',
        exercises: [
          { name: 'Plank holds', sets: 3, reps: 45 },
          { name: 'Burpees', sets: 4, reps: 10 },
          { name: 'Kettlebell swings', sets: 4, reps: 12 },
        ],
        date: new Date('2026-08-06T07:00:00Z'),
      },
    ]);

    const leaderboardEntries = await Leaderboard.insertMany([
      { userId: users[0]._id, teamId: marathonTeam._id, points: 980, rank: 1, month: '2026-08' },
      { userId: users[2]._id, teamId: strengthTeam._id, points: 930, rank: 2, month: '2026-08' },
      { userId: users[1]._id, teamId: marathonTeam._id, points: 890, rank: 3, month: '2026-08' },
      { userId: users[3]._id, teamId: strengthTeam._id, points: 860, rank: 4, month: '2026-08' },
    ]);

    console.log(`Inserted ${users.length} users, ${activities.length} activities, ${workouts.length} workouts, and ${leaderboardEntries.length} leaderboard entries.`);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
