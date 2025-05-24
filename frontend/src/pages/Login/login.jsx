import React, { useState } from 'react'
import './login.scss'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')   // default role

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {

        const data = await response.json();
        console.log('Login successful');
        // setLoginErrorMessage('');
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedin', true);
        // handleSuccessfullLogin();

        const token = localStorage.getItem('token');
        console.log('Token:', token);

      } else {
        const error = await response.text();
        // setLoginErrorMessage(error || 'Failed to log in');
        console.log(error)
      }
    } catch (error) {
      // setLoginErrorMessage('An error occurred. Please try again.');
      console.log(error)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login to CUET-Foods</h2>

        <select value={role} onChange={e => setRole(e.target.value)}>
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

        <button type="submit">Log In</button>

        <p className="register">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
