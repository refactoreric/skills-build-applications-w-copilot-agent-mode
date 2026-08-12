import { useState, useEffect } from 'react';
import { apiClient } from '../config/api';
import './ApiExample.css';

export function ApiExample() {
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch health status
      const healthData = await apiClient.get('/health');
      setHealth(healthData);

      // Fetch users
      const usersData = await apiClient.get('/users');
      setUsers(usersData);

      // Fetch activities
      const activitiesData = await apiClient.get('/activities');
      setActivities(activitiesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="api-example">
      <h2>API Configuration Example</h2>
      
      {health && (
        <div className="health-status">
          <h3>API Status</h3>
          <p><strong>Base URL:</strong> {health.baseUrl}</p>
          <p><strong>Environment:</strong> {health.environment}</p>
          <p><strong>Status:</strong> {health.status}</p>
        </div>
      )}

      {error && <div className="error">Error: {error}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <section>
            <h3>Users ({users.length})</h3>
            <ul className="items-list">
              {users.map(user => (
                <li key={user._id}>
                  <strong>{user.name}</strong> - {user.email}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Activities ({activities.length})</h3>
            <ul className="items-list">
              {activities.map(activity => (
                <li key={activity._id}>
                  <strong>{activity.type}</strong> by {activity.userId.name}
                  <br />
                  Duration: {activity.duration}min | Distance: {activity.distance}km | Calories: {activity.calories}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh Data'}
      </button>
    </div>
  );
}
