import React, { useEffect, useState } from 'react';
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
import PaymentPage from './component/PaymentPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));


  const handleLogout = () => {

    localStorage.removeItem('token');
    
    delete axios.defaults.headers.common['Authorization'];

    setToken(null);
    return <Login setToken={setToken} />;
   };

   const checkToken = async () => {
    try {
      await axios.get('http://localhost:3000/api/verifyToken');
  
      console.log('Token is valid');
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('Token expired. Redirecting to login...');
        handleLogout();
      }
      else {
        console.error('An error occurred');
      }
 }
}

   if(!token) {
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
        <Route path="/registration" element={<Registration />} />
        <Route path="/showReport" element={<ShowReport/>} />
        <Route path="/addReport" element={<AddReport/>} />
        <Route path="/PayForRegistration" element={<PaymentPage/>} />
      </Routes>
      <button onClick={handleLogout}>Logout</button>
      <Footer />
    </Router>
  );
}
export default App;
