import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MainContent from "./components/MainContent/MainContent";
import Footer from "./components/Footer/Footer";
import TourManager from "./components/Admin/TourManager/TourManager";
import AdminLayout from "./components/Admin/AdminPage/AdminLayout";
import DashboardPage from "./components/Admin/Dashboard/DashboardPage";
import TouristSpot from "./components/Admin/TouristSpot/TouristSpotManager";
import MainLayout from "./components/Layout/MainLayout";
import CreateAccommodation from "./components/Admin/Accommodation/CreateAccommodation";
import ListAccommodation from "./components/Admin/Accommodation/ListAccommodation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpdateAccommodation from "./components/Admin/Accommodation/UpdateAccommodation";
import DetailAccommodation from "./components/Admin/Accommodation/DetailAccommodation";

function App() {
  return (
    <Routes>
      {/* View User */}
      <Route path="/" element={<MainLayout></MainLayout>}>
        <Route index element={<MainContent><Home /></MainContent>} />
      </Route>



      {/* View Admin */}
      <Route path="/admin/" element={<AdminLayout></AdminLayout>}>
        <Route index element={<DashboardPage />} />
        <Route path="tour" element={<TourManager />} />
        <Route path="accommodation">
          <Route index element={<ListAccommodation />} />
          <Route path="createAccommodation" element={<CreateAccommodation />} />
          <Route path="updateAccommodation/:id" element={<UpdateAccommodation />} />
          <Route path="detailAccommodation/:id" element={<DetailAccommodation />} />
        </Route>
      </Route>
    </Routes>
    //     {/* <Header/> */ }
    // {/* <Home/> */ }
    // {/* <MainContent/> */ }
    // {/* <TourManager /> */ }
    // {/* <Footer/> */ }
  );
}

export default App;
