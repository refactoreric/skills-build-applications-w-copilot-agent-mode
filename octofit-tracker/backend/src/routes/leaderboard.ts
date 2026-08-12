import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('userId')
      .populate('teamId')
      .sort({ points: -1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const teamId = req.params.teamId as string;
    const leaderboard = await Leaderboard.find({ teamId } as any)
      .populate('userId')
      .sort({ points: -1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;
    const leaderboard = await Leaderboard.find({ userId } as any).populate('teamId');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user leaderboard entries' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, teamId, points, rank, month } = req.body;
    const leaderboard = new Leaderboard({ userId, teamId, points, rank, month });
    await leaderboard.save();
    res.status(201).json(leaderboard);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create leaderboard entry' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { userId, teamId, points, rank, month } = req.body;
    const leaderboard = await Leaderboard.findByIdAndUpdate(
      req.params.id,
      { userId, teamId, points, rank, month },
      { new: true }
    )
      .populate('userId')
      .populate('teamId');
    if (!leaderboard) {
      res.status(404).json({ error: 'Leaderboard entry not found' });
      return;
    }
    res.json(leaderboard);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update leaderboard entry' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.findByIdAndDelete(req.params.id);
    if (!leaderboard) {
      res.status(404).json({ error: 'Leaderboard entry not found' });
      return;
    }
    res.json({ message: 'Leaderboard entry deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete leaderboard entry' });
  }
});

export default router;
