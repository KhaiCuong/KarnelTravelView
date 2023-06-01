import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MainContent from "./components/MainContent/MainContent";
import Footer from "./components/Footer/Footer";
import TourManager from "./components/Admin/TourManager/TourManager";
import Accommodation from "./components/Admin/Accommodation/Accommodation";
import CreateAccommodation from "./components/Admin/Accommodation/CreateAccommodation";
import ListAccommodation from "./components/Admin/Accommodation/ListAccommodation";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes >
      <Route path="/accommodation/" element={<Accommodation />}>
        <Route path="createAccommodation" element={<CreateAccommodation />} />
        <Route path="listAccommodation" element={<ListAccommodation />} />
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
