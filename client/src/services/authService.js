const API_BASE_URL = 'http://localhost:3000/api/v1/auth';

export const authService = {
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if(response.status==401)
    {
      
    }
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Invalid credentials');
    }

    return data; // returns { token, user }
  },

  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  },
};