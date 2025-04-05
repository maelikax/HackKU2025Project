import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

const Login = () => {

    return (
        <div className="login-container">
            <h2 className="form-title">Log In</h2>
            <form action="#" className="login-form">
                <div className="input-container">
                    <div className="input-wrapper">
                        <input className="input-field" type="email" placeholder='Email' required />
                    </div>

                    <div className="input-wrapper">
                        <input className="input-field" type="password" placeholder='Password' required />
                    </div>
                </div>
                
                <Link to="/dashboard">
                    <button>Login</button>
                </Link>
            </form>
        </div>
    )

}

export default Login;