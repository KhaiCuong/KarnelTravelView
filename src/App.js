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
import ListLocations from "./components/Admin/Location/ListLocations";
import CreateLocation from "./components/Admin/Location/CreateLocation";
import EditLocationModel from "./components/Admin/Location/EditLocationModal";
import LocationDetail from "./components/Admin/Location/LocationDetail";

function App() {
  return (
    <>
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

        {/* View Admin */}
        <Route path="/admin/" element={<AdminLayout></AdminLayout>}>
          <Route index element={<DashboardPage />} />
          <Route path="tour">
            <Route index element={<TourManager />} />
            <Route path="detail/:id" element={<TourDetail />} />
            <Route path="create" element={<CreateTour />} />
            <Route path="update/:id" element={<UpdateTour />} />
          </Route>

          {/* <Route path="user" element={<Tour />}/> */}

          <Route path="tourist-spot">
            <Route index element={<TouristSpot />} />
            <Route path="detail/:id" element={<TouristSpotDetail />} />
            <Route path="create" element={<CreateTouristSpot />} />
            <Route path="update/:id" element={<UpdateTouristSpot />} />
          </Route>

          {/* Location Route */}
          <Route path="location">
            <Route index element={<ListLocations/>}/>
            <Route path="create" element={<CreateLocation/>}/>
            <Route path="update/:id" element={<EditLocationModel/>}/>
            <Route path="detail/:id" element={<LocationDetail />} />



          </Route>

        </Route>
      </Routes>
    </>
  );
}

export default App;
