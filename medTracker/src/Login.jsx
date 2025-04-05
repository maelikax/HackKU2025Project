import React from 'react'
import { Link } from 'react-router-dom'
import InputField from "./components/InputField"

const Login = () => {
  return (
    <div className="login-container">
      <h2 className="form-title">Log In</h2>

      <form onSubmit={handleLogin} className="login-form">
        
        <InputField type="email" placeholder="Email" />
        <InputField type="password" placeholder="Password"/>

        <a href="#" className="forgot-pass-link">Forgot Password?</a>

        <Link to="/dashboard">
          <button className="login-button">Log In</button>
        </Link>
      </form>
      
      <p className="signup-text">Don&apos;t have an account?
        <a href="#"> Create Account</a>
      </p>
    </div>
  )
}

export default Login