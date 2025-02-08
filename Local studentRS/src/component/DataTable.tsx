import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataTable = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/registrations');
        setRegistrations(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch registrations. Please try again.');
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Student Registrations with Payment Details</h1>
      {registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Email</th>
              <th>Course Name</th>
              <th>Course Description</th>
              <th>Payment Amount</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
              <th>Registration Date</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration) => {
              const payment = registration.paymentId || {};
              return (
                <tr key={registration._id}>
                  <td>{registration.userId.name}</td>
                  <td>{registration.userId.email}</td>
                  <td>{registration.courseId.title}</td>
                  <td>{registration.courseId.description}</td>
                  <td>${payment.amount ? payment.amount.toFixed(2) : 'N/A'}</td>
                  <td>{payment.paymentMethod || 'N/A'}</td>
                  <td>{payment.status || 'N/A'}</td>
                  <td>{new Date(registration.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataTable;
