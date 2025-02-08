import React, { useState } from 'react';
import axios from 'axios';
import '../Style/login.css';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(''); // To hold login status message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginStatus(''); // Clear the status message on form submit

    try {
      const res = await axios.post('http://localhost:3000/api/login', { email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setLoginStatus('Login successful!'); // Success message
    } catch (err) {
      setLoginStatus('Invalid email or password.'); // Error message
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setToken(token);
    }
  }, [setToken]);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Show the login status message here */}
      {loginStatus && <p className="login-status">{loginStatus}</p>}
    </div>
  );
};

export default Login;
