import { React, useEffect, useState } from "react";
import "./home.css";
import Video from "../../assets/flycam-danang.mp4";
import { LocationOnOutlined, FilterListOutlined, FacebookOutlined, Instagram, CardTravel, FormatListBulleted, AppRegistrationOutlined } from "@mui/icons-material";
import { useSearch } from "../contexts/SearchContext";

// animation on scroll
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { sendInfo, itemSearch } = useSearch();

  // search
  // const [rs, setRs] = useState(0);
  const navigate = useNavigate();
  const [fKey, setFKey] = useState("");
  const [fService, setFService] = useState([]);
  const [fPrice, setFPrice] = useState(100000);
  const [isHiden, setIsHiden] = useState(true);
  const handelFilter = () => {
    sendInfo(fKey, fService, fPrice);
    if (fService === "Accommodation") {
      navigate("/accommodation");
    } else if (fService === "Restaurant") {
      navigate("/restaurant");
    } else if (fService === "Tour") {
      navigate("/tour");
    } else if (fService === "Tourist Sppot") {
      navigate("/touristsport");
    } else if (fService === "Transport") {
      navigate("/usertransport");
    }
  };
  const FilterKey = (e) => {
    setFKey(e.target.value);
    console.log("e.target.value", e.target.value);
  };
  const FilterService = (e) => {
    setFService(e.target.value);
    console.log("e.target.value", e.target.value);
  };
  const FilterPrice = (e) => {
    setFPrice(e.target.value);
    console.log("e.target.value", e.target.value);
  };
  const handelHiden = (e) => {
    setIsHiden(false);
  };
  const handelDisplay = (e) => {
    setIsHiden(true);
  };

  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  return (
    <section className="home">
      <div className="overlay"></div>
      <video src={Video} autoPlay muted loop type="video/mp4"></video>
      <div className="homeContent container">
        <div className="textDiv">
          <span data-aos="fade-up" className="smallText">
            Our Services
          </span>
          <h1 data-aos="fade-up" className="homeTitle">
            Search your Holidays
          </h1>
        </div>
        {/* <form action=""> */}
        <div data-aos="fade-up" className="cardDiv grid">
          <div className="destinationInput">
            <label htmlFor="city">Search your destination:</label>
            <div className="input flex">
              <input type="text" placeholder="Input your destination" onChange={FilterKey} />
              <LocationOnOutlined className="icon" />
            </div>
          </div>

          <div className="dateInput">
            <label htmlFor="date">Select the Service:</label>
            <div className="input flex">
              <select name="" id="" placeholder="Keyword search" onChange={FilterService} className="w-100" style={{ border: "none", backgroundColor: "#efefef" }}>
                <option value="">Select Service</option>
                <option value="Accommodation">Accommodation</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Tourist Sppot">Tourist Sppot</option>
                <option value="Tour">Tour</option>
                <option value="Transport">Transport</option>
              </select>
            </div>
          </div>

          <div className="priceInput">
            <div className="label_total flex">
              <label htmlFor="price">Max Price:</label>
              <h3 className="total">$10000</h3>
            </div>
            <div className="input flex position-relative ">
              <p className="position-absolute text-light mb-0 bg-secondary pl-1 pr-1 rounded " style={{ bottom: "100%", left: "43%" }} hidden={isHiden}>
                {fPrice}
              </p>
              <input type="range" max="10000" min="100" onChange={FilterPrice} onMouseUp={handelDisplay} onMouseDown={handelHiden} />
            </div>
          </div>

          <div className="searchOptions flex">
            <FilterListOutlined className="icon" />
            <span>
              <a onClick={handelFilter}>Search</a>
            </span>
          </div>
        </div>
        {/* </form> */}
        <div data-aos="fade-up" className="homeFooterIcons flex">
          <div className="rightIcons">
            <FacebookOutlined className="icon" />
            <Instagram className="icon" />
            <CardTravel className="icon" />
          </div>

          <div className="leftIcons">
            <FormatListBulleted className="icon" />
            <AppRegistrationOutlined className="icon" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
