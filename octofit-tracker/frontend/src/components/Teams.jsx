import { useState, useEffect } from 'react'
import { apiClient } from '../config/api'

// Codespaces API pattern: https://<codespace-name>-8000.app.github.dev/api/teams

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTeams()
  }, [])

  const fetchTeams = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiClient.get('/teams')
      setTeams(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
      setTeams([])
    } finally {
      setLoading(false)
    }
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
    <div className="teams-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Teams</h2>
        <button className="btn btn-primary" onClick={fetchTeams}>
          Refresh
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          Error loading teams: {error}
        </div>
      )}

      {teams.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No teams found.
        </div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  {team.description && (
                    <p className="card-text text-muted">{team.description}</p>
                  )}
                  <div className="mb-2">
                    <span className="badge bg-success">
                      {team.members?.length || 0} Members
                    </span>
                  </div>
                  {team.members && team.members.length > 0 && (
                    <div className="small">
                      <strong>Members:</strong>
                      <ul className="mb-0 ps-3 mt-2">
                        {team.members.map((member, idx) => (
                          <li key={idx}>
                            {typeof member === 'string' ? member : member.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
