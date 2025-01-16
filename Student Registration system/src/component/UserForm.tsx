import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://student-registration-system-6zuf.onrender.com/api/users', { name, email, password, role });
      alert('User created successfully!');
    } catch (err) {
      alert('Failed to create user.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create User</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />
      <button type="submit">Create User</button>
    </form>
  );
};

export default UserForm;
