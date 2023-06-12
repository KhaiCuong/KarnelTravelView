import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRestaurantByID, getRestaurantImageByID } from "./Service/ApiService";
import "../Restaurant/css/DetailRestaurant.css";

// Booking
import { useShoppingCart } from "../Context/ShoppingCartContext";
import "../Booking/Booking.css";

function DetailofRestaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  const [imageRestaurant, setImageRestaurant] = useState([]);

  // Booking
  const { getItemQuantity, increaseCartQuantity, addMultiQuantity, removeFromCart, quantity } = useShoppingCart();
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
          const imageResponse = await getRestaurantImageByID(response.data.restaurant_id);

          console.log("imageResponse", imageResponse);
          if (imageResponse.status === 200) {
            setImageRestaurant(imageResponse.data);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchRestaurantDataByID();
  }, []);
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
    <div>
      <br />
      <br />
      <br />
      <br />

      <section className="ftco-section ftco-degree-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 sidebar">
              <div className="sidebar-wrap bg-light ftco-animate">
                <h3 className="heading mb-4">Find City</h3>
                <form action="#">
                  <div className="fields">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Destination, City" />
                    </div>
                    <div className="form-group">
                      <div className="select-wrap one-third">
                        <div className="icon">
                          <span className="ion-ios-arrow-down"></span>
                        </div>
                        <select name="" id="" className="form-control" placeholder="Keyword search">
                          <option value="">Select Location</option>
                          <option value="">San Francisco USA</option>
                          <option value="">Berlin Germany</option>
                          <option value="">Lodon United Kingdom</option>
                          <option value="">Paris Italy</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="text" id="checkin_date" className="form-control" placeholder="Date from" />
                    </div>
                    <div className="form-group">
                      <input type="text" id="checkin_date" className="form-control" placeholder="Date to" />
                    </div>
                    <div className="form-group">
                      <div className="range-slider">
                        <span>
                          <input type="number" value="25000" min="0" max="120000" /> -
                          <input type="number" value="50000" min="0" max="120000" />
                        </span>
                        <input value="1000" min="0" max="120000" step="500" type="range" />
                        <input value="50000" min="0" max="120000" step="500" type="range" />
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="submit" value="Search" className="btn btn-primary py-3 px-5" />
                    </div>
                  </div>
                </form>
              </div>
              <div className="sidebar-wrap bg-light ftco-animate">
                <h3 className="heading mb-4">Star Rating</h3>
                <form method="post" className="star-rating">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">
                      <p className="rate">
                        <span>
                          <i className="icon-star"></i>
                          <i className="icon-star"></i>
                          <i className="icon-star"></i>
                          <i className="icon-star"></i>
                          <i className="icon-star"></i>
                        </span>
                      </p>
                    </label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">
                      <p className="rate">
                        <span>
                          <i className="icon-star"></i>
                          <i className="icon-star"></i>
                          <i className="icon-star"></i>
                          <i className="icon-star"></i>
                          <i className="icon-star-o"></i>
                        </span>
                      </p>
                    </label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">
                      <p className="rate">
                        <span>
                          <i className="icon-star"></i>
                          <i className="icon-star"></i>
                          <i className="icon-star"></i>
                          <i className="icon-star-o"></i>
                          <i className="icon-star-o"></i>
                        </span>
                      </p>
                    </label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">
                      <p className="rate">
                        <span>
                          <i className="icon-star"></i>
                          <i className="icon-star"></i>
                          <i className="icon-star-o"></i>
                          <i className="icon-star-o"></i>
                          <i className="icon-star-o"></i>
                        </span>
                      </p>
                    </label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">
                      <p className="rate">
                        <span>
                          <i className="icon-star"></i>
                          <i className="icon-star-o"></i>
                          <i className="icon-star-o"></i>
                          <i className="icon-star-o"></i>
                          <i className="icon-star-o"></i>
                        </span>
                      </p>
                    </label>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row">
                <div className="col-md-12 ftco-animate"></div>
                <div className="col-md-12 hotel-single mt-4 mb-5 ftco-animate">
                  <span>Our Best Restaurants</span>
                  <h2>{restaurant.restaurant_name}</h2>
                  <p>
                    {restaurant.rate} <i class="fa fa-star-o"></i>
                  </p>

                  <div id="carouselExampleControls" class="carousel slide user-slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      <div className="carousel-item user-carousel active">
                        {imageRestaurant.map((item, index) => {
                          if (index < 1) {
                            return (
                              <>
                                <img src={`http://localhost:5158/${item}`} className="" alt={item} />
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
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <p class="groove">{restaurant.description}</p>
                  </div>
                </div>

                {/* Booking */}
                <div className="col-md-12 hotel-single ftco-animate mb-5 mt-4 border border-dark" style={{ borderRadius: "13px" }}>
                  <h4 className="mb-5 mt-3 text-center ">
                    Booking <i class="fas fa-book-open"></i>
                  </h4>
                  <div className="fields">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group position-relative" >
                            <input type="date" id="checkin_date" onChange={handleChangeDateIn} className="w-75" placeholder="Date from" required />
                            <span class="validity "></span>


                          <div className="text-dark">Please enter the time you will come</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group timess">
                          <input type="time" id="appt-time" name="appt" onChange={handleChangeDateOut} min="09:00" max="22:00" required></input>
                          <span class="validity"></span>
                          <div className="text-dark">My Restaurant just open from 9am to 10pm</div>
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
                            <button className="minus" onClick={decrementCount}></button>
                            <input className="quantity fw-bold text-black" onChange={handleChangeInput} value={count} type="number" />
                            <button className="plus" onClick={incrementCount}></button>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="submit"
                            onClick={() => {
                              if (valid && timeIn.length != 0) {
                                addMultiQuantity(restaurant.restaurant_id, count, "Restaurant", times);
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
                <div className="col-md-12 hotel-single ftco-animate mb-5 mt-4">
                  <h4 className="mb-4">Review &amp; Ratings</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <form method="post" className="star-rating">
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                          <label className="form-check-label" for="exampleCheck1">
                            <p className="rate">
                              <span>
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star"></i> 100 Ratings
                              </span>
                            </p>
                          </label>
                        </div>
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                          <label className="form-check-label" for="exampleCheck1">
                            <p className="rate">
                              <span>
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star-o"></i> 30 Ratings
                              </span>
                            </p>
                          </label>
                        </div>
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                          <label className="form-check-label" for="exampleCheck1">
                            <p className="rate">
                              <span>
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star-o"></i>
                                <i className="icon-star-o"></i> 5 Ratings
                              </span>
                            </p>
                          </label>
                        </div>
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                          <label className="form-check-label" for="exampleCheck1">
                            <p className="rate">
                              <span>
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star-o"></i>
                                <i className="icon-star-o"></i>
                                <i className="icon-star-o"></i> 0 Ratings
                              </span>
                            </p>
                          </label>
                        </div>
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                          <label className="form-check-label" for="exampleCheck1">
                            <p className="rate">
                              <span>
                                <i className="icon-star"></i>
                                <i className="icon-star-o"></i>
                                <i className="icon-star-o"></i>
                                <i className="icon-star-o"></i>
                                <i className="icon-star-o"></i> 0 Ratings
                              </span>
                            </p>
                          </label>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 hotel-single ftco-animate mb-5 mt-5">
                  <h4 className="mb-4">Related Hotels</h4>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="destination">
                        <a href="hotel-single.html" className="img img-2" style={{ backgroundImage: "url(images/hotel-2.jpg)" }}></a>
                        <div className="text p-3">
                          <div className="d-flex">
                            <div className="one">
                              <h3>
                                <a href="hotel-single.html">Hotel, Italy</a>
                              </h3>
                              <p className="rate">
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star-o"></i>
                                <span>8 Rating</span>
                              </p>
                            </div>
                            <div className="two">
                              <span className="price per-price">
                                $40
                                <br />
                                <small>/night</small>
                              </span>
                            </div>
                          </div>
                          <p>Far far away, behind the word mountains, far from the countries</p>
                          <hr />
                          <p className="bottom-area d-flex">
                            <span>
                              <i className="icon-map-o"></i> Miami, Fl
                            </span>
                            <span className="ml-auto">
                              <a href="#">Book Now</a>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="destination">
                        <a href="hotel-single.html" className="img img-2" style={{ backgroundImage: "url(images/hotel-2.jpg)" }}></a>
                        <div className="text p-3">
                          <div className="d-flex">
                            <div className="one">
                              <h3>
                                <a href="hotel-single.html">Hotel, Italy</a>
                              </h3>
                              <p className="rate">
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star-o"></i>
                                <span>8 Rating</span>
                              </p>
                            </div>
                            <div className="two">
                              <span className="price per-price">
                                $40
                                <br />
                                <small>/night</small>
                              </span>
                            </div>
                          </div>
                          <p>Far far away, behind the word mountains, far from the countries</p>
                          <hr />
                          <p className="bottom-area d-flex">
                            <span>
                              <i className="icon-map-o"></i> Miami, Fl
                            </span>
                            <span className="ml-auto">
                              <a href="#">Book Now</a>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="destination">
                        <a href="hotel-single.html" className="img img-2" style={{ backgroundImage: "url(images/hotel-2.jpg)" }}></a>
                        <div className="text p-3">
                          <div className="d-flex">
                            <div className="one">
                              <h3>
                                <a href="hotel-single.html">Hotel, Italy</a>
                              </h3>
                              <p className="rate">
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star"></i>
                                <i className="icon-star-o"></i>
                                <span>8 Rating</span>
                              </p>
                            </div>
                            <div className="two">
                              <span className="price per-price">
                                $40
                                <br />
                                <small>/night</small>
                              </span>
                            </div>
                          </div>
                          <p>Far far away, behind the word mountains, far from the countries</p>
                          <hr />
                          <p className="bottom-area d-flex">
                            <span>
                              <i className="icon-map-o"></i> Miami, Fl
                            </span>
                            <span className="ml-auto">
                              <a href="#">Book Now</a>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
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

export default DetailofRestaurant;
