let authToken = null;
let tokenExpiryTime = null;

/**
 * Check if the current token is valid
 * @returns {boolean} True if token exists and is not expired
 */
export const isAuthenticated = () => {
  if (!authToken || !tokenExpiryTime) {
    return false;
  }
  
  return new Date().getTime() < tokenExpiryTime;
};

/**
 * Authenticate with Microsoft 365 Agents SDK
 * @returns {Promise<string>} Authentication token
 */
export const authenticate = async () => {
  // If we already have a valid token, return it
  if (isAuthenticated()) {
    return authToken;
  }
  
  try {
    const response = await fetch('https://defaultef475ff37cd14fa3ba77f63824f7c3.7c.environment.api.powerplatform.com/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

      }),
      credentials: 'include' // Include cookies for authentication
    });
    
    if (!response.ok) {
      throw new Error(`Auth error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Store the token and expiry time
    authToken = data.access_token;
    // Set expiry time (usually provided in the response)
    tokenExpiryTime = new Date().getTime() + (data.expires_in * 1000);
    
    return authToken;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

/**
 * Get authentication headers for API calls
 * @returns {Promise<Object>} Headers object
 */
export const getAuthHeaders = async () => {
  const token = await authenticate();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

/**
 * Log out and clear authentication
 */
export const logout = () => {
  authToken = null;
  tokenExpiryTime = null;
};