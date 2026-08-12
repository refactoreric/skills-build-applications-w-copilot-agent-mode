# API Configuration Guide

## Overview
The OctoFit Tracker API automatically configures for both **Codespaces** and **localhost** environments.

## Environment Detection

### Codespaces Environment
When running in GitHub Codespaces:
- **API Base URL**: `https://{CODESPACE_NAME}-8000.app.github.dev`
- **Environment Variable**: `CODESPACE_NAME` (automatically set by Codespaces)
- Uses secure HTTPS connections

### Localhost Environment
When running locally:
- **API Base URL**: `http://localhost:8000`
- Default for local development
- No special configuration needed

## Backend Configuration

### Port
- **Default Port**: 8000
- **Override**: Set `PORT` environment variable
- Example: `PORT=3001 npm run dev`

### CORS Settings
The backend automatically handles CORS for:
- `http://localhost:3000` (frontend default)
- `http://localhost:5173` (Vite default)
- `https://{CODESPACE_NAME}-3000.app.github.dev` (Codespaces)
- `https://{CODESPACE_NAME}-5173.app.github.dev` (Codespaces)

### Health Endpoint
```bash
GET /api/health
```

Returns:
```json
{
  "status": "API is running",
  "environment": "Codespaces or localhost",
  "baseUrl": "https://...",
  "codespaceName": "name or N/A",
  "port": 8000,
  "allowedOrigins": [...]
}
```

## Frontend Configuration

### API Client Setup
The frontend includes an `apiClient` utility in `src/config/api.js`:

```javascript
import { apiClient, getApiBaseUrl } from './config/api';

// Get the configured base URL
console.log(getApiBaseUrl());

// Make API requests
const users = await apiClient.get('/users');
const activities = await apiClient.get('/activities');
```

### Supported Methods
- `GET`: `apiClient.get('/endpoint')`
- `POST`: `apiClient.post('/endpoint', data)`
- `PUT`: `apiClient.put('/endpoint', data)`
- `DELETE`: `apiClient.delete('/endpoint')`

## Testing Endpoints

### Health Check
```bash
curl http://localhost:8000/api/health | jq
```

### Get All Users
```bash
curl http://localhost:8000/api/users | jq
```

### Get All Activities
```bash
curl http://localhost:8000/api/activities | jq
```

### Get Teams
```bash
curl http://localhost:8000/api/teams | jq
```

### Get Workouts
```bash
curl http://localhost:8000/api/workouts | jq
```

### Get Leaderboard
```bash
curl http://localhost:8000/api/leaderboard | jq
```

## Running the Application

### Backend
```bash
cd octofit-tracker/backend
npm install
npm run dev
# Server runs on http://localhost:8000
```

### Frontend
```bash
cd octofit-tracker/frontend
npm install
npm run dev
# Application runs on http://localhost:5173
```

## Troubleshooting

### CORS Errors
If you see CORS errors:
1. Verify the frontend URL matches one of the allowed origins
2. Check `CODESPACE_NAME` environment variable is set correctly
3. Ensure both apps are running

### Connection Refused
If connection is refused:
1. Start the backend: `npm run dev` from backend folder
2. Verify port 8000 is not in use
3. Check firewall settings

### Wrong Base URL
If the API base URL is incorrect:
- Codespaces: Verify `CODESPACE_NAME` env var is set
- Localhost: Use `http://localhost:8000` as base URL
- Check browser console for the detected base URL

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/users` | GET | Get all users |
| `/api/teams` | GET | Get all teams |
| `/api/activities` | GET | Get all activities |
| `/api/workouts` | GET | Get all workouts |
| `/api/leaderboard` | GET | Get leaderboard |

## Notes
- All endpoints support both HTTP and HTTPS
- CORS is enabled for frontend domains
- Database connection required (MongoDB)
- Environment variables are loaded from `.env` if available
