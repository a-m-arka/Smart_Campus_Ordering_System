import React, { useState } from 'react'
import './navbar.scss'
import logo from '../../images/logo2-black.png'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { IoMdCart } from 'react-icons/io'
import { MdAccountCircle, MdMenuBook } from 'react-icons/md'
import { IoLogIn, IoLogOut, IoFastFood, IoReceipt } from 'react-icons/io5'
import { BiSolidStore } from 'react-icons/bi'
import { GoHomeFill } from 'react-icons/go'
import { useGlobalContext } from '../../context/GlobalContext.js'
import Ensure from '../PopUps/ensure.jsx'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpenPopUp, setIsOpenPopUp] = useState(false)
  const { isLoggedIn, setIsLoggedIn, userRole, setUserRole, setUserData } = useGlobalContext()

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userData')
    setIsLoggedIn(false)
    setUserRole('')
    setUserData(null)
    navigate('/')
  }

  const handleYes = () => {
    setIsOpenPopUp(false)
    handleLogOut()
  }

  const handleNo = () => {
    setIsOpenPopUp(false)
  }

  return (
    <div className='navbar'>
      {isOpenPopUp && (
        <Ensure
          message={"Are you sure you want to log out?"}
          onYes={handleYes}
          onNo={handleNo}
        />
      )}
      <div className='logo'>
        <Link to={userRole === 'vendor' ? '#' : '/'} style={{ textDecoration: 'none' }}>
          <img src={logo} alt='' />
        </Link>
      </div>
      <div className='nav-links'>
        <ul>
          {userRole !== 'vendor' && (
            <Link to='/home' style={{ textDecoration: 'none' }}>
              <li
                className={`icon ${location.pathname === '/home' || location.pathname === '/' ? 'active' : ''}`}
                data-tooltip='Home'
              >
                <GoHomeFill />
              </li>
            </Link>
          )}

          {userRole !== 'vendor' && (
            <>
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
            </>
          )}

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

              {userRole === 'vendor' && (
                <Link to='/vendor_menu' style={{ textDecoration: 'none' }}>
                  <li
                    className={`icon ${location.pathname === '/vendor_menu' ? 'active' : ''}`}
                    data-tooltip='Menu'
                  >
                    <MdMenuBook />
                  </li>
                </Link>
              )}

              <Link
                to={userRole === 'student' ? '/user_order' : '/vendor_order'}
                style={{ textDecoration: 'none' }}
              >
                <li
                  className={`icon ${location.pathname === '/user_order' || location.pathname === '/vendor_order' ? 'active' : ''}`}
                  data-tooltip='Orders'
                >
                  <IoReceipt />
                </li>
              </Link>

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
                onClick={() => setIsOpenPopUp(true)}
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
