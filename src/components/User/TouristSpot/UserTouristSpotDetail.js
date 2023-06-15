import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "../Accommodation/css/DetailAccommodation.css";

// Booking
import { useShoppingCart } from "../Context/ShoppingCartContext";
import "../Booking/Booking.css";
import {
  GetImagesByTouristSpotId,
  GetTouristSpotById,
  GetTouristSpots,
} from "./Service/AppService";

function UserTouristSpotDetail() {
  // Booking
  const {
    getItemQuantity,
    increaseCartQuantity,
    addMultiQuantity,
    removeFromCart,
    quantity,
  } = useShoppingCart();
  let [count, setCount] = useState(1);
  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    setCount(count);
  }

  const { id } = useParams();
  const [touristsport, setTouristSpot] = useState([]);
  const [touristsportImage, setTouristSpotImages] = useState([]);
  const [extraTouristSpot, setExtraTouristSpot] = useState([]);
  const [extraTouristSpotImage, setExtraTouristSpotImage] = useState([]);
  const [touristsportID, setTouristsportID] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTouristSpotDataByID = async () => {
      try {
        const response = await GetTouristSpotById(id);
        //console.log("response", response);
        if (response.status === 200) {
          setTouristSpot(response.data);
          const imageResponse = await GetImagesByTouristSpotId(
            response.data.touristSpot_id
          );

          console.log("imageResponse", imageResponse);
          if (imageResponse.status === 200) {
            setTouristSpotImages(imageResponse.data);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchTouristSpotData = async () => {
      try {
        const response = await GetTouristSpots();
        if (response.status === 200) {
          setExtraTouristSpot(response.data);
          const touristsportImage = [];

          for (let index = 0; index < response.data.length; index++) {
            console.log("response", response);
            const imageResponse = await GetImagesByTouristSpotId(
              response.data[index].touristSpot_id
            );
            console.log("imageResponse", imageResponse);
            if (imageResponse.status === 200) {
              touristsportImage[index] = imageResponse.data;
            }
          }

          setExtraTouristSpotImage(touristsportImage);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchTouristSpotDataByID();
    fetchTouristSpotData();
  }, [touristsportID]);
  const handleDetailTouristSpot = (id) => {
    setTouristsportID(id);
    navigate(`/touristspot/detail/${id}`);
  };

  // Booking
  const handleChangeInput = (e) => {
    console.log("e", e.target.value);
    setCount(e.target.value);
    console.log("e", count);
  };
  const [timeIn, setTimeIn] = useState([]);
  const [timeOut, setTimeOut] = useState([]);
  const handleChangeDateIn = (e) => {
    console.log("e", e.target.value);
    setTimeIn(e.target.value);
  };
  const handleChangeDateOut = (e) => {
    setTimeOut(e.target.value);
  };
  let times = {
    timeIn: timeIn,
    timeOut: timeOut,
  };

  return (
    <div>
      <br />
      <section className="main container section ftco-section ftco-degree-bg">
        <div className="container">
          <div className="row">
            <div className="">
              <div className="row">
                <div className="ftco-animate">
                  <div
                    id="carouselExampleControls"
                    class="carousel slide user-slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item user-carousel1 active">
                        {touristsportImage.map((item, index) => {
                          if (index < 1) {
                            return (
                              <>
                                <img
                                  src={`http://localhost:5158/${item}`}
                                  className=""
                                  alt={item}
                                />
                              </>
                            );
                          }
                        })}
                      </div>
                      <div className="carousel-item user-carousel1">
                        {imageAccommodation.map((item, index) => {
                          if (index >= 1) {
                            return (
                              <>
                                <img
                                  src={`http://localhost:5158/${item}`}
                                  className=""
                                  alt={item}
                                />
                              </>
                            );
                          }
                        })}
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleControls"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleControls"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
                <div className="col-md-12 hotel-single mt-4 mb-5 ftco-animate">
                  <span>Our Best hotels &amp; Resorts</span>
                  <h2>{touristsport.touristSpot_name}</h2>
                  <p className="rate mb-5">
                    {touristsport.type + "" === "true" ? "Resort" : "Hotel"}{" "}
                    &nbsp;
                    <span className="star">{touristsport.rate} Stars</span>
                    <div className="star">
                      Discount: &nbsp;
                      {touristsport.discount}
                    </div>
                  </p>
                  <p>{touristsport.description}</p>
                </div>

                {/* Booking */}
                <div
                  className="col-md-12 hotel-single ftco-animate mb-5 mt-4 border border-dark"
                  style={{ borderRadius: "13px" }}
                >
                  <h4 className="mb-5 mt-3 text-center ">
                    Booking <i class="fas fa-book-open"></i>
                  </h4>
                  <div className="fields">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="date"
                            id="checkin_date"
                            onChange={handleChangeDateIn}
                            className="form-control"
                            placeholder="Date from"
                          />
                          {timeIn > timeOut && (
                            <span className="text-danger">
                              {" "}
                              Date must be less than Check-out Date
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="date"
                            id="checkout_date"
                            onChange={handleChangeDateOut}
                            className="form-control"
                            placeholder="Date to"
                          />
                          {timeOut < timeIn && (
                            <span className="text-danger">
                              {" "}
                              Date must be greater than Check-in Date
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6 mt-3 mb-3 ">
                        <div className="form-group">
                          <h4>Quantity : </h4>
                        </div>
                      </div>
                      <div className="col-md-6 mt-3 mb-3 d-flex ">
                        <div className="d-flex align-items-center ml-3">
                          <div className="def-number-input number-input safari_only">
                            <button
                              className="minus"
                              onClick={decrementCount}
                            ></button>
                            <input
                              className="quantity fw-bold text-black"
                              onChange={handleChangeInput}
                              value={count}
                              type="number"
                            />
                            <button
                              className="plus"
                              onClick={incrementCount}
                            ></button>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="submit"
                            onClick={() => {
                              if (timeOut >= timeIn) {
                                addMultiQuantity(
                                  touristsport.touristSpot_id,
                                  count,
                                  "touristsport",
                                  times
                                );
                              }
                            }}
                            value="Check Availability"
                            className="btn btn-primary py-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 hotel-single ftco-animate mb-5 mt-5">
                  <h4 className="mb-4">Related Hotels</h4>
                  <div className="row">
                    {extraTouristSpot.slice(0, 3).map((item, index) => (
                      <div class="col-md-4 ftco-animate" key={index}>
                        <div class="destination">
                          {extraTouristSpotImage[index] && (
                            <div>
                              <div
                                class="icon d-flex justify-content-center align-items-center"
                                onClick={() =>
                                  handleDetailTouristSpot(item.touristSpot_id)
                                }
                              >
                                <img
                                  src={`http://localhost:5158/${extraTouristSpotImage[index][0]}`}
                                />
                                <span class="icon-search2"></span>
                              </div>
                            </div>
                          )}
                          <div class="text p-3">
                            <div class="d-flex">
                              <div class="one">
                                <h3>
                                  <a>{item.touristSpot_name}</a>
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
                                  {/* <small>/night</small> */}
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
                                <Link
                                  onClick={() =>
                                    increaseCartQuantity(
                                      item.touristSpot_id,
                                      "touristsport"
                                    )
                                  }
                                >
                                  Book Now
                                </Link>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserTouristSpotDetail;