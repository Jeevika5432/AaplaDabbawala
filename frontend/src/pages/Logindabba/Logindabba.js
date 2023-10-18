import React, { useState } from 'react';
import './Logindabba.css';
import dabbaImage from '../../img/db_per-removebg-preview.png';
import logoImage from '../../img/Db_logo-removebg-preview.png'
import axios from "axios"
import { useNavigate } from "react-router-dom";

import { DabbaContext } from '../../context/DabbaContext';
import { useContext } from 'react';


const Logindabba = () => {
  const navigate = useNavigate();
  const { isLoggedInD, dabbaa, setDabbaa, checkDabbaLoggedIn, handleLogout2 } = useContext(DabbaContext);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [file, setFile] = useState(null);


  function handleChange(e) {
    if (e.target.type === 'file') {
      setFile(e.target.files[0]);
    }
  }

  // Handles login form submission
  const handleLoginSubmit = async (e) => {
    if (!loginEmail || !loginPassword) {
      alert('Please fill all the fields first.');
      return;
    }

    const formData = {
      email: loginEmail,
      password: loginPassword,
    }

    try {
      const response = await axios.post('http://localhost:8800/api/auth2/login', formData, {
        withCredentials: true,
        credentials: "include",
      });
      checkDabbaLoggedIn();
      console.log("Login succesful");
      navigate("/dabbawalaform");
    } catch (error) {
      console.error(error.response);
    }
  };

  // Handles signup form submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', signupName);
      formData.append('email', signupEmail);
      formData.append('password', signupPassword);
      formData.append('aadharCard', file);

      const response = await axios.post('http://localhost:8800/api/auth2/register', formData);
      console.log('Signup response:', response.data);
      // Handle the signup response as needed

      setSignupName('');
      setSignupEmail('');
      setSignupPassword('');
      setFile(null);
      navigate("/");
    } catch (error) {
      console.error('Signup error:', error);
    }
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

                  {/* Login Form */}
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
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
                        <button className="btn mt-4" onClick={handleLoginSubmit}>
                          submit
                        </button>
                        <p className="mb-0 mt-4 text-center">
                          <a href="#0" className="link">
                            Forgot your password?
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Signup Form */}
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
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
                        <div className="form-group mt-2 w-[350px]">
                          <input
                            type="file"
                            name=""
                            className="form-style"
                            placeholder=""
                            onChange={handleChange}
                          />
                          <img
                            src={file ? URL.createObjectURL(file) : ''}
                            alt=""
                            className="mx-12 -mt-4 py-2 object-contain w-20 z-20"
                          />
                        </div>
                        <button className="btn mt-4" onClick={handleSignupSubmit}>
                          submit
                        </button>
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

export default Logindabba;
