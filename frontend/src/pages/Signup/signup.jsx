import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './signup.scss'

const Signup = () => {
  const server = process.env.REACT_APP_SERVER;
  const navigate = useNavigate();
  const [signupErrorMessage, setSignupErrorMessage] = useState('')
  const [form, setForm] = useState({
    role: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    stallName: ''
  })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setSignupErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${server}/api/auth/register-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: form.role,
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          confirmPassword: form.confirmPassword,
          stallName: form.role === 'vendor' ? form.stallName : undefined,
        }),
      });

      if (response.ok) {
        const data = await response.json(); 
        console.log('Sign-Up Successful:', data);
        navigate('/login'); 
      } else {
        const error = await response.json();
        setSignupErrorMessage(error.message || 'Failed to sign up');
        console.log(error.message || 'Failed to sign up');
      }
    } catch (error) {
      setSignupErrorMessage('An error occurred. Please try again.');
      console.log(error)
    }
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="" disabled hidden>
            Sign Up As
          </option>
          <option value="student">Student</option>
          <option value="vendor">Vendor</option>
        </select>


        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        {form.role === 'vendor' && (
          <input
            type="text"
            name="stallName"
            placeholder="Stall Name"
            value={form.stallName}
            onChange={handleChange}
            required
          />
        )}

        {signupErrorMessage && (
          <p className="error-message">{signupErrorMessage}</p>
        )}

        <button type="submit">Sign Up</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup
