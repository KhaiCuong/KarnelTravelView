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
import RestaurantManager from "./components/Admin/RestaurantManager/RestaurantManager";

function App() {
  return (
    <Routes>
      {/* View User */}
      <Route path="/" element={ <MainLayout></MainLayout>}>
          <Route index element={<MainContent><Home/></MainContent>} />
      </Route>



      {/* View Admin */}
      <Route path="/admin/" element={<AdminLayout></AdminLayout>}>
        <Route index element={<DashboardPage />} />
        <Route path="tour" element={<TourManager />} />
        <Route path="restaurant" element={<RestaurantManager />} />
      </Route>

      
    </Routes>
  );
}

export default App;
