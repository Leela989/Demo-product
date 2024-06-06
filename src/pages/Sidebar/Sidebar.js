import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({linksData}) => {

  const [openSubMenus, setOpenSubMenus] = useState([])
  const location = useLocation();

  const changeSubMenuState = (menu) =>{
    if(openSubMenus.includes(menu)){
      setOpenSubMenus(openSubMenus.filter(submenu => submenu !== menu))
    }else{
      setOpenSubMenus([...openSubMenus, menu])
    }
  }
  useEffect(() => {
    const initializeOpenSubMenus = (links, currentPath, openMenus = []) => {
      links.forEach(link => {
        if (link.subLinks) {
          const matchingSubLink = link.subLinks.find(subLink => currentPath.startsWith(subLink.link));
          if (matchingSubLink) {
            openMenus.push(link.label);
            initializeOpenSubMenus(link.subLinks, currentPath, openMenus);
          }
        }
      });
      return openMenus;
    };

    const openMenus = initializeOpenSubMenus(linksData, location.pathname);
    setOpenSubMenus(openMenus);
  }, [location.pathname, linksData]);

  const renderLinks = (links) => {
    return (
      <>
        {links.map((link) => (
          <>
          
          {link.subLinks ? (
            <>
            <button className='submenu' onClick={()=>changeSubMenuState(link.label)}>
              <div className='submenu-icon'>
                {link.label}
                {openSubMenus.includes(link.label) ? <i class="pi pi-chevron-circle-down" /> :
                <i class="pi pi-chevron-circle-right" /> 
                 }
              </div>
            </button>
              { openSubMenus.includes(link.label) && <ul className='inner-ul'>
                {renderLinks(link.subLinks)}
              </ul>}
              </>
              )
            :   
            <li key={link.label}>
            <NavLink
              className={({ isActive }) => (isActive ? "active nav-link" : "inactive nav-link")}
              to={link.link}
            >
              <span className='flex items-center'>{link.label}</span>
            </NavLink>
          </li>
            }
          </>

        ))}
    </>
    );
  };

  return(
    <div className='sidebar theme-white'>
      <ul>{renderLinks(linksData)}</ul>
    </div>
  )
}

export default Sidebar;
