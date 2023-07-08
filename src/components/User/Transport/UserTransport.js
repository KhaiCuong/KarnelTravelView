import React, { useEffect, useState } from "react";

import "../Accommodation/css/Accommodation.css";
import { Room, ContentPaste } from "@mui/icons-material";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { getListTransport, getTransportByID } from "./Service/ApiService";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import "aos/dist/aos.css";

// search
import "aos/dist/aos.css";
import { useSearch } from "../../contexts/SearchContext";
import { LocationOnOutlined, FilterListOutlined, FacebookOutlined, Instagram, CardTravel, FormatListBulleted, AppRegistrationOutlined } from "@mui/icons-material";

function UserTransport() {
  const [Transport, setTransport] = useState([]);
  // const [accommodationImage, setAccommodationImages] = useState([]);
  const navigate = useNavigate();

  // Booking
  var today = new Date();
  const date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
  let times = {
    timeIn: date,
    timeOut: "09:00",
  };

  //search
  const { sendInfo, itemSearch } = useSearch();
  const [rs, setRs] = useState(0);
  const [fKey, setFKey] = useState("");
  const [fService, setFService] = useState("Transport");
  {
    /***/
  }
  const [fPrice, setFPrice] = useState(10000);
  const [isHiden, setIsHiden] = useState(true);
  const handelFilter = (e) => {
    sendInfo(fKey, fService, fPrice);
    {
      /***/
    }
    if (fService === "Accommodation") {
      navigate("/accommodation");
    } else if (fService === "Tour") {
      navigate("/tour");
    } else if (fService === "Tourist Sppot") {
      navigate("/touristsport");
    } else if (fService === "Restaurant") {
      navigate("/restaurant");
    }
  };
  const FilterKey = (e) => {
    setFKey(e.target.value);
  };
  const FilterService = (e) => {
    setFService(e.target.value);
  };
  const FilterPrice = (e) => {
    setFPrice(e.target.value);
  };
  const handelHiden = (e) => {
    setIsHiden(false);
  };
  const handelDisplay = (e) => {
    setIsHiden(true);
  };

  useEffect(() => {
    // Search
    if (typeof itemSearch.key != "undefined") {
      setFKey(itemSearch.key);
    }
    if (typeof itemSearch.price != "undefined") {
      setFPrice(itemSearch.price);
    }

    const fetchTransportData = async () => {
      try {
        const response = await getListTransport();
        if (response.status === 200) {
          setTransport(response.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchTransportData();
  }, []);

  // console.log("accommodationImage", accommodationImage);

  const handleDetailTransport = (id) => {
    navigate(`detail/${id}`);
  };
  return (
    <>
      <div className="main-view">
        {/* search */}
        <section className="home " style={{ height: "auto", alignItems: "end" }}>
          <div className="homeContent container pb-0 ">
            <div className="cardDiv grid bg-light">
              <div className="destinationInput">
                <label htmlFor="city" className=" ">
                  Search your destination:
                </label>
                <div className="input flex">
                  <input type="text" placeholder="Input your destination" onChange={FilterKey} value={fKey != null && fKey} />
                  <LocationOnOutlined className="icon" />
                </div>
              </div>

              <div className="dateInput">
                <label htmlFor="service" className=" ">
                  Select the Service:
                </label>
                <div className="input flex">
                  <select name="" id="" placeholder="Keyword search" onChange={FilterService} className="w-100" style={{ border: "none", backgroundColor: "#efefef" }}>
                    <option value="Transport">Transport</option> {/***/}
                    <option value="Restaurant">Restaurant</option>
                    <option value="Accommodation">Accommodation</option>
                    <option value="Tourist Sppot">Tourist Sppot</option>
                    <option value="Tour">Tour</option>
                  </select>
                </div>
              </div>

              <div className="priceInput">
                <div className="label_total flex">
                  <label htmlFor="price" className=" ">
                    Max Price:
                  </label>
                  <h3 className="total ">$1000</h3>
                </div>
                <div className="input flex position-relative ">
                  <p className="position-absolute text-light mb-0 bg-secondary pl-1 pr-1 rounded " style={{ bottom: "100%", left: "43%" }} hidden={isHiden}>
                    {fPrice}
                  </p>
                  <input type="range" max="1000" min="1" onChange={FilterPrice} onMouseUp={handelDisplay} onMouseDown={handelHiden} value={fPrice} />
                </div>
              </div>

              <div className="searchOptions flex" onClick={handelFilter}>
                <FilterListOutlined className="icon" />
                <span>
                  <a>Search</a>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="main container section  pt-0 pl-0 pr-0 min-vh-100">
          <div className="secTitle">
            <h3 data-aos="fade-right" className="title">
              Most visited destinations
            </h3>
          </div>
          <div className="secContent grid">
          {Transport.filter((i) => i.transport_name.toLowerCase().includes(fKey.toLowerCase()))
            .filter((i) => i.price < fPrice)
            .map((item, index) => (
              <div key={index} data-aos="fade-up-right" className="singleDestination">
                <div className="cardInfo">
                  <h4 className="destTitle" onClick={() => handleDetailTransport(item.transport_id)} style={{ cursor: "pointer" }}>
                  <i class="fas fa-circle mr-2 pl-1" style={{fontSize:"18px"}}></i><bold className="font-weight-bold">From: </bold> {item.start_position}
                  </h4>
                  <h4 className="destTitle" onClick={() => handleDetailTransport(item.transport_id)} style={{ cursor: "pointer" }}>
                  <Room className="icon mr-1" /><bold  className="font-weight-bold">To: </bold>{item.transport_name}
                  </h4>



                  <div className="fees flex">
                    {/* <div className="grade">
                    <span>
                      {item.grade}
                      <small> +1</small>
                    </span>
                  </div> */}
                    <div className="price">
                      <h5>{item.price} $</h5>
                    </div>
                  </div>

                  <div className="description">
                    <p>{item.description}</p>
                  </div>

                  <button className="btn flex" onClick={() => increaseCartQuantity(item.touristSpot_id, "TouristSpot", times)}>
                    Book now <ContentPaste className="icon" />
                  </button>
                </div>
              </div>
            ))}
        </div>
        </section>
      </div>
    </>
  );
}

export default UserTransport;
