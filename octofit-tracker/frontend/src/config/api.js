/**
 * API Configuration
 * Handles both Codespaces and localhost environments
 */

export const getApiBaseUrl = () => {
  // Check if running in Codespaces
  const codespaceName = process.env.CODESPACE_NAME;
  
  if (codespaceName) {
    // Codespaces URL format: https://{CODESPACE_NAME}-8000.app.github.dev
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  
  // Fallback to localhost for development
  return 'http://localhost:8000';
};

export const apiClient = {
  baseUrl: getApiBaseUrl(),
  
  async get(endpoint) {
    const url = `${this.baseUrl}/api${endpoint}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },
  
  async post(endpoint, data) {
    const url = `${this.baseUrl}/api${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },
  
  async put(endpoint, data) {
    const url = `${this.baseUrl}/api${endpoint}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },
  
  async delete(endpoint) {
    const url = `${this.baseUrl}/api${endpoint}`;
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
};

// Log the configured API base URL
console.log('API Base URL:', apiClient.baseUrl);
