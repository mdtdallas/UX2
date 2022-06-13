import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from './pages/login/Login';

const useAuth = () => {
    const accessToken = localStorage.getItem('accessToken');
    const email = localStorage.getItem('email');
    if(!email) return alert('You are not logged in');
    if(!accessToken) return;
    return accessToken
}

export default function ProtectedRoutes() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Login />
}
