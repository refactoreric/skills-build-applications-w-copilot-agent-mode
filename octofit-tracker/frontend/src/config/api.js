/**
 * API Configuration
 * Handles both GitHub Codespaces and localhost environments
 * 
 * For GitHub Codespaces, set VITE_CODESPACE_NAME in .env.local:
 * VITE_CODESPACE_NAME=your-codespace-name
 */

export const getApiBaseUrl = () => {
  // Check if running in Codespaces via Vite environment variable
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName && codespaceName !== 'undefined') {
    // Codespaces URL format: https://{CODESPACE_NAME}-8000.app.github.dev
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  
  // Fallback to localhost for development
  return 'http://localhost:8000';
};

/**
 * Extracts data array from response
 * Handles both paginated responses (with data property) and direct array responses
 */
const extractData = (response) => {
  if (Array.isArray(response)) {
    return response;
  }
  if (response && Array.isArray(response.data)) {
    return response.data;
  }
  if (response && typeof response === 'object') {
    return response;
  }
  return response;
};

export const apiClient = {
  baseUrl: getApiBaseUrl(),
  
  async get(endpoint) {
    const url = `${this.baseUrl}/api${endpoint}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return extractData(data);
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
    const responseData = await response.json();
    return extractData(responseData);
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
    const responseData = await response.json();
    return extractData(responseData);
  },
  
  async delete(endpoint) {
    const url = `${this.baseUrl}/api${endpoint}`;
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return extractData(data);
  }
};

// Log the configured API base URL
console.log('API Base URL:', apiClient.baseUrl);
