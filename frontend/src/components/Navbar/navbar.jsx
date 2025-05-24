import React, { useState, useEffect } from 'react'
import './navbar.scss'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdCart } from "react-icons/io"
import { CgProfile } from "react-icons/cg"
import { FiLogIn, FiLogOut } from "react-icons/fi"

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedin') === 'true'
    const storedRole = localStorage.getItem('role') || ''
    setIsLoggedIn(storedLogin)
    setUserRole(storedRole)
  }, [])

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('isLoggedin')
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      setIsLoggedIn(false)
      setUserRole('')
      navigate('/')
    }
  }

  return (
    <div className='navbar'>
      <div className="logo">
        CUET-Foods
      </div>
      <div className="nav-links">
        <ul>
          <Link to='/home' style={{ textDecoration: "none" }}><li>Home</li></Link>
          <Link to='/foods' style={{ textDecoration: "none" }}><li>Foods</li></Link>
          <Link to='/vendors' style={{ textDecoration: "none" }}><li>Vendors</li></Link>
          <Link to='/cart' style={{ textDecoration: "none" }}><li className='icon'><IoMdCart /></li></Link>

          {isLoggedIn ? (
            <>
              <li className='icon' onClick={handleAuthClick} style={{ cursor: 'pointer' }}>
                <FiLogOut />
              </li>
              <Link
                to={userRole === 'student' ? '/user_profile' : '/vendor_profile'}
                style={{ textDecoration: "none" }}
              >
                <li className='icon'><CgProfile /></li>
              </Link>
            </>
          ) : (
            <Link to='/login' style={{ textDecoration: "none", color: "inherit" }}>
              <li className='icon'><FiLogIn /></li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
