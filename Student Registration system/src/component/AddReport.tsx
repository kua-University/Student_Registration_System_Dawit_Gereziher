import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddReport: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [attendance, setAttendance] = useState<number>(0);
  const [grades, setGrades] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [courses, setCourses] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    // Fetch users and courses here
    const fetchUsers = async () => {
      const response = await axios.get('https://student-registration-system-6zuf.onrender.com/api/users'); // Adjust endpoint as necessary
      setUsers(response.data);
    };

    const fetchCourses = async () => {
      const response = await axios.get('https://student-registration-system-6zuf.onrender.com/api/courses'); // Adjust endpoint as necessary
      setCourses(response.data);
    };

    fetchUsers();
    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const reportData = {
      userId: selectedUser,
      courseId: selectedCourse,
      attendance:attendance,
      grades: grades
    };

    try {
      const response = await axios.post('https://student-registration-system-6zuf.onrender.com/api/reports', reportData);
      setMessage('Report created successfully!');
      // Clear form fields after submission
      setSelectedUser('');
      setSelectedCourse('');
      setAttendance(0);
      setGrades([]);
    } catch (error) {
      console.error('Error creating report:', error);
      setMessage('Failed to create report.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>

      <br />
                <label>
                    Select Course:
                    <select 
                        value={selectedCourse} 
                        onChange={(e) => setSelectedCourse(e.target.value)} 
                        required
                    >
                        <option value="">-- Select Course --</option>
                        {courses.map(course => (
                            <option key={course._id} value={course._id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
      <input
        type="number"
        value={attendance}
        onChange={(e) => setAttendance(Number(e.target.value))}
        placeholder="Attendance"
        required
      />

      <input
        type="text"
        value={grades.join(',')}
        onChange={(e) => setGrades(e.target.value.split(','))}
        placeholder="Grades (comma-separated)"
        required
      />

      <button type="submit">Add Report</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddReport;






                
                