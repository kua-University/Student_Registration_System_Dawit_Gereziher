import React, { useState } from 'react';
import axios from 'axios';

const CourseForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [credits, setCredits] = useState();
  const [instructor, setInstructor] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://student-registration-system-6zuf.onrender.com/api/courses', { title, description, credits, instructor });
      alert('Course created successfully!');
    } catch (err) {
      alert('Failed to create course.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Course</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
       <input
        type="number"
        placeholder="Credits"
        value={credits}
        onChange={(e) => setCredits(e.target.value)}
        required
      />
       <input
        type="text"
        placeholder="Instructor"
        value={instructor}
        onChange={(e) => setInstructor(e.target.value)}
        required
      />
      <button type="submit">Create Course</button>
    </form>
  );
};

export default CourseForm;
