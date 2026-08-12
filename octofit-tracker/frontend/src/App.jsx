import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { apiClient } from './config/api'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  const location = useLocation()
  const [apiStatus, setApiStatus] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    // Check API health on mount
    const checkHealth = async () => {
      try {
        const response = await fetch(`${apiClient.baseUrl}/api/health`)
        if (response.ok) {
          const data = await response.json()
          setApiStatus(data)
          setApiError(null)
        } else {
          setApiError('API health check failed')
        }
      } catch (err) {
        setApiError(err.message)
      }
    }
    
    checkHealth()
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            🐙 OctoFit Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive('/users') ? 'active' : ''}`}
                  to="/users"
                >
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive('/teams') ? 'active' : ''}`}
                  to="/teams"
                >
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive('/activities') ? 'active' : ''}`}
                  to="/activities"
                >
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive('/workouts') ? 'active' : ''}`}
                  to="/workouts"
                >
                  Workouts
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive('/leaderboard') ? 'active' : ''}`}
                  to="/leaderboard"
                >
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* API Status */}
      <div className="api-status-bar">
        {apiError ? (
          <div className="alert alert-warning mb-0" role="alert">
            ⚠️ API Connection: {apiError}
          </div>
        ) : apiStatus ? (
          <div className="alert alert-success mb-0" role="alert">
            ✅ API Connected: {apiClient.baseUrl}
          </div>
        ) : null}
      </div>

      {/* Main Content */}
      <main className="container-fluid py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  )
}

function HomePage() {
  return (
    <div className="text-center py-5">
      <h1 className="display-4">Welcome to OctoFit Tracker</h1>
      <p className="lead">Track your fitness activities and compete on the leaderboard!</p>
      <p className="text-muted">
        Use the navigation menu above to explore users, teams, activities, workouts, and the leaderboard.
      </p>
    </div>
  )
}

export default App
