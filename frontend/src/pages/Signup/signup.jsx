import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './signup.scss'

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'student',       // default role
  })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          fullName: form.name,
        }),
      });

      if (response.ok) {
        const data = await response.text(); // Adjust if the API response differs
        console.log('Sign-Up Successful:', data);
        navigate('/login'); // Redirect to login after successful signup
      } else {
        const error = await response.text();
        // setSignupErrorMessage(error || 'Failed to sign up');
        console.log(error)
      }
    } catch (error) {
      // setSignupErrorMessage('An error occurred. Please try again.');
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

        <button type="submit">Sign Up</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup
