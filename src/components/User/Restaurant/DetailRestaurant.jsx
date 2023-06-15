import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  getListRestaurantUser,
  getRestaurantByID,
  getRestaurantImageByID,
} from "./Service/ApiService";
import "../Restaurant/css/DetailRestaurant.css";

// Booking
import { useShoppingCart } from "../Context/ShoppingCartContext";
import "../Booking/Booking.css";
import { width } from "@mui/system";

function DetailofRestaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  const [imageRestaurant, setImageRestaurant] = useState([]);
  const [extraRestaurant, setExtraRestaurant] = useState([]);
  const [extraRestaurantImage, setExtraRestaurantImage] = useState([]);
  const [restaurantID, setRestaurantID] = useState();
  const navigate = useNavigate();
  const [fullDescription, setFullDescription] = useState(false);
  // Booking
  let [isSubmit, setIsSubmit] = useState(false);
  const {
    getItemQuantity,
    increaseCartQuantity,
    addMultiQuantity,
    removeFromCart,
    quantity,
  } = useShoppingCart();
  const [valid, setValid] = useState(false);
  let [count, setCount] = useState(1);
  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    setCount(count);
  }

  useEffect(() => {
    const fetchRestaurantDataByID = async () => {
      try {
        const response = await getRestaurantByID(id);
        //console.log("response", response);
        if (response.status === 200) {
          setRestaurant(response.data);
          const imageResponse = await getRestaurantImageByID(
            response.data.restaurant_id
          );

          console.log("imageResponse", imageResponse);
          if (imageResponse.status === 200) {
            setImageRestaurant(imageResponse.data);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchRestaurantData = async () => {
      try {
        const response = await getListRestaurantUser();
        if (response.status === 200) {
          setExtraRestaurant(response.data);
          const restaurantImages = [];

          for (let index = 0; index < response.data.length; index++) {
            console.log("response", response);
            const imageResponse = await getRestaurantImageByID(
              response.data[index].restaurant_id
            );
            console.log("imageResponse", imageResponse);
            if (imageResponse.status === 200) {
              restaurantImages[index] = imageResponse.data;
            }
          }

          setExtraRestaurantImage(restaurantImages);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchRestaurantDataByID();
    fetchRestaurantData();
  }, [restaurantID]);
  const handleDetailRestaurant = (id) => {
    setRestaurantID(id);
    navigate(`/restaurant/detail/${id}`);
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
    if (e.target.min < e.target.value && e.target.max > e.target.value) {
      setValid(true);
    } else {
      setValid(false);
    }
  };
  let times = {
    timeIn: timeIn,
    timeOut: timeOut,
  };

  console.log("Time in", timeIn);

  return (
    <div className="main-view">
      <br />
      <br />
      <br />
      <br />
    <div><section className="ftco-section ftco-degree-bg" style={{color : "background-color: rgba(0, 0, 0, 1)"}}>
        <div className="container text-white">
          <div className="row">
            <span>Our Best Restaurants</span>
            <h2 className="text-white">{restaurant.restaurant_name}</h2>
            <p>
              {restaurant.rate} <i class="fa fa-star-o"></i>
            </p>

            <div
              id="carouselExampleControls"
              class="carousel slide user-slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item user-carousel active">
                  {imageRestaurant.map((item, index) => {
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
                <div className="carousel-item user-carousel">
                  {imageRestaurant.map((item, index) => {
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
          {/* <div className="col-lg-9">
                  <div className="row">
                    <div className="container">
                    <p class="round3">{restaurant.description}</p>
                    </div>
                  </div>
                </div> */}
          <div class="product-box">
            <h3 class="product-name"></h3>
            <p  class="round3 text-dark">{restaurant.description}</p>
          </div>

          {/* Booking */}
          <div
            className="borderwitdh col-md-12 hotel-single ftco-animate mb-5 mt-4 "
            style={{ borderRadius: "13px" , borderColor:"white"  }}
          >
            <h4 className="mb-5 mt-3 text-center text-dark ">
              Booking <i class="fas fa-book-open"></i>
            </h4>
            <div className="fields">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group position-relative">
                    <div className="font-weight-bold text-dark mb-2">
                      Check in date :{" "}
                    </div>
                    <input
                      type="date"
                      id="checkin_date"
                      onChange={handleChangeDateIn}
                      className="w-75"
                      placeholder="Date from"
                      required
                    />
                    {isSubmit && <span class="validity"></span>}
                    {isSubmit && timeIn == "" && (
                      <div className="text-danger">
                        {" "}
                        Please enter Check-in date
                      </div>
                    )}
                    <div className="text-dark ">
                      Please enter the time you will come
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group timess">
                    <div className="font-weight-bold text-dark mb-2">
                      Check in time :
                    </div>
                    <input
                      type="time"
                      id="appt-time"
                      name="appt"
                      onChange={handleChangeDateOut}
                      min="09:00"
                      max="22:00"
                      required
                    ></input>
                    {isSubmit && <span class="validity"></span>}
                    {isSubmit && timeOut == "" && (
                      <div className="text-danger">
                        {" "}
                        Please enter Check-in times
                      </div>
                    )}
                    <div className="text-dark">
                      My Restaurant just open from 9am to 10pm
                    </div>
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
                        if (valid && timeIn.length != 0) {
                          addMultiQuantity(
                            restaurant.restaurant_id,
                            count,
                            "Restaurant",
                            times
                          );
                          setIsSubmit(false);
                        } else {
                          setIsSubmit(true);
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
            <h4 className="mb-4">Related Restaurant</h4>
            <div className="row">
              {extraRestaurant.slice(0, 3).map((item, index) => (
                <div class="col-md-4 ftco-animate" key={index}>
                  <div class="destination">
                    {extraRestaurantImage[index] && (
                      <div>
                        <div
                          class="icon d-flex justify-content-center align-items-center"
                          onClick={() =>
                            handleDetailRestaurant(item.restaurant_id)
                          }
                        >
                          <img
                            src={`http://localhost:5158/${extraRestaurantImage[index][0]}`}
                          />
                          <span class="icon-search2"></span>
                        </div>
                      </div>
                    )}
                    <div class="text p-3">
                      <div class="d-flex">
                        <div class="one">
                          <h3>
                            <a>{item.restaurant_name}</a>
                          </h3>
                        </div>
                        <div class="two">
                          <span class="price per-price">
                            {item.price}
                            <i class="fa fa-dollar"></i>
                            <br />
                          </span>
                        </div>
                      </div>
                      <a>
                        {fullDescription ? (
                          <p>{item.description}</p>
                        ) : (
                          <p>{`${item.description.substring(0, 30)}...`}</p>
                        )}
                        {/* <button
                          onClick={() => setFullDescription(!fullDescription)}
                        >
                          {fullDescription ? "View Less" : "View More"}
                        </button> */}
                      </a>
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
                                item.restaurant_id,
                                "Restaurant"
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
      </section></div>
      
      {/* < !-- .section --> */}
    </div>
  );
}

export default DetailofRestaurant;
