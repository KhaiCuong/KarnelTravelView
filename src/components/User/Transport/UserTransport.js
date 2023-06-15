import React, { useEffect, useState } from "react";

import "../Accommodation/css/Accommodation.css";
import { Room, ContentPaste } from "@mui/icons-material";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { getListTransport, getTransportByID } from "./Service/ApiService";
import { useShoppingCart } from "../Context/ShoppingCartContext";

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
    timeIn : date,
    timeOut : "09:00",
  }

  //search
  const { sendInfo, itemSearch } = useSearch();
  const [rs, setRs] = useState(0);
  const [fKey, setFKey] = useState("");
  const [fService, setFService] = useState("Transport");  { /***/}
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
      navigate("/");
    } else if(fService === "Restaurant") {
      navigate("/restaurant");
    } ;
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
       {/* search */}
       <section className="home " style={{ height: "300px", alignItems: "end" }}>
        <div className="homeContent container pb-0 ">
          <div className="cardDiv grid bg-secondary">
            <div className="destinationInput">
              <label htmlFor="city" className=" text-white">
                Search your destination:
              </label>
              <div className="input flex">
                <input type="text" placeholder="Input your destination" onChange={FilterKey} value={fKey != null && fKey} />
                <LocationOnOutlined className="icon" />
              </div>
            </div>

            <div className="dateInput">
              <label htmlFor="service" className=" text-white">
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
                <label htmlFor="price" className=" text-white">
                  Max Price:
                </label>
                <h3 className="total text-white">$10000</h3>
              </div>
              <div className="input flex position-relative ">
                <p className="position-absolute text-light mb-0 bg-secondary pl-1 pr-1 rounded " style={{ bottom: "100%", left: "43%" }} hidden={isHiden}>
                  {fPrice}
                </p>
                <input type="range" max="10000" min="100" onChange={FilterPrice} onMouseUp={handelDisplay} onMouseDown={handelHiden} value={fPrice} />
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
      <section className="main container section">
        <div className="secTitle">
          <h3 data-aos="fade-right" className="title">
            Most visited destinations
          </h3>
        </div>
        <div className="row">
          <div class="col-lg-3 sidebar pl-4">
            <div class="sidebar-wrap bg-light ftco-animate">
              <h3 class="heading mb-4">Find City</h3>
              <form action="#">
                <div class="fields">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Destination, City" />
                  </div>
                  <div class="form-group">
                    <div class="select-wrap one-third">
                      <div class="icon">
                        <span class="ion-ios-arrow-down"></span>
                      </div>
                      <select name="" id="" class="form-control" placeholder="Keyword search">
                        <option value="">Select Location</option>
                        <option value="">San Francisco USA</option>
                        <option value="">Berlin Germany</option>
                        <option value="">Lodon United Kingdom</option>
                        <option value="">Paris Italy</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <input type="text" id="checkin_date" class="form-control" placeholder="Date from" />
                  </div>
                  <div class="form-group">
                    <input type="text" id="checkin_date" class="form-control" placeholder="Date to" />
                  </div>
                  <div class="form-group">
                    <input type="number" value="25000" min="0" max="120000" /> -
                    <input type="number" value="50000" min="0" max="120000" />
                    <div class="range-slider">
                      <span></span>
                      <input value="1000" min="0" max="120000" step="500" type="range" />
                      <input value="50000" min="0" max="120000" step="500" type="range" />
                    </div>
                  </div>
                  <div class="form-group button">
                    <input type="submit" value="Search" class="btn btn-primary py-3 px-5" />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row">
              {Transport
                .filter((i) => i.transport_name.toLowerCase().includes(fKey.toLowerCase()))
                .filter((i) => i.price < fPrice)
                .map((item, index) => (
                <div class="col-md-4 ftco-animate">
                  <div class="destination">
                    <div class="text p-3">
                    <a href={`usertransport/detail/${item.transport_id}`}>
                      <h3> From: {item.start_position} </h3>
                      <h3>
                        To: {item.transport_name.length > 15 ? `${item.transport_name.substring(0, 15)}...` : item.transport_name}
                      </h3>
                      <div>
                        <span class="price per-price">
                          Price: {item.price}$
                          <br />
                        </span>
                      </div>
                      </a>
                      <hr />
                      <p class="bottom-area d-flex">
                        <span hidden>
                          <i class="icon-map-o"></i> {item.location_id}
                        </span>
                        <span class="ml-auto">
                          <button
                            className="btn btn-warning"
                            onClick={() => increaseCartQuantity(item.transport_id, "Transport",times)}
                          >
                           Booking
                          </button>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserTransport;