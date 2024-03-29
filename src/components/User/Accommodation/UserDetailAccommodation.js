import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAccommodationByID, getAccommodationImageByID, getListAccommodation } from "./Services/ApiService";
import "../Accommodation/css/DetailAccommodation.css";

// Booking
import { useShoppingCart } from "../Context/ShoppingCartContext";
import "../Booking/Booking.css";

function UserDetailAccommodation() {
  // Booking
  let [isSubmit, setIsSubmit] = useState(false);
  const { getItemQuantity, increaseCartQuantity, addMultiQuantity, removeFromCart, quantity } = useShoppingCart();
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
  const [accommodation, setAccommodation] = useState([]);
  const [imageAccommodation, setImageAccommodation] = useState([]);
  const [extraAccommodation, setExtraAccommodation] = useState([]);
  const [extraAccommodationImage, setExtraAccommodationImage] = useState([]);
  const [accommodationID, setAccommodationID] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodationDataByID = async () => {
      try {
        const response = await getAccommodationByID(id);
        //console.log("response", response);
        if (response.status === 200) {
          setAccommodation(response.data);
          const imageResponse = await getAccommodationImageByID(response.data.accommodation_id);

          console.log("imageResponse", imageResponse);
          if (imageResponse.status === 200) {
            setImageAccommodation(imageResponse.data);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchAccommodationData = async () => {
      try {
        const response = await getListAccommodation();
        if (response.status === 200) {
          setExtraAccommodation(response.data);
          const accommodationImages = [];

          for (let index = 0; index < response.data.length; index++) {
            console.log("response", response);
            const imageResponse = await getAccommodationImageByID(response.data[index].accommodation_id);
            console.log("imageResponse", imageResponse);
            if (imageResponse.status === 200) {
              accommodationImages[index] = imageResponse.data;
            }
          }

          setExtraAccommodationImage(accommodationImages);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchAccommodationDataByID();
    fetchAccommodationData();
  }, [accommodationID]);
  const handleDetailAccommodation = (id) => {
    setAccommodationID(id);
    navigate(`/accommodation/detail/${id}`);
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
    <div className="main-view">
      <br />

      <section className="main container section ftco-section ftco-degree-bg min-vh-100">
        <div className="container">
          <div className="row">
            <div className="">
              <div className="row ">
                <div className="ftco-animate border border-dark p-5 bg-blur" style={{ borderRadius: "13px" }}>
                  <div id="carouselExampleControls" class="carousel slide user-slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      <div className="carousel-item user-carousel1 active">
                        {imageAccommodation.map((item, index) => {
                          if (index < 1) {
                            return (
                              <>
                                <img src={`http://localhost:5158/${item}`} className="" alt={item} />
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
                                <img src={`http://localhost:5158/${item}`} className="" alt={item} />
                              </>
                            );
                          }
                        })}
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                  <div className="col-md-12 hotel-single mt-4 mb-5 ftco-animate text-light">
                    <span className="text-light">Our Best hotels &amp; Resorts</span>
                    <h2 className="text-light">{accommodation.accommodation_name} <i class="fas fa-hotel ml-1" style={{ fontSize: "24px" }}></i></h2>

                    <div className="star font-weight-bold text-light">
                      <i class="fas fa-caret-right"></i>  {accommodation.type + "" === "true" ? "Resort" : "Hotel"} &nbsp; {accommodation.rate} <i class="fa fa-star-o"></i>
                    </div>
                    <div className="star font-weight-bold text-light">
                      <i class="fas fa-caret-right"></i> Price: {accommodation.price} $
                    </div>
                    <div className="star font-weight-bold text-light" >
                      <i class="fas fa-caret-right"></i> Discount: &nbsp;
                      {accommodation.discount}
                    </div>

                    <div class="product-box">
                      <div class="font-weight-bold text-light mb-2"><i class="fas fa-caret-right"></i>   Description :</div>
                      <p class="round3  p-3 text-light border-white">{accommodation.description}</p>
                    </div>
                  </div>
                </div>


                {/* Booking */}
                <div className=" borderwitdh col-md-12 hotel-single ftco-animate mb-5 mt-4  bg-blur " style={{ borderRadius: "13px" }}>
                  <h4 className="mb-5 mt-3 text-center text-light">
                    Booking <i class="fas fa-book-open"></i>
                  </h4>
                  <div className="fields">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="font-weight-bold text-light mb-2">Check in date : </div>
                          <input type="date" id="checkin" onChange={handleChangeDateIn} className="form-control border-dark" placeholder="Date from" />
                          {timeIn > timeOut && <span className="text-danger"> Date must be less than Check-out Date</span>}
                          {isSubmit && timeIn == "" && <span className="text-danger"> Please enter Check-in date</span>}{" "}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="font-weight-bold text-light mb-2">Check out date : </div>
                          <input type="date" id="checkout_date" onChange={handleChangeDateOut} className="form-control border-dark" placeholder="Date to" />
                          {timeOut < timeIn && <span className="text-danger"> Date must be greater than Check-in Date</span>}
                          {isSubmit && timeOut == "" && <span className="text-danger"> Please enter Check-out date</span>}{" "}
                        </div>
                      </div>

                      <div className="col-md-6 mt-3 mb-3 ">
                        <div className="form-group ">
                          <h4 className="text-light">Quantity : </h4>
                        </div>
                      </div>
                      <div className="col-md-6 mt-3 mb-3 d-flex ">
                        <div className="d-flex align-items-center ml-3">
                          <div className="def-number-input number-input safari_only text-light">
                            <button className="minus text-light" onClick={decrementCount} ></button>
                            <input className="quantity fw-bold text-black" onChange={handleChangeInput} value={count} type="number" />
                            <button className="plus text-light" onClick={incrementCount}></button>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="submit"
                            onClick={() => {
                              if (timeOut >= timeIn && timeIn != "") {
                                addMultiQuantity(accommodation.accommodation_id, count, "Accommodation", times);
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
                  <h4 className="mb-4">Related Hotels</h4>
                  <div className="row">
                    {extraAccommodation.slice(0, 3).map((item, index) => (
                      <div class="col-md-4 ftco-animate" key={index}>
                        <div class="destination">
                          {extraAccommodationImage[index] && (
                            <div>
                              <div class="icon d-flex justify-content-center align-items-center" onClick={() => handleDetailAccommodation(item.accommodation_id)}>
                                <img src={`http://localhost:5158/${extraAccommodationImage[index][0]}`} />
                                <span class="icon-search2"></span>
                              </div>
                            </div>
                          )}
                          <div class="text p-3">
                            <div class="d-flex">
                              <div class="one">
                                <h3>
                                  <a>{item.accommodation_name}</a>
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
                            <p>{item.description.length > 27 ? `${item.description.substring(0, 27)}...` : item.description}</p>
                            <hr />
                            <p class="bottom-area d-flex">
                              <span>
                                <i class="icon-map-o"></i> {item.location_id}
                              </span>
                              <span class="ml-auto">
                                {/* Booking */}
                                <Link onClick={() => increaseCartQuantity(item.accommodation_id, "Accommodation")}>Book Now</Link>
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

export default UserDetailAccommodation;
