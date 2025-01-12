import { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      setError('');
      const response = await axios.post(
        'http://localhost:3001/auth/login',
        formData
      );
      setToken(response.data.access_token);
      alert('Login successful!');
    } catch (err: unknown) {
      // setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <button onClick={handleLogin}>Login</button>
      {token && (
        <div>
          <h3>Your Token:</h3>
          <p>{token}</p>
        </div>
      )}
    </div>
  );
}
