import "./App.css";
import Header from "./pages/Header/Header";
// import ProductSetup from "./pages/ProductSetup/ProductSetup";
import Sidebar from "./pages/Sidebar/Sidebar";
import { Routes, Route, useParams, Navigate } from "react-router-dom";
import Tasks from "./pages/Tasks/Tasks";
import linkData from "./pages/Sidebar/LinksData";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import LoginForm from "../src/pages/LoginPage/LoginPage";
import { useEffect, useState } from "react";
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
import CurrencyAndExchangeMaster from "./pages/currencyAndExchangeMaster/CurrencyAndExchangeMaster";
import CurrencyAndExchangeList from "./pages/currencyAndExchangeMaster/CurrencyAndExchangeList";
import UserAuthorisation_setup from "./pages/UserManagement/UserAuthorisation_setup";
import juniorOfficer_menu from "../src/pages/Sidebar/JuniorOfficerMenu";
import UserManagementListingPage from "../src/pages/UserManagement/UserManagementListingPage";
import PolicyListing from "../src/pages/underWriting/policy/PolicyListing";
import InstallPaySetup from "./pages/CompanyMaster/installPaySetup/InstallPaySetup";
import VehicleMatrix from "./pages/productConfigurator/productMaster/vehicleMatrix/VehicleMatrix";
import BulkRenewalProcessing from "./pages/underWriting/processing/BulkRenewalProcessing";
import InstallSetupListingPage from "./pages/CompanyMaster/installPaySetup/InstallSetupListingPage";
import BulkRenewalListing from "./pages/underWriting/processing/BulkRenewalListing";

import CodeMasterList from "./pages/codeMasters/List";
import VatTaxMasterList from "./pages/vat-tax-master/List";
import VatTaxMaster from "./pages/vat-tax-master/TaxMaster";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [sideBarMenu, set_sidebar_menu] = useState(linkData);
  const current_user = JSON.parse(localStorage.getItem("junior_officer"));
  // console.log(showNote, "<<<<<")

  // const location = useLocation();
  // const currentPath = location.pathname;
  // console.log("currentPath", currentPath);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    console.log("current", current_user, typeof current_user);
    if (current_user) {
      set_sidebar_menu(juniorOfficer_menu);
    } else {
      set_sidebar_menu(linkData);
    }
  }, [token]);

  return (
    <>
      {token ? (
        <div className="App">
          <Header setToken={setToken} />
          <div className="main">
            {/* <SideBarHide/> */}
            <Sidebar linksData={sideBarMenu} />
            <div className="content">
              <Routes>
                <Route
                  path="/userManagement/userAuthorisationSetup/listing"
                  element={<UserManagementListingPage />}
                />
                <Route
                  path="/userManagement/userAuthorisationSetup/createNew/:id"
                  element={<UserAuthorisation_setup />}
                />
                <Route
                  path="/userManagement/userAuthorisationSetup/editApplicaion/:id"
                  element={<UserAuthorisation_setup />}
                />
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
                  path="/underwriting/policy/motor"
                  element={<PolicyListing />}
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
                  path="/underwriting/process/bulkRenewalProcessing"
                  element={<BulkRenewalListing />}
                />
                <Route
                  path="/productConfigurator/productMaster/vehicleMatrix"
                  element={<VehicleMatrix />}
                />
                <Route
                  path="/commonMaster/companyMaster"
                  element={<CompanyMasterSetup />}
                />
                <Route path="/plan" element={<PlanTableData />} />
                <Route path="/plan/:type/:id?" element={<Plan />} />
                <Route
                  path="/underWriting/:risk/:lob/:type/:id?"
                  element={<QuotesListing />}
                />
                <Route path="/underWriting/:risk/:lob" element={<Quotes />} />
                <Route
                  path="/commonMaster/companyMaster"
                  element={<CompanyMasterSetup />}
                />
                <Route
                  path="/commonMaster/installmentPaySetupMaster"
                  element={<InstallSetupListingPage />}
                />
                <Route
                  path="/underwriting/process/bulkRenewalProcessing/create"
                  element={<BulkRenewalProcessing />}
                />
                <Route
                  path="/commonMaster/installmentPaySetupMaster/createApplication"
                  element={<InstallPaySetup />}
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
                <Route
                  path="/commonMaster/codeMaster"
                  element={<CodeMasterList />}
                />
                <Route
                  path="/commonMaster/vatTaxMaster"
                  element={<VatTaxMasterList />}
                />
                <Route
                  path="/commonMaster/vatTaxMaster/create"
                  element={<VatTaxMaster />}
                />
                <Route
                  path="/commonMaster/vatTaxMaster/edit/:id"
                  element={<VatTaxMaster />}
                />
                <Route
                  path="/commonMaster/currencyExchangeRateMaster"
                  element={<CurrencyAndExchangeList />}
                />
                <Route
                  path="/commonMaster/currencyExchangeRateMaster/create/:showNote"
                  element={<CurrencyAndExchangeMaster />}
                />
                <Route
                  path="/commonMaster/currencyExchangeRateMaster/edit/:id/:showNote"
                  element={<CurrencyAndExchangeMaster />}
                />
                <Route path="/productSetup" element={<ListingPage />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/azinsui" />} />
          <Route path="/azinsui" element={<LoginForm setToken={setToken} />} />
        </Routes>
      )}
    </>
  );
}

export default App;
