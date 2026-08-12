import { useState, useEffect } from 'react'
import { apiClient } from '../config/api'

// Codespaces API pattern: https://<codespace-name>-8000.app.github.dev/api/activities

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiClient.get('/activities')
      setActivities(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
      setActivities([])
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
    <div className="activities-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Activities</h2>
        <button className="btn btn-primary" onClick={fetchActivities}>
          Refresh
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          Error loading activities: {error}
        </div>
      )}

      {activities.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No activities found.
        </div>
      ) : (
        <div className="row">
          {activities.map((activity) => (
            <div key={activity._id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title text-capitalize">{activity.type}</h5>
                  <p className="card-text text-muted small">
                    {activity.userId?.name || 'Unknown User'}
                  </p>
                  <dl className="row mb-0">
                    <dt className="col-sm-6">Duration:</dt>
                    <dd className="col-sm-6">{activity.duration} min</dd>
                    <dt className="col-sm-6">Distance:</dt>
                    <dd className="col-sm-6">{activity.distance} km</dd>
                    <dt className="col-sm-6">Calories:</dt>
                    <dd className="col-sm-6">{activity.calories}</dd>
                  </dl>
                  {activity.date && (
                    <small className="text-muted">
                      {new Date(activity.date).toLocaleDateString()}
                    </small>
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
