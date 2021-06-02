import * as React from 'react';
import { Redirect } from 'react-router';
import AdminLayout from '../components/Admin/AdminLayout';
import { useSelector } from "react-redux";

const Admin = () => {
  const user = useSelector(({user}) =>(user.user));
  if (user.user_type !== 'admin'){
    return <Redirect to='/'/>
  }
  return <AdminLayout />;
};

export default Admin;
