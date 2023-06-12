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
import UserDetailAccommodation from "./components/User/Accommodation/UserDetailAccommodation";
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

import Register from "./components/Admin/Login/Register";
import NotFound from "./components/NotFound/NotFound";

import UserAccommodation from "./components/User/Accommodation/UserAccommodation";
import DetailAccommodation from "./components/Admin/Accommodation/DetailAccommodation";
import TransportManager from "./components/Admin/Transport/TransportManager";
import CreateTransport from "./components/Admin/Transport/CreateTransport";
import TransportDetail from "./components/Admin/Transport/TransportDetail";
import TransportUpdate from "./components/Admin/Transport/TransportUpdate";
//import Admin Restauratn
import ListRestaurant from "./components/Admin/RestaurantManager/ListRestaurant";
import CreateRestaurant from "./components/Admin/RestaurantManager/CreateRestaurant";
import UpdateRestaurant from "./components/Admin/RestaurantManager/UpdateRestaurant";
import DetailRestaurant from "./components/Admin/RestaurantManager/DetailRestaurant";
// import User Restaurant
import Restaurant from "./components/User/Restaurant/Restaurant";
import DetailofRestaurant from "./components/User/Restaurant/DetailRestaurant";
import UserTransport from "./components/User/Transport/UserTransport";
import UserDetailTransport from "./components/User/Transport/UserDetailTransport";
import Booking from "./components/User/Booking/Booking";
import AccountDetailManager from "./components/Admin/Account/AccountDetailManager";
import PersonalProfile from "./components/User/ProfileUser/ProfileUser";

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
          {/* View transport user */}
          <Route path="usertransport">
            <Route index element={<UserTransport />} />
            <Route path="detail/:id" element={<UserDetailTransport />} />
          </Route>

          <Route path="restaurant">
            <Route index element={<Restaurant />} />
            <Route path="detail/:id" element={<DetailofRestaurant />} />
          </Route>

          <Route path="accommodation">
            <Route index element={<UserAccommodation />} />
            <Route path="detail/:id" element={<UserDetailAccommodation />} />
          </Route>
        </Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="profileuser">
            <Route index element={<PersonalProfile/>} />
          </Route>

        <Route path="booking/:id" element={<Booking></Booking>} />

        <Route
          path="login"
          element={
            <Login checkLogin={checkLogin} setCheckLogin={setCheckLogin} />
          }
        />

        {/* View Admin */}
        <Route path="/admin/" element={<AdminLayout></AdminLayout>}>
          <Route index element={<DashboardPage />} />

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

          <Route path="transport">
            <Route index element={<TransportManager />} />
            <Route path="create" element={<CreateTransport />} />
            <Route path="detail/:id" element={<TransportDetail />} />
            <Route path="update/:id" element={<TransportUpdate />} />
          </Route>

          <Route path="restaurant">
            <Route index element={<ListRestaurant />} />
            <Route path="detailRestaurant/:id" element={<DetailRestaurant />} />
            <Route path="createRestaurant" element={<CreateRestaurant />} />
            <Route path="updateRestaurant/:id" element={<UpdateRestaurant />} />
          </Route>
          <Route path="account">
            <Route index element={<AccountManager />} />
            <Route path="detailUser/:id" element={<AccountDetailManager />} />
          </Route>
         
          <Route path="accommodation">
            <Route index element={<ListAccommodation />} />
            <Route
              path="createAccommodation"
              element={<CreateAccommodation />}
            />
            <Route
              path="updateAccommodation/:id"
              element={<UpdateAccommodation />}
            />
            <Route
              path="detailAccommodation/:id"
              element={<DetailAccommodation />}
            />
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
