import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MainContent from "./components/MainContent/MainContent";
import Footer from "./components/Footer/Footer";
import AdminLayout from "./components/Admin/AdminPage/AdminLayout";
import DashboardPage from "./components/Admin/Dashboard/DashboardPage";
import TouristSpot from "./components/Admin/TouristSpot/TouristSpotManager";
import MainLayout from "./components/Layout/MainLayout";
import CreateAccommodation from "./components/Admin/Accommodation/CreateAccommodation";
import ListAccommodation from "./components/Admin/Accommodation/ListAccommodation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpdateAccommodation from "./components/Admin/Accommodation/UpdateAccommodation";
import DetailAccommodation from "./components/Admin/Accommodation/DetailAccommodation";
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
import NotFound from "./components/NotFound/NotFound";

import ListRestaurant from "./components/Admin/RestaurantManager/ListRestaurant";
import CreateRestaurant from "./components/Admin/RestaurantManager/CreateRestaurant";
import UpdateRestaurant from "./components/Admin/RestaurantManager/UpdateRestaurant";
import DetailRestaurant from "./components/Admin/RestaurantManager/DetailRestaurant";


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
          <Route path="restaurant" element={<ListRestaurant></ListRestaurant>}></Route>
        </Route>

        <Route path="login" element={<Login checkLogin={checkLogin} setCheckLogin={setCheckLogin} />} />

        {/* View Admin */}
        <Route path="/admin/" element={<AdminLayout></AdminLayout>}>
          <Route index element={ <DashboardPage /> }/>

          <Route path="tour">
            <Route index element={<TourManager />} />
            <Route path="detail/:id" element={<TourDetail />} />
            <Route path="create" element={<CreateTour />} />
            <Route path="update/:id" element={<UpdateTour />} />
          </Route>
          <Route path="tourist-spot">
            <Route index element={<TouristSpot />} />
            <Route path="detail/:id" element={<TouristSpotDetail />} />
            <Route path="create" element={<CreateTouristSpot />} />
            <Route path="update/:id" element={<UpdateTouristSpot />} />
          </Route>
          <Route path="restaurant" >
          <Route index element={<ListRestaurant />} />
          <Route path="detailRestaurant/:id" element={<DetailRestaurant/>} />
          <Route path="createRestaurant" element={<CreateRestaurant/>} />
          <Route path="updateRestaurant/:id" element={<UpdateRestaurant />} />
        </Route>
          <Route path="account" element={<AccountManager />} />
          <Route path="accommodation">
            <Route index element={<ListAccommodation />} />
            <Route path="createAccommodation" element={<CreateAccommodation />} />
            <Route path="updateAccommodation/:id" element={<UpdateAccommodation />} />
            <Route path="detailAccommodation/:id" element={<DetailAccommodation />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />

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
    // {/* View Admin */}
    // </Routes>
    //     {/* <Header/> */ }
    // {/* <Home/> */ }
    // {/* <MainContent/> */ }
    // {/* <TourManager /> */ }
    // {/* <Footer/> */ }
  );
}

export default App;
