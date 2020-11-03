import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { logOutUser } from '../../actions'

export default function Navbar() {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser.currentUser)

  const handleClick = () => {
    dispatch(logOutUser())
    Cookies.remove('token')
  }

  return (
    <nav className="bg-dark sticky-top py-1">
      <div className="container d-flex flex-column flex-md-row justify-content-center">
        <NavLink className="py-2 d-none d-md-inline-block mr-5 pr-5 text-white text-decoration-none font-weight-bold" to="/">Home</NavLink>
        <NavLink className="py-2 d-none d-md-inline-block mr-5 pr-5 text-white text-decoration-none font-weight-bold" to="/register">Register</NavLink>
        <NavLink className="py-2 d-none d-md-inline-block mr-5 pr-5 text-white text-decoration-none font-weight-bold" to="/login">Login</NavLink>
        <NavLink className="py-2 d-none d-md-inline-block mr-5 pr-5 text-white text-decoration-none font-weight-bold" to="/users/me">Profile</NavLink>
        {!Array.isArray(currentUser) &&
          <NavLink onClick={() => handleClick()} className="py-2 d-none d-md-inline-block mr-5 pr-5 text-white text-decoration-none font-weight-bold" to="/">Logout</NavLink>
        }
      </div>
    </nav>
  )
}
