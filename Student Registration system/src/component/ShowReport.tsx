import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowReports: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('https://student-registration-system-6zuf.onrender.com/api/reports');
        setReports(response.data);
      } catch (error) {
        setError('Failed to fetch reports.');
        console.error(error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>Reports</h2>
      {error && <p>{error}</p>}
      <ul>
        {reports.map((report) => (
          <li key={report._id}>
            <p>User: {report.userId.name}</p>
            <p>Course: {report.courseId.name}</p>
            <p>Attendance: {report.attendance}</p>
            <p>Grades: {report.grades.join(', ')}</p>
            <p>Generated At: {new Date(report.generatedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowReports;
