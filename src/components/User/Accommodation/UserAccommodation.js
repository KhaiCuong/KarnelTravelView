import React, { useEffect, useState } from "react";
import { getAccommodationImageByID, getListAccommodation } from "./Services/ApiService";
import "../Accommodation/css/Accommodation.css";
import { Room, ContentPaste } from "@mui/icons-material";

// search
import "aos/dist/aos.css";
import { useSearch } from "../../contexts/SearchContext";
import { LocationOnOutlined, FilterListOutlined, FacebookOutlined, Instagram, CardTravel, FormatListBulleted, AppRegistrationOutlined } from "@mui/icons-material";
// import "../../Home/home.css";

import { Link, useNavigate } from "react-router-dom";

//Booking
import { useShoppingCart } from "../Context/ShoppingCartContext";

function UserAccommodation() {
  const [accommodation, setAccommodation] = useState([]);
  const [accommodationImage, setAccommodationImages] = useState([]);

  const navigate = useNavigate();

  // search
  const { sendInfo, itemSearch } = useSearch();
  const [rs, setRs] = useState(0);
  const [fKey, setFKey] = useState("");
  const [fService, setFService] = useState("Accommodation");
  const [fPrice, setFPrice] = useState(10000);
  const [isHiden, setIsHiden] = useState(true);
  const handelFilter = (e) => {
    sendInfo(fKey, fService, fPrice);
    if (fService === "Restaurant") {
      navigate("/restaurant");
    } else if (fService === "Tour") {
      navigate("/tour");
    } else if (fService === "Tourist Sppot") {
      navigate("/");
    } else if (fService === "Transport") {
      navigate("/usertransport");
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

  //Booking
  var today = new Date();
  const date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, getBookingByBookingId } = useShoppingCart();
  let times = {
    timeIn: date,
    timeOut: date,
  };

  useEffect(() => {
    // Search
    if (typeof itemSearch.key != "undefined") {
      setFKey(itemSearch.key);
    }
    if (typeof itemSearch.price != "undefined") {
      setFPrice(itemSearch.price);
    }

    const fetchAccommodationData = async () => {
      try {
        const response = await getListAccommodation();
        if (response.status === 200) {
          setAccommodation(response.data);
          const accommodationImages = [];

          for (let index = 0; index < response.data.length; index++) {
            console.log("response", response);
            const imageResponse = await getAccommodationImageByID(response.data[index].accommodation_id);
            console.log("imageResponse", imageResponse);
            if (imageResponse.status === 200) {
              accommodationImages[index] = imageResponse.data;
            }
          }

          setAccommodationImages(accommodationImages);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchAccommodationData();
  }, []);
  console.log("fService", fService);

  const handleDetailAccommodation = (id) => {
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

      <section className="main container section pt-0">
        <div className="secTitle">
          <h3 data-aos="fade-right" className="title ">
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
              {/* search */}
              {accommodation
                .filter((i) => i.accommodation_name.toLowerCase().includes(fKey.toLowerCase()))
                .filter((i) => i.price < fPrice)
                .map((item, index) => (
                  <div class="col-md-4 ftco-animate">
                    <div class="destination">
                      {accommodationImage[index] && (
                        <div>
                          <div class="icon d-flex justify-content-center align-items-center" onClick={() => handleDetailAccommodation(item.accommodation_id)}>
                            <img src={`http://localhost:5158/${accommodationImage[index][0]}`} />
                            <span class="icon-search2"></span>
                          </div>
                        </div>
                      )}
                      <div class="text p-3">
                        <div class="d-flex">
                          <div class="one">
                            <h3>
                              <a href={`accommodation/detail/${item.accommodation_id}`}>{item.accommodation_name.length > 15 ? `${item.accommodation_name.substring(0, 15)}...` : item.accommodation_name}</a>
                            </h3>
                            <p class="rate">
                              <i class="icon-star"></i>
                              <i class="icon-star"></i>
                              <i class="icon-star"></i>
                              <i class="icon-star"></i>
                              <i class="icon-star-o"></i>
                              <span>8 Rating</span>
                            </p>
                          </div>
                          <div class="two">
                            <span class="price per-price">
                              {item.price}
                              <br />
                              <small>/night</small>
                            </span>
                          </div>
                        </div>
                        <p>{item.description}</p>
                        <hr />
                        <p class="bottom-area d-flex">
                          <span>
                            <i class="icon-map-o"></i> {item.location_id}
                          </span>
                          <span class="ml-auto">
                            {/* Booking */}
                            <Link onClick={() => increaseCartQuantity(item.accommodation_id, "Accommodation", times)}>Book Now</Link>
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

export default UserAccommodation;
