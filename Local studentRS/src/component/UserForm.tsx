import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState(''); // New state for message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/users', { name, email, password, role });
      setMessage('User created successfully!');
    } catch (err) {
      setMessage('Failed to create user.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create User</h3>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Role"
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />
      <button type="submit">Create User</button>

      {/* Red message displayed below the submit button */}
      {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
    </form>
  );
};

export default UserForm;
