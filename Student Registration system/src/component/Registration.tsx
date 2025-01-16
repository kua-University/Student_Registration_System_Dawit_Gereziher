import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CourseRegistration.css'; // Import your CSS for styling

const CourseRegistration = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch students and courses when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentResponse = await axios.get('https://student-registration-system-6zuf.onrender.com/api/users'); // Adjust endpoint as needed
                const courseResponse = await axios.get('https://student-registration-system-6zuf.onrender.com/api/courses'); // Adjust endpoint as needed

                setStudents(studentResponse.data);
                setCourses(courseResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data');
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('https://student-registration-system-6zuf.onrender.com/api/registrations', {
                userId: selectedStudent,
                courseId: selectedCourse,
            });

            if (response.status === 201) {
                setSuccess('Registration successful!');
                // Optionally clear the form
                setSelectedStudent('');
                setSelectedCourse('');
            }
        } catch (err) {
            setError('Registration failed: ' + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registration-container">
            <h2>Register for a Course</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="student">Select Student:</label>
                    <select
                        id="student"
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        required
                    >
                        <option value="">-- Select Student --</option>
                        {students.map((student) => (
                            <option key={student._id} value={student._id}>
                                {student.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="course">Select Course:</label>
                    <select
                        id="course"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        required
                    >
                        <option value="">-- Select Course --</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default CourseRegistration;
