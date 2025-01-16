import React, { useState } from 'react';
import Login from './component/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './component/Search';
import UserForm from './component/UserForm';
import CourseForm from './component/CourseForm';
import DataTable from './component/DataTable';
import Registration from './component/Registration';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import ShowReport from './component/ShowReport';
import AddReport from './component/AddReport';
import './styles.css';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(null);

  const handleLogout = () => {

    localStorage.removeItem('token');
    
    delete axios.defaults.headers.common['Authorization'];

    setToken(null);

   
  };


  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Router>
      <Navbar />
      <h1>Student Registration Dashboard</h1>
      <Routes>
        <Route  path="/" element={<Search />} />
        <Route path="/user-form" element={<UserForm />} />
        <Route path="/course-form" element={<CourseForm />} />
        <Route path="/data-table" element={<DataTable />} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/showReport" element={<ShowReport/>} />
        <Route path="/addReport" element={<AddReport/>} />
      </Routes>
      <button onClick={handleLogout}>Logout</button>
      <Footer />
    </Router>
  );
}

export default App;
