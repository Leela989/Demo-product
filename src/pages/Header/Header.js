import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { useTranslation } from 'react-i18next';
import countryData from '../../components/LanguageSelection/LanguageList.json';
import "./Header.css";
import { Tooltip } from 'primereact/tooltip';

const Header = ({ setToken }) => {
  const menuLeft = useRef(null);
  const menuHelp = useRef(null);
  const menuGlobe = useRef(null);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  let userNameIs = localStorage.getItem("username");

  const handleLogout = () => {
    setToken(false);
    navigate("/");
  };

  const items = [
    {
      label: userNameIs,
      items: [
        { label: "Profile", icon: "pi pi-user" },
        { label: "Settings", icon: "pi pi-cog" },
        { label: "Logout", icon: "pi pi-sign-out", command: handleLogout },
      ],
    },
  ];

  const helpItems = [
    {
      label: "Help",
      items: [
        { label: "Self-Service", icon: "pi pi-server" },
        { label: "Customer 360 degree view", icon: "pi pi-ethereum" },
      ],
    },
  ];

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

  const onLanguageChange = (e) => {
    const selectedOption = e.item.value;
    const selectedCountry = countryData.countries.find(
      (country) => country.language === selectedOption
    );
    if (selectedCountry) {
      const languageCode = selectedCountry.code.toLowerCase();
      setSelectedLanguage(selectedCountry.language);
      i18n.changeLanguage(languageCode);
    }
  };

  const countryItems = dropdownOptions.map(option => ({
    label: option.label,
    command: onLanguageChange,
    value: option.value
  }));

  return (
    <div className="header">
      <img className="az-logo" src="/icons/AZ_logo.png" alt="azentio logo" />
      <div>
        <div className="p-inputgroup search-input">
          <InputText placeholder="Search" className="searchBar" />
          <i className="pi pi-search" />
        </div>
      </div>
      <div className="header-panel">
        <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
        <Menu model={helpItems} popup ref={menuHelp} id="popup_menu_help" />
        <Menu model={countryItems} popup ref={menuGlobe} id="popup_menu_globe" />
        <Button
          text
          icon="pi pi-user"
          rounded
          aria-label="User"
          className="header-buttons"
          tooltip="Profile" tooltipOptions={{ position: 'bottom' }} 
          onClick={(event) => menuLeft.current.toggle(event)}
        />
        <Button
          text
          icon="pi pi-clipboard"
          rounded
          aria-label="User"
          className="header-buttons"
          tooltip="Notes" tooltipOptions={{ position: 'bottom' }} 
          onClick={(event) => menuLeft.current.toggle(event)}
        />
        <Button
          text
          icon="pi pi-bell"
          rounded
          aria-label="Notification"
          className="header-buttons"
          tooltip="Notifications" tooltipOptions={{ position: 'bottom' }} 
        />
        <Button
          text
          icon="pi pi-envelope"
          rounded
          aria-label="Mail"
          className="header-buttons"
          tooltip="Mail" tooltipOptions={{ position: 'bottom' }} 
        />
        <Button
          text
          icon="pi pi-globe"
          rounded
          aria-label="Locale"
          className="header-buttons"
          tooltip="Select Language" tooltipOptions={{ position: 'bottom' }} 
          onClick={(event) => menuGlobe.current.toggle(event)}
        />
        <Button
          text
          icon="pi pi-comment"
          rounded
          aria-label="Comment"
          className="header-buttons"
          tooltip="Comments" tooltipOptions={{ position: 'bottom' }} 
        />
        <Button
          text
          icon="pi pi-ethereum"
          rounded
          aria-label="Ethereum"
          className="header-buttons"
          tooltip="360 degree Customer View" tooltipOptions={{ position: 'bottom' }} 
        />
        <Button
          text
          icon="pi pi-question-circle"
          rounded
          aria-label="Help"
          className="header-buttons"
          tooltip="Help" tooltipOptions={{ position: 'bottom' }} 
          onClick={(event) => menuHelp.current.toggle(event)}
        />
      </div>
    </div>
  );
};

export default Header;
