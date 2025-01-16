import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post('https://student-registration-system-6zuf.onrender.com/api/login', { email, password });

      const token = res.data.token;
      localStorage.setItem('token', token); 
      setToken(token);


      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (err) {
      alert('Login failed!');
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
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
