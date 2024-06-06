import React, { useState } from "react";
import AzintoBackground from "../../assets/LoginImg.jpg";
import path from "../../assets/path.svg";
import "./LoginPage.css";
import LoginMainPage from "../CreateApplicationForm/Product/ProductPage";
import { useNavigate } from 'react-router-dom';

function LoginForm({ setToken }) {
  const [flag, setFlag] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    userName: '',
    password: '',
    rememberMe: false
  });
  const [forgotDetails, setForgotDetails] = useState({
    email: ''
  });
  const navigate = useNavigate();

  const loginPage = () => {
    setFlag(false);
  };

  const forgotPassword = () => {
    setFlag(true);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setLoginDetails({
      ...loginDetails,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleForgotInputChange = (event) => {
    const { name, value } = event.target;
    setForgotDetails({
      ...forgotDetails,
      [name]: value
    });
  };

  const handleLogin = () => {
    console.log(loginDetails);
    setIsLoggedIn(true);
    setToken(true);
    navigate('/tasks');
  };

  function ForgotPage() {
    return (
      <div>
        <img src={path} alt="image" className="arrowiconright" />
        <div className="inputFieldContainer">
          <div className="inputUserid">
            <input
              type="text"
              placeholder="Your Email ID"
              className="inpuFieldClass"
              name="email"
              value={forgotDetails.email}
              onChange={handleForgotInputChange}
            />
          </div>
          <div>
            <button className="logInButton">Request password</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {isLoggedIn ? (
        <LoginMainPage />
      ) : (
        <div className="loginContainer">
          <div className="loginImage">
            <img src={AzintoBackground} alt="Background" className="azintoBackground" />
          </div>
          <div className="loginForm">
            <div className="welcomeText">
              <p className="welcome"> Welcome back Abdullah! </p>
              <p className="loginText"> Login to see your notifications... </p>
            </div>
            <div className="details">
              <p className="login" onClick={loginPage}>
                Login
              </p>
              <p className="forgetPassword" onClick={forgotPassword}>
                Forget Password ?
              </p>
            </div>
            {flag ? (
              <ForgotPage />
            ) : (
              <div>
                <img src={path} alt="image" className="arrowiconLeft" />
                <div className="inputContainer">
                  <div className="inputFields">
                    <div className="inputUser">
                      <input
                        type="text"
                        placeholder="userName"
                        className="inpuFieldClass"
                        name="userName"
                        value={loginDetails.userName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="inputPassword">
                      <input
                        type="password"
                        placeholder="password"
                        className="inpuFieldClass"
                        name="password"
                        value={loginDetails.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="remembermeContainer">
                      <input
                        type="checkbox"
                        id="checkBox"
                        name="rememberMe"
                        checked={loginDetails.rememberMe}
                        onChange={handleInputChange}
                      />
                      <p className="rememberMeText"> Remember Me </p>
                    </div>
                    <div className="button">
                      <button className="logInButton" onClick={handleLogin}>
                        LOGIN
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
