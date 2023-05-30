import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MainContent from "./components/MainContent/MainContent";
import Footer from "./components/Footer/Footer";
import TourManager from "./components/Admin/TourManager/TourManager";

function App() {
  return (
  <>
    <Header/>
    {/* <Home/> */}
    {/* <MainContent/> */}
    <TourManager/>
    <Footer/>
  </>
  );
}

export default App;
