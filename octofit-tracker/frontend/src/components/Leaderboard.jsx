import { useState, useEffect } from 'react'
import { apiClient } from '../config/api'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiClient.get('/leaderboard')
      setLeaderboard(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
      setLeaderboard([])
    } finally {
      setLoading(false)
    }
  }

  const getMedalEmoji = (rank) => {
    if (rank === 0) return '🥇'
    if (rank === 1) return '🥈'
    if (rank === 2) return '🥉'
    return `${rank + 1}.`
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="leaderboard-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Leaderboard</h2>
        <button className="btn btn-primary" onClick={fetchLeaderboard}>
          Refresh
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          Error loading leaderboard: {error}
        </div>
      )}

      {leaderboard.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No leaderboard data available.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th style={{ width: '80px' }}>Rank</th>
                <th>Name</th>
                <th style={{ width: '150px' }}>Points</th>
                <th style={{ width: '150px' }}>Activities</th>
                <th style={{ width: '150px' }}>Total Distance</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => (
                <tr key={entry.userId || idx} className={idx === 0 ? 'table-warning' : ''}>
                  <td>
                    <span className="fs-5">{getMedalEmoji(idx)}</span>
                  </td>
                  <td className="fw-bold">
                    {entry.userName || entry.name || 'Unknown'}
                  </td>
                  <td>
                    <span className="badge bg-primary">
                      {entry.points || entry.totalPoints || 0}
                    </span>
                  </td>
                  <td className="text-center">
                    {entry.activitiesCount || entry.activityCount || 0}
                  </td>
                  <td className="text-center">
                    {entry.totalDistance || 0} km
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
