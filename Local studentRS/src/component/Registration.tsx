import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Style/CourseRegistration.css'; // Import your CSS for styling
import PaymentPage from './PaymentPage'; // Import PaymentPage component

const CourseRegistration = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [courseDetails, setCourseDetails] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(); // Track payment success
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch courses when the component mounts
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/courses'); // Adjust endpoint as needed
                setCourses(response.data);
            } catch (err) {
                console.error('Error fetching courses:', err);
                setError('Failed to load courses');
            }
        };

        fetchCourses();
    }, []);

    // Fetch course details when a course is selected
    useEffect(() => {
        if (selectedCourse) {
            const fetchCourseDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/courses/${selectedCourse}`);
                    setCourseDetails(response.data);
                } catch (err) {
                    console.error('Error fetching course details:', err);
                    setError('Failed to load course details');
                }
            };

            fetchCourseDetails();
        }
    }, [selectedCourse]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Check if payment was successful
        if (!paymentSuccess) {
            setError('Please complete the payment before registering.');
            setLoading(false);
            return;
        }

        try {

            const response = await axios.post('http://localhost:3000/api/registrations', {
                courseId: selectedCourse,
                paymentId:paymentSuccess
            });

            if (response.status === 201) {
                alert('Registration successful!');
                setSelectedCourse('');
                setCourseDetails(null);
                setPaymentSuccess(undefined);
            }
        } catch (err) {
            setError('Registration failed: ' + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

      
        const handleValueChange = (newValue) => {
          setPaymentSuccess(newValue);
        };

    return (
        <div className="registration-container">
            <h2>Register for a Course</h2>
             {/* Payment Component */}
             {courseDetails && !paymentSuccess && (
                    <div>
                        <h3>Complete Payment</h3>
                        <PaymentPage onValueChange={handleValueChange}/>
                    </div>
                )}
            <form onSubmit={handleSubmit}>
                <div>
                    {!selectedCourse ? <>
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
                    </select> </>: <p></p>}
                    
                </div>

                {/* Display course details when a course is selected */}
                {courseDetails && (
                    <div className="course-details">
                        <h3>Course Details</h3>
                        <p><strong>Title:</strong> {courseDetails.title}</p>
                        <p><strong>Description:</strong> {courseDetails.description}</p>
                        <p><strong>Credit Hour:</strong> {courseDetails.credits}</p>
                        <p><strong>Instructor:</strong> {courseDetails.instructor}</p>
                        <p><strong>Duration:</strong> {courseDetails.duration}</p>
                        <p><strong>Price:</strong> {courseDetails.price}</p>
                    </div>
                )}


                {/* Register Button */}
                {paymentSuccess && (
                    <button type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register for Course'}
                    </button>
                )}
                {!paymentSuccess && (
                    <button type="submit" disabled>
                        Complete Payment First
                    </button>
                )}
            </form>
           

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default CourseRegistration;
