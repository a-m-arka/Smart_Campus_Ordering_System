import React, { useState } from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContext.js'

const Login = () => {
  const navigate = useNavigate();
  const server = process.env.REACT_APP_SERVER;
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const { setIsLoggedIn, setUserRole } = useGlobalContext()

  const handleSuccessfullLogin = () => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem('role', role);
    navigate('/');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`${server}/api/auth/login-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: role,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {

        const data = await response.json();
        setLoginErrorMessage('');
        localStorage.setItem('token', data.token);
        handleSuccessfullLogin();
      } else {
        const error = await response.json();
        setLoginErrorMessage(error.message || 'Failed to log in');
        console.log(error.message || 'Failed to log in');
      }
    } catch (error) {
      setLoginErrorMessage('An error occurred. Please try again.');
      console.log(error)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login to CUET-Foods</h2>

        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="" disabled hidden>
            Log In As
          </option>
          <option value="student">Student</option>
          <option value="vendor">Vendor</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {loginErrorMessage && (
          <p className="error-message">{loginErrorMessage}</p>
        )}

        <button type="submit">Log In</button>

        <p className="register">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
