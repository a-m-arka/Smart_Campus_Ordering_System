import React, { useState } from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'
import { IoMdCart } from "react-icons/io"
import { CgProfile } from "react-icons/cg"
import { FiLogIn, FiLogOut } from "react-icons/fi"

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [userRole, setUserRole] = useState('student')

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Log out logic here
      setIsLoggedIn(false)
    } else {
      // Redirect to login page handled via Link
    }
  }

  return (
    <div className='navbar'>
      <div className="logo">
        CUET-Foods
      </div>
      <div className="nav-links">
        <ul>
          <Link to='/home' style={{ textDecoration: "none" }}>
            <li>Home</li>
          </Link>
          <Link to='/foods' style={{ textDecoration: "none" }}>
            <li>Foods</li>
          </Link>
          <Link to='/vendors' style={{ textDecoration: "none" }}>
            <li>Vendors</li>
          </Link>
          <Link to='/cart' style={{ textDecoration: "none" }}>
            <li className='icon'><IoMdCart /></li>
          </Link>
          <li className='icon' onClick={handleAuthClick}>
            <Link to={isLoggedIn ? '/' : '/login'} style={{ textDecoration: "none", color: "inherit" }}>
              {isLoggedIn ? <FiLogOut /> : <FiLogIn />}
            </Link>
          </li>
          {isLoggedIn && (
            <Link to={userRole === 'student' ? '/user_profile' : '/vendor_profile'} style={{ textDecoration: "none" }}>
              <li className='icon'><CgProfile /></li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
