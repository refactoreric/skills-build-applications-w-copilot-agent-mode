---
mode: 'agent'
description: 'Create the Node.js logic tier for the Octofit Tracker app'
---

Create the logic tier in `octofit-tracker/backend` for the Octofit Tracker multi-tier application.

Requirements:

1. Do not change directories; use path-qualified commands.
2. Initialize a TypeScript Node.js API with Express.
3. Configure scripts for build/dev/start.
4. Add route handlers for:
   - `/api/users/`
   - `/api/teams/`
   - `/api/activities/`
   - `/api/leaderboard/`
   - `/api/workouts/`
5. Keep server port on `8000`.
6. Add Codespaces-aware API URL support using `CODESPACE_NAME`.
7. Keep the work compatible with GitHub Copilot free tier by using only supported prompt syntax.
