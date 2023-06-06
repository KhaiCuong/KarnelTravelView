import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MainContent from "./components/MainContent/MainContent";
import Footer from "./components/Footer/Footer";
import AdminLayout from "./components/Admin/AdminPage/AdminLayout";
import DashboardPage from "./components/Admin/Dashboard/DashboardPage";
import TouristSpot from "./components/Admin/TouristSpot/TouristSpotManager";

import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import TourDetail from "./components/Admin/Tour/TourDetail";
import { Details } from "@mui/icons-material";
import CreateTour from "./components/Admin/Tour/TourCreate";
import TourManager from "./components/Admin/Tour/TourManager";
import CreateTouristSpot from "./components/Admin/TouristSpot/TouristSpotCreate";
import UpdateTour from "./components/Admin/Tour/TourUpdate";
import TouristSpotDetail from "./components/Admin/TouristSpot/TouristSpotDetail";
import UpdateTouristSpot from "./components/Admin/TouristSpot/TouristSpotUpdate";
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
    //     {/* View Admin */}
    //     <Route path="/admin/" element={<AdminLayout></AdminLayout>}>
    //       <Route index element={<DashboardPage />} />
    //       <Route path="tour">
    //         <Route index element={<TourManager />} />
    //         <Route path="detail/:id" element={<TourDetail />} />
    //         <Route path="create" element={<CreateTour />} />
    //         <Route path="update/:id" element={<UpdateTour />} />
    //       </Route>

    //       {/* <Route path="user" element={<Tour />}/> */}

    //       <Route path="tourist-spot">
    //         <Route index element={<TouristSpot />} />
    //         <Route path="detail/:id" element={<TouristSpotDetail />} />
    //         <Route path="create" element={<CreateTouristSpot />} />
    //         <Route path="update/:id" element={<UpdateTouristSpot />} />
    //       </Route>
    //     </Route>
    //   </Routes>
    // </>
  );
}

export default App;
