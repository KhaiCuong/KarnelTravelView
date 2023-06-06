import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MainContent from "./components/MainContent/MainContent";
import Footer from "./components/Footer/Footer";
import TourManager from "./components/Admin/TourManager/TourManager";
import AdminLayout from "./components/Admin/AdminPage/AdminLayout";
import DashboardPage from "./components/Admin/Dashboard/DashboardPage";
import TouristSpot from "./components/Admin/TouristSpot/TouristSpotManager";

import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import { Fragment, useEffect, useState } from "react";
import Login from "./components/Admin/Login/Login";
import AccountManager from "./components/Admin/Account/AccountManager";
import ProtectRouter from "./components/Admin/Login/Service/ProtectRouter";

function App() {
  const [checkLogin, setCheckLogin] = useState(false);
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userToken")));
  }, [checkLogin]);

  return (
    <Fragment>
      <Routes>
        {/* View User */}
        <Route path="/" element={<MainLayout></MainLayout>}>
          <Route
            index
            element={
              <MainContent>
                <Home />
              </MainContent>
            }
          />
        </Route>

        <Route
          path="login"
          element={
            <Login checkLogin={checkLogin} setCheckLogin={setCheckLogin} />
          }
        />

        {/* View Admin */}
        <Route path="/admin/" element={<AdminLayout></AdminLayout>}>
          <Route
            index
            element={
              <ProtectRouter>
                <DashboardPage />
              </ProtectRouter>
            }
          />
          <Route path="tour" element={<TourManager />} />
          <Route path="account" element={<AccountManager />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
