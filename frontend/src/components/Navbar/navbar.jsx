import React from 'react'
import './navbar.scss'
import logo from '../../images/logo2-black.png'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { IoMdCart } from 'react-icons/io'
import { MdAccountCircle } from 'react-icons/md'
import { IoLogIn, IoLogOut, IoFastFood } from 'react-icons/io5'
import { BiSolidStore } from 'react-icons/bi'
import { GoHomeFill } from 'react-icons/go'
import { useGlobalContext } from '../../context/GlobalContext.js'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isLoggedIn, setIsLoggedIn, userRole, setUserRole } = useGlobalContext()

  const handleLogOut = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    setUserRole('')
    navigate('/')
  }

  return (
    <div className='navbar'>
      <div className='logo'>
        <Link to='/'>
          <img src={logo} alt='' />
        </Link>
      </div>
      <div className='nav-links'>
        <ul>
          <Link to='/home' style={{ textDecoration: 'none' }}>
            <li
              className={`icon ${location.pathname === '/home' || location.pathname === '/' ? 'active' : ''}`}
              data-tooltip='Home'
            >
              <GoHomeFill />
            </li>
          </Link>
          <Link to='/foods' style={{ textDecoration: 'none' }}>
            <li
              className={`icon ${location.pathname === '/foods' ? 'active' : ''}`}
              data-tooltip='Foods'
            >
              <IoFastFood />
            </li>
          </Link>
          <Link to='/vendors' style={{ textDecoration: 'none' }}>
            <li
              className={`icon ${location.pathname === '/vendors' ? 'active' : ''}`}
              data-tooltip='Vendors'
            >
              <BiSolidStore />
            </li>
          </Link>

          {isLoggedIn ? (
            <>
              {userRole === 'student' && (
                <Link to='/cart' style={{ textDecoration: 'none' }}>
                  <li
                    className={`icon ${location.pathname === '/cart' ? 'active' : ''}`}
                    data-tooltip='Cart'
                  >
                    <IoMdCart />
                  </li>
                </Link>
              )}

              <Link
                to={userRole === 'student' ? '/user_profile' : '/vendor_profile'}
                style={{ textDecoration: 'none' }}
              >
                <li
                  className={`icon ${location.pathname === '/user_profile' || location.pathname === '/vendor_profile' ? 'active' : ''}`}
                  data-tooltip='Profile'
                >
                  <MdAccountCircle />
                </li>
              </Link>

              <li
                className='icon'
                data-tooltip='Log Out'
                onClick={handleLogOut}
                style={{ cursor: 'pointer' }}
              >
                <IoLogOut />
              </li>
            </>
          ) : (
            <Link to='/login' style={{ textDecoration: 'none', color: 'inherit' }}>
              <li
                className={`icon ${location.pathname === '/login' || location.pathname === '/signup' ? 'active' : ''}`}
                data-tooltip='Log In'
              >
                <IoLogIn />
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
