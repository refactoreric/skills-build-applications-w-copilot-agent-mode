// Load environment variables from .env.local file
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import express from 'express';
import './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import workoutsRouter from './routes/workouts';
import leaderboardRouter from './routes/leaderboard';

const app = express();
const PORT = process.env.PORT || 8000;

// CORS Configuration for Codespaces and localhost
const codespaceName = process.env.CODESPACE_NAME;
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  codespaceName ? `https://${codespaceName}-3000.app.github.dev` : null,
  codespaceName ? `https://${codespaceName}-5173.app.github.dev` : null,
].filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

app.get('/api/health', (req, res) => {
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
  
  res.json({
    status: 'API is running',
    environment: codespaceName ? 'Codespaces' : 'localhost',
    baseUrl,
    codespaceName: codespaceName || 'N/A',
    port: PORT,
    allowedOrigins
  });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/leaderboard', leaderboardRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
