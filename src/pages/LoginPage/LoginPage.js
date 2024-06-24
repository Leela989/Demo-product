import React, { useRef, useState, useMemo } from "react";
import AzintoBackground from "../../assets/LoginImg.jpg";
import path from "../../assets/path.svg";
import "./LoginPage.css";
import LoginMainPage from "../CreateApplicationForm/Product/ProductPage";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useTranslation, Trans } from 'react-i18next';
import { Dropdown } from 'primereact/dropdown';
import countryData from '../../components/LanguageSelection/LanguageList.json';
import { Password } from 'primereact/password';


function LoginForm({ setToken }) {
  const toast = useRef(null);
  const [flag, setFlag] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({});
  const [loginDetails, setLoginDetails] = useState({
    userName: "",
    password: "",
    rememberMe: false,
  });
  const [forgotDetails, setForgotDetails] = useState({
    email: "",
  });
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleForgotInputChange = (event) => {
    const { name, value } = event.target;
    setForgotDetails({
      ...forgotDetails,
      [name]: value,
    });
  };

  const handleLanguageChange = (selectedOption) => {
    const selectedCountry = countryData.countries.find(
      (country) => country.language === selectedOption
    );
    if (selectedCountry) {
      const languageCode = selectedCountry.code.toLowerCase();
      setSelectedLanguage(selectedCountry.language);
      i18n.changeLanguage(languageCode); 
    }
  };
  

  const handleLogin = () => {
    console.log(loginDetails);
    if (
      loginDetails.userName === "Azentio" &&
      loginDetails.password === "azentio@123"
    ) {
      setIsLoggedIn(true);
      setToken(true);
      navigate("/tasks");
    } else {
      setIsLoggedIn(false);
      setToken(false);
      showMandatoryFill();
    }

    // setIsLoggedIn(true);
    // setToken(true);
    // navigate("/tasks");
  };

  const showMandatoryFill = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Incorrect user name or password",
      life: 3000,
    });
  };

  const dropdownOptions = countryData.countries.map((country) => ({
    label: (
      <div className="countryOption" style={{ display: 'flex' }}>
        <div className="countryLanguage">
          <span className="country-code ml-4">{country.language}</span>
        </div>
      </div>
    ),
    value: country.language
  }));

  function ForgotPage() {
    return (
      <div className="inputFieldContainer">
        <div className="inputUserid mb-2">
          <InputText
            type="text"
            placeholder={t("yourEmailId")}
            className="inpuFieldClass"
            name="email"
            value={forgotDetails.email}
            onChange={handleForgotInputChange}
          />
        </div>
        <div>
          <Button
            label={t("requestPassword")}
            className="logInButton w-full"
            onClick={handleForgotInputChange}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Toast ref={toast} />
      {isLoggedIn ? (
        <LoginMainPage />
      ) : (
        <div className="loginContainer flex">
          <div className="loginImage flex-1 h-full">
            <img
              src={AzintoBackground}
              alt="Background"
              className="azintoBackground"
            />
          </div>
          <div className="flex-1">
            <div className="languageSelection w-1/2 ml-auto p-3">
              <Dropdown
                value={selectedLanguage}
                options={dropdownOptions}
                onChange={(e) => handleLanguageChange(e.value)}
                placeholder="Select Language"
                optionLabel="label"
                className="w-full"
              />
            </div>
            <div className="loginForm">
              <div className="login-form-content">
                <div className="welcomeText">
                  <p className="welcome"> {t('welcome')} </p>
                </div>
                <div className="details mt-5 mb-4">
                  <p
                    className={`login-switch cursor-pointer ${
                      !flag ? "active" : null
                    }`}
                    onClick={loginPage}
                  >
                    {t("login")}
                  </p>
                  <p
                    className={`login-switch cursor-pointer ${
                      flag ? "active" : null
                    }`}
                    onClick={forgotPassword}
                  >
                    {t("forgotPassword")}
                  </p>
                </div>
                {flag ? (
                  <ForgotPage />
                ) : (
                  <div className="inputContainer">
                    <div className="inputContainer1">
                      <div className="inputUser mb-2 mt-2">
                        <InputText
                          type="text"
                          placeholder={t("username")}
                          className="inpuFieldClass"
                          name="userName"
                          value={loginDetails.userName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="inputPassword mt-4">
                        <Password
                          // type="password"
                          placeholder={t("password")}
                          className="inpuFieldClass w-full"
                          name="password"
                          value={loginDetails.password}
                          onChange={handleInputChange}
                          toggleMask
                        />
                      </div>
                      <div className="remembermeContainer mb-2 mt-4">
                        <Checkbox
                          type="checkbox"
                          inputId="checkBox"
                          name="rememberMe"
                          checked={loginDetails.rememberMe}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="checkBox" className="rememberMeText mt-4 ml-2">
                          {t("rememberMe")}
                        </label>
                      </div>
                      <div className="button mt-4">
                        <Button
                          label={t("login")}
                          className="logInButton w-full"
                          onClick={handleLogin}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
