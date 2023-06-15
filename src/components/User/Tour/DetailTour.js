import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getImageByTouristSpotID,
  getListTour,
  getListTouristSpotTourByTourID,
  getTourByID,
} from "./Services/ApiService";
import "../Accommodation/css/DetailAccommodation.css";
// Booking
import { useShoppingCart } from "../Context/ShoppingCartContext";
import "../Booking/Booking.css";

function DetailTour(props) {
  // Booking
  let [isSubmit, setIsSubmit] = useState(false);
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

  const [tour, setTour] = useState([]);
  const [imageTouristSpot, setImageTouristSpot] = useState([]);

  const [extraTour, setExtraTour] = useState([]);
  const [extraTourImage, setExtraTourImage] = useState([]);

  const [tourID, setTourID] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourDataByID = async () => {
      try {
        const tourByIDResponse = await getTourByID(id);
        console.log("tourByIDResponse", tourByIDResponse);
        if (tourByIDResponse.status === 200) {
          tourByIDResponse.data.depature_date =
            tourByIDResponse.data.depature_date.split("T")[0];
          setTour(tourByIDResponse.data);

          const touristSpotResponse = await getListTouristSpotTourByTourID(
            tourByIDResponse.data.tour_id
          );
          //=====================================================

          console.log("touristSpotResponse", touristSpotResponse);
          if (touristSpotResponse.status === 200) {
            const imageTouristSpotResponse = await getImageByTouristSpotID(
              touristSpotResponse.data[0].touristSpot_id
            );
            if (imageTouristSpotResponse.status === 200) {
              setImageTouristSpot(imageTouristSpotResponse.data);
            }
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchTourData = async () => {
      try {
        const tourResponse = await getListTour();

        //console.log("tourResponse", tourResponse.data);
        if (tourResponse.status === 200) {
          setExtraTour(tourResponse.data);
          //console.log("tourResponse.data.length", tourResponse.data.length);

          // array
          const touristSpotImageArray = [];

          for (let index = 0; index < tourResponse.data.length; index++) {
            const touristSpotResponse = await getListTouristSpotTourByTourID(
              tourResponse.data[index].tour_id
            );

            console.log("touristSpotResponse", touristSpotResponse);

            if (touristSpotResponse.status === 200) {
              const imageResponse = await getImageByTouristSpotID(
                touristSpotResponse.data[0].touristSpot_id
              );

              console.log("imageResponse", imageResponse);

              if (imageResponse.status === 200) {
                touristSpotImageArray[index] = imageResponse.data;
              }
              console.log("touristSpotImageArray", touristSpotImageArray);
            }
          }
          setExtraTourImage(touristSpotImageArray);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    // const fetchAccommodationData = async () => {
    //     try {
    //         const response = await getListAccommodation();
    //         if (response.status === 200) {
    //             setExtraAccommodation(response.data);
    //             const accommodationImages = [];

    //             for (let index = 0; index < response.data.length; index++) {
    //                 console.log("response", response);
    //                 const imageResponse = await getAccommodationImageByID(response.data[index].accommodation_id);
    //                 console.log("imageResponse", imageResponse);
    //                 if (imageResponse.status === 200) {
    //                     accommodationImages[index] = imageResponse.data;
    //                 }
    //             }

    //             setExtraAccommodationImage(accommodationImages);
    //         }
    //     } catch (error) {
    //         console.log("error", error);
    //     }
    // };
    fetchTourDataByID();
    fetchTourData();
    // fetchAccommodationData();
  }, [tourID]);

  // useEffect(() => {

  // }, []);

  const handleDetailTour = (id) => {
    setTourID(id);
    navigate(`/tour/detail/${id}`);

    //window.location.reload(`accommodation/detail/:${id}`);
    //console.log("id", id);
  };
  // console.log("accommodation", accommodation);
  // console.log("imageTouristSpot", imageTouristSpot);

  // Booking
  const handleChangeInput = (e) => {
    console.log("e", e.target.value);
    setCount(e.target.value);
    console.log("e", count);
  };
  const [timeIn, setTimeIn] = useState("");
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
    <div className="main-view">
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
                        {imageTouristSpot.map((item, index) => {
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
                        {imageTouristSpot.map((item, index) => {
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
                  <span>Our Best Tour</span>
                  <h2>{tour.tour_name}</h2>
                  <h4>
                    Departure date: &nbsp;
                    {tour.depature_date}
                  </h4>
                  <p className="rate mb-5">
                    <span className="loc">
                      <a href="#">
                        <i className="icon-map"></i>{" "}
                      </a>
                    </span>
                    &nbsp; Discount: &nbsp;
                    <span className="star">{tour.discount}</span>
                  </p>
                  <div class="product-box">
                    <h3 class="product-name"></h3>
                    <p class="round3 text-dark">{tour.description}</p>
                  </div>
                </div>
                {/* Booking */}
                <div
                  className="col-md-12 hotel-single ftco-animate mb-5 mt-4 borderwitdh"
                  style={{ borderRadius: "13px" }}
                >
                  <h4 className="mb-5 mt-3 text-center ">
                    Booking <i class="fas fa-book-open"></i>
                  </h4>
                  <div className="fields">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="font-weight-bold text-dark mb-2">
                            Check in date :{" "}
                          </div>

                          <input
                            type="date"
                            id="checkin"
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
                          {isSubmit && timeIn == "" && (
                            <span className="text-danger">
                              {" "}
                              Please enter Check-in date
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="font-weight-bold text-dark mb-2">
                            Check out date :{" "}
                          </div>

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
                          {isSubmit && timeOut == "" && (
                            <span className="text-danger">
                              {" "}
                              Please enter Check-out date
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
                              if (timeOut >= timeIn && timeIn != "") {
                                addMultiQuantity(
                                  tour.tour_id,
                                  count,
                                  "Tour",
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
                  <h4 className="mb-4">Related Tours</h4>
                  <div className="row">
                    {extraTour.slice(0, 3).map((item, index) => (
                      <div class="col-md-4 ftco-animate" key={index}>
                        <div class="destination">
                          {extraTourImage[index] && (
                            <div>
                              <div
                                class="icon d-flex justify-content-center align-items-center"
                                onClick={() => handleDetailTour(item.tour_id)}
                              >
                                <img
                                  src={`http://localhost:5158/${extraTourImage[index][0]}`}
                                />
                                <span class="icon-search2"></span>
                              </div>
                            </div>
                          )}
                          <div class="text p-3">
                            <div class="d-flex">
                              <div class="one">
                                <h3>
                                  <a>{item.tour_id}</a>
                                </h3>
                                <p class="rate text-dark">
                                  Discount:
                                  <span>{item.discount}</span>
                                </p>
                              </div>
                              <div class="two">
                                <span class="price per-price">
                                  {item.price}
                                  <br />
                                  <small></small>
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
                                <Link to="#">Book Now</Link>
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
            {/* <!-- .col-md-8 --> */}
          </div>
        </div>
      </section>
      {/* < !-- .section --> */}
    </div>
  );
}

export default DetailTour;
