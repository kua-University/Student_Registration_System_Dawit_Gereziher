import React from 'react';
import UserForm from './UserForm';
import CourseForm from './CourseForm';
import DataTable from './DataTable';
import Search from './Search';
import Registration from './Registration';

interface props {
  handleLogout:()=>void;
}

const Dashboard = ({handleLogout}:props) => {
  return (
    <div>
      <Search />
      <UserForm />
      <CourseForm />
      <DataTable />
      <Registration />
      <button onClick={handleLogout}>
      Logout
    </button>
    </div>
  );
};

export default Dashboard;
