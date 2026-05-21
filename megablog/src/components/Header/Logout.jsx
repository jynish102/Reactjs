import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

export default function Logout() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(logout());
        })
        .catch((e) => {
            console.log("Logout Error:", e);
        });
    }
    return ( 
        <button className="inline-block px-6 py-2 duration-300 rounded-full hover:bg-blue-200" onClick={logoutHandler}>
            Logout
        </button>

     );
}