import { Router, Request, Response } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id).populate('members');
    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, members } = req.body;
    const team = new Team({ name, description, members });
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description, members } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { name, description, members },
      { new: true }
    ).populate('members');
    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }
    res.json(team);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update team' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }
    res.json({ message: 'Team deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

export default router;
