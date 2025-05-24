import React, { useState } from 'react'
import './login.scss'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')   // default role

  const handleSubmit = e => {
    e.preventDefault()
    // TODO: replace with real authentication logic
    // email, password, role → send to backend
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
