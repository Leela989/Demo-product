import "./App.css";
import Header from "./pages/Header/Header";
// import ProductSetup from "./pages/ProductSetup/ProductSetup";
import Sidebar from "./pages/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks/Tasks";
import linkData from "./pages/Sidebar/LinksData";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import LoginForm from "../src/pages/LoginPage/LoginPage";
import { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import ListingPage from "./pages/ListingPage/ListingPage";
import { useLocation } from "react-router-dom";
import ProductSetupSidebarData from "./pages/Sidebar/ProductSetupSidebarData";
import ProductSetup from './pages/CreateApplicationForm/ProductSetUp';
import Plan from "./pages/plan";
import Documentation from "./pages/documentation";

function App() {
  const [token, setToken] = useState(false);

  // const location = useLocation();
  // const currentPath = location.pathname;
  // console.log("currentPath", currentPath);

  return (
    <>
      {!token ? (
        <div className="App">
          <Header setToken={setToken}/>
          <div className="main">
            <Sidebar linksData={linkData} />
            <div className="content">
              <Routes>
              <Route path="/docs" element={<Documentation />} />
                <Route path="/plan" element={<Plan />} />
                <Route path="/tasks" element={<HomePage />} />
                <Route path="/productConfigurator/productSetup/createApplication" element={<ProductSetup />} />
                <Route
                  path="/productSetup"
                  element={<ListingPage />}
                />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <LoginForm setToken={setToken} />
      )}
      

    </>
  );
}

export default App;
