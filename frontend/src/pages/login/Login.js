import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import './Login.css';
import dabbaImage from '../../img/db_per-removebg-preview.png';
import logoImage from '../../img/Db_logo-removebg-preview.png'
import axios from "axios";

import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';


const Login = () => {
  const { isLoggedIn, userr, checkUserLoggedIn, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      alert('Please fill all the fields first.');
      return;
    }

    const formData = {
      email: loginEmail,
      password: loginPassword,
    }

    try {
      const response = await axios.post('http://localhost:8800/api/auth/login', formData, {
        withCredentials: true,
        credentials: "include",
      });
      checkUserLoggedIn();
      console.log("Login succesful");
      navigate("/");
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(signupEmail)) {
      alert('Invalid email address');
      return;
    }
    if (!validatePassword(signupPassword)) {
      alert('Password too weak. Try again.');
      return;
    }
    if (!signupName || !signupPhone) {
      alert('Please fill all the fields first.');
      return;
    }

    const formData = {
      name: signupName,
      phone: signupPhone,
      email: signupEmail,
      password: signupPassword,
    }

    console.log(formData);

    try {
      const response = await axios.post('http://localhost:8800/api/auth/register', formData);
      console.log(response.data);
      console.log("Signup succesful")
      navigate("/");
    } catch (error) {
      console.error(error.response);
    }
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordPattern.test(password);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <section className="login_container section">
      <div className="container">
        <div className="row">

          <div className="logo">
            <img src={logoImage} alt="Logo" />
          </div>
          <div className="col-md-6 col-image d-flex justify-content-center align-items-center">
            <img src={dabbaImage} alt="" className="custom-img" />

          </div>
          <div className="col-md-6 col-login d-flex justify-content-center align-items-center">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">

                  {/* Log in */}
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <form onSubmit={handleLoginSubmit}>
                          <div className="form-group">
                            <input
                              type="email"
                              name="logemail"
                              className="form-style"
                              placeholder="Your Email"
                              autoComplete="off"
                              value={loginEmail}
                              onChange={(e) => setLoginEmail(e.target.value)}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Your Password"
                              autoComplete="off"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button type="submit" className="btn mt-4">
                            Submit
                          </button>
                        </form>
                        <p className="mb-0 mt-4 text-center">
                          <a href="#0" className="link">
                            Forgot your password?
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sign up */}
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <form onSubmit={handleSignupSubmit}>
                          <div className="form-group">
                            <input
                              type="text"
                              name="logname"
                              className="form-style"
                              placeholder="Your Full Name"
                              autoComplete="off"
                              value={signupName}
                              onChange={(e) => setSignupName(e.target.value)}
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="text"
                              name="logphone"
                              className="form-style"
                              placeholder="Your Phone Number"
                              autoComplete="off"
                              value={signupPhone}
                              onChange={(e) => setSignupPhone(e.target.value)}
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              name="logemail"
                              className="form-style"
                              placeholder="Your Email"
                              autoComplete="off"
                              value={signupEmail}
                              onChange={(e) => setSignupEmail(e.target.value)}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Your Password"
                              autoComplete="off"
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button type="submit" className="btn mt-4">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Login;
