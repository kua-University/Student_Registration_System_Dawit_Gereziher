import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://student-registration-system-6zuf.onrender.com/api/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h3>User List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
