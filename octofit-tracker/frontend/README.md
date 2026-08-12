# OctoFit Tracker - Frontend

React 19 + Vite presentation tier for the OctoFit Tracker multi-tier application.

## Features

- ✅ React Router DOM for client-side navigation
- ✅ Bootstrap 5 for responsive UI
- ✅ Vite environment variables for configuration
- ✅ Support for GitHub Codespaces and localhost development
- ✅ Handles both paginated and array API responses
- ✅ Components: Users, Teams, Activities, Workouts, Leaderboard

## Setup

### 1. Install Dependencies

```bash
npm install --prefix octofit-tracker/frontend
```

### 2. Environment Configuration

Create a `.env.local` file in the frontend directory:

```bash
cp octofit-tracker/frontend/.env.example octofit-tracker/frontend/.env.local
```

Then edit `.env.local` and set the `VITE_CODESPACE_NAME`:

```env
# For GitHub Codespaces deployment
VITE_CODESPACE_NAME=your-codespace-name

# For local development (leave VITE_CODESPACE_NAME empty)
# API calls will fallback to http://localhost:8000/api
```

**Note:** `.env.local` should never be committed to version control (already in .gitignore).

### 3. Start Development Server

```bash
npm run dev --prefix octofit-tracker/frontend
```

The frontend will be available at `http://localhost:5173` by default.

## API Configuration

The frontend uses Vite environment variables to configure the API base URL:

- **GitHub Codespaces**: `https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api`
- **Local Development**: `http://localhost:8000/api`

Set `VITE_CODESPACE_NAME` in `.env.local` to your GitHub Codespace name. If unset, the frontend defaults to localhost.

### Supported Environment Variables

- `VITE_CODESPACE_NAME`: Your GitHub Codespace name (optional)

## Building

```bash
npm run build --prefix octofit-tracker/frontend
```

## Project Structure

```
src/
├── App.jsx              # Main app with routing
├── App.css              # App styles
├── main.jsx             # Entry point with Bootstrap & Router
├── index.css            # Global styles
├── config/
│   └── api.js           # API client configuration
├── components/
│   ├── Activities.jsx   # Activities listing
│   ├── Leaderboard.jsx  # Leaderboard view
│   ├── Teams.jsx        # Teams listing
│   ├── Users.jsx        # Users listing
│   ├── Workouts.jsx     # Workouts listing
│   └── ApiExample.jsx   # API usage example (legacy)
```

## API Response Handling

The API client in `src/config/api.js` automatically handles:
- **Direct array responses**: `[{ id: 1 }, ...]`
- **Paginated responses**: `{ data: [{ id: 1 }, ...], pagination: {...} }`
- **Object responses**: `{ status: "ok", ... }`

## Styling

- **Framework**: Bootstrap 5 via CDN
- **Custom Styles**: See `src/App.css` for OctoFit-specific styling
- **Responsive**: Mobile-first approach with media queries

## Technologies

- **React 19.2.8**: Latest React with hooks support
- **Vite 8.2.0**: Fast build tool
- **React Router DOM 7.18.2**: Client-side routing
- **Bootstrap 5.3.8**: Responsive UI framework
- **ESLint (Oxlint)**: Code linting

## Troubleshooting

### API Connection Failed

1. Check that the backend API is running on `http://localhost:8000`
2. Or set `VITE_CODESPACE_NAME` in `.env.local` for Codespaces deployment
3. Check browser console for detailed error messages

### Blank Page

1. Ensure Node.js version 18+ is installed
2. Run `npm install --prefix octofit-tracker/frontend`
3. Check that `main.jsx` imports Bootstrap CSS
4. Clear browser cache and restart dev server

### Environment Variables Not Loading

1. Restart the dev server after updating `.env.local`
2. Vite prefixes with `VITE_` by default - don't use other prefixes
3. Check `console.log('API Base URL:', apiClient.baseUrl)` in browser console

