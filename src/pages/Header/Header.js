import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { InputText } from "primereact/inputtext";
// import { IconField } from 'primereact/iconfield';
// import { InputIcon } from 'primereact/inputicon';
import { Toolbar } from "primereact/toolbar";

const Header = ({ setToken }) => {
  const menuLeft = useRef(null);
  const menuHelp = useRef(null);
  const router = useNavigate();

  const handleLogout = () => {
    setToken(false);
    router("/");
  };

  const items = [
    {
      label: "User",
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
        { label: "Chat", icon: "pi pi-comment" },
        { label: "Self-Service", icon: "pi pi-server" },
        { label: "Customer 360 degree view", icon: "pi pi-ethereum" },
      ],
    },
  ];

  const centerContent = (
    <div className="p-inputgroup search-input">
      <InputText placeholder="Search" />
      <i className="pi pi-search" />
    </div>
  );

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
        <p className="user-text">Welcome User</p>
        <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
        <Menu model={helpItems} popup ref={menuHelp} id="popup_menu_left" />
        <Button
          text
          icon="pi pi-user"
          rounded
          aria-label="User"
          className="header-buttons"
          onClick={(event) => menuLeft.current.toggle(event)}
        />
        <Button
          text
          icon="pi pi-bell"
          rounded
          aria-label="Notification"
          className="header-buttons"
        />
        <Button
          text
          icon="pi pi-envelope"
          rounded
          aria-label="Mail"
          className="header-buttons"
        />
        <Button
          text
          icon="pi pi-globe"
          rounded
          aria-label="Locale"
          className="header-buttons"
        />
        <Button
          text
          icon="pi pi-question-circle"
          rounded
          aria-label="Help"
          className="header-buttons"
          onClick={(event) => menuHelp.current.toggle(event)}
        />
      </div>
    </div>
  );
};

export default Header;
