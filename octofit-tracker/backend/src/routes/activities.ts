import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('userId');
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, type, duration, distance, calories, date } = req.body;
    const activity = new Activity({ userId, type, duration, distance, calories, date });
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { userId, type, duration, distance, calories, date } = req.body;
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { userId, type, duration, distance, calories, date },
      { new: true }
    ).populate('userId');
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
