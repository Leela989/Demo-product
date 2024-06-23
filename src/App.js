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
import ProductSetup from "./pages/CreateApplicationForm/ProductSetUp";
import Plan from "./pages/plan";
import Documentation from "./pages/documentation";
import SideBarHide from "./pages/SideBarHide";
import LineOfBusinessListing from "./pages/LineOfBusiness/LineOfBusinessListing";
import LineOfBusinessCreateForm from "./pages/LineOfBusiness/LineOfBusinessCreateNew";
import PlanTableData from "./pages/plan/table";
import QuotesListing from "./pages/underWriting/quotesListing";
import Quotes from "./pages/underWriting/quotes";
import CompanyMasterSetup from "./pages/CompanyMaster/CompanyMasterSetup";
import Department from "./pages/DepartmentMaster/Department";
import DepartmentList from "./pages/DepartmentMaster/DepartmentList";
import DivisionMaster from "./pages/DivisionMaster/DivisionMaster";
import DivisionsList from "./pages/DivisionMaster/DivisionsList";

function App() {
  const [token, setToken] = useState(true);

  // const location = useLocation();
  // const currentPath = location.pathname;
  // console.log("currentPath", currentPath);

  return (
    <>
      {token ? (
        <div className="App">
          <Header setToken={setToken} />
          <div className="main">
            {/* <SideBarHide/> */}
            <Sidebar linksData={linkData} />
            <div className="content">
              <Routes>
                <Route path="/docs" element={<Documentation />} />
                <Route path="/tasks" element={<HomePage />} />
                <Route
                  path="/productConfigurator/productSetup/createApplication/:id"
                  element={<ProductSetup />}
                />
                <Route
                  path="/productConfigurator/lineofbusiness"
                  element={<LineOfBusinessListing />}
                />
                <Route
                  path="/productConfigurator/LOB/createApplication"
                  element={<LineOfBusinessCreateForm />}
                />
                <Route
                  path="/productConfigurator/productSetup/editApplication/:id/:key"
                  element={<ProductSetup />}
                />
                <Route
                  path="/commonMaster/companyMaster"
                  element={<CompanyMasterSetup />}
                />
                <Route path="/plan" element={<PlanTableData />} />
                <Route path="/plan/:type/:id?" element={<Plan />} />
                <Route
                  path="/underWriting/proposal/:lob/:type/:id?"
                  element={<QuotesListing />}
                />
                <Route
                  path="/underWriting/proposal/:lob"
                  element={<Quotes />}
                />
                <Route
                  path="/commonMaster/companyMaster"
                  element={<CompanyMasterSetup />}
                />
                <Route
                  path="/commonMaster/departmentMaster"
                  element={<DepartmentList />}
                />
                <Route
                  path="/commonMaster/departmentMaster/create"
                  element={<Department />}
                />
                <Route
                  path="/commonMaster/departmentMaster/edit/:id"
                  element={<Department />}
                />
                <Route
                  path="/commonMaster/divisionMaster"
                  element={<DivisionsList />}
                />
                <Route
                  path="/commonMaster/divisionMaster/create"
                  element={<DivisionMaster />}
                />
                <Route
                  path="/commonMaster/divisionMaster/edit/:id"
                  element={<DivisionMaster />}
                />
                <Route path="/productSetup" element={<ListingPage />} />
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
