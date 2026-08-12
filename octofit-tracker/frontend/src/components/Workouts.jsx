import { useState, useEffect } from 'react'
import { apiClient } from '../config/api'

// Codespaces API pattern: https://<codespace-name>-8000.app.github.dev/api/workouts

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchWorkouts()
  }, [])

  const fetchWorkouts = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiClient.get('/workouts')
      setWorkouts(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
      setWorkouts([])
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
    <div className="workouts-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Workouts</h2>
        <button className="btn btn-primary" onClick={fetchWorkouts}>
          Refresh
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          Error loading workouts: {error}
        </div>
      )}

      {workouts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No workouts found.
        </div>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title text-capitalize">{workout.name}</h5>
                  {workout.description && (
                    <p className="card-text text-muted small">
                      {workout.description}
                    </p>
                  )}
                  <dl className="row mb-2">
                    <dt className="col-sm-6">Duration:</dt>
                    <dd className="col-sm-6">{workout.duration || 'N/A'} min</dd>
                    <dt className="col-sm-6">Difficulty:</dt>
                    <dd className="col-sm-6">
                      <span className="badge bg-warning text-dark">
                        {workout.difficulty || 'N/A'}
                      </span>
                    </dd>
                  </dl>
                  {workout.exercises && (
                    <div className="small">
                      <strong>Exercises:</strong>
                      <ul className="mb-0 ps-3 mt-2">
                        {workout.exercises.map((exercise, idx) => (
                          <li key={idx}>
                            {typeof exercise === 'string' ? exercise : exercise.name}
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
