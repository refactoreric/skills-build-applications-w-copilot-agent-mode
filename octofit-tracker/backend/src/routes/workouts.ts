import { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('userId');
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('userId');
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      return;
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, name, description, exercises, date } = req.body;
    const workout = new Workout({ userId, name, description, exercises, date });
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { userId, name, description, exercises, date } = req.body;
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      { userId, name, description, exercises, date },
      { new: true }
    ).populate('userId');
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      return;
    }
    res.json(workout);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update workout' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      return;
    }
    res.json({ message: 'Workout deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
