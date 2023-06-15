import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "../Accommodation/css/DetailAccommodation.css";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import { getListTransport, getTransportByID } from "./Service/ApiService";

function UserDetailTransport() {
  const { id } = useParams();
  const [transport, setTransport] = useState([]);

  // Booking
  let [isSubmit, setIsSubmit] = useState(false);
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

  const [transportID, setTransportID] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransportDataByID = async () => {
      try {
        const response = await getTransportByID(id);
        // console.log("response", response);

        setTransport(response.data);
        console.log("respone", response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchTransportDataByID();
  }, []);

  // useEffect(() => {

  // }, []);
  console.log("transport", transport);
  const handleDetailTransport = (id) => {
    setTransportID(id);
    navigate(`/usertransport/detail/${id}`);

    //window.location.reload(`accommodation/detail/:${id}`);
    //console.log("id", id);
  };

  // Booking
  const handleChangeInput = (e) => {
    setCount(e.target.value);
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

  return (
    <div className="main-view">
      <section className="ftco-section ftco-degree-bg">
        <div className="container">
          <div className="row mb-5 mt-3">
            <div className="col-lg-6 ">
              <div className="hotel-single mt-4 ftco-animate border-dark border border-white pl-3  pr-3 pb-5 pt-4 bg-primary " style={{ borderRadius: "13px" }}>
                <h2 className="text-center text-light">The Information about the Transport </h2>
                <h2 className="text-center text-light" style={{ fontSize: "12px" }}>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </h2>

                <div className="mt-4 ml-4 ">
                  <div className="d-flex text-dark align-items-center ">
                    <i class="fas fa-arrow-circle-up text-light"></i> <h5 className="mr-2 mb-0 ml-1 text-light"> Departure : </h5>
                    <p className="mb-0 text-light"> {transport.start_position} </p>
                  </div>
                  <div className="d-flex text-dark align-items-center">
                    <i class="fas fa-arrow-circle-down text-light"></i>
                    <h5 className="mr-2  mb-0 ml-1 text-light"> Destination : </h5>
                    <p className="mb-0 text-light"> {transport.transport_name}</p>
                  </div>
                  <div className="d-flex text-dark align-items-center">
                    <i class="fas fa-arrow-circle-down text-light"></i>
                    <h5 className="mr-2  mb-0 ml-1 text-light"> Destination : </h5>
                    <p className="mb-0 text-light"> {transport.transport_name}</p>
                  </div>
                  <div className="d-flex text-dark align-items-center">
                    <i class="fas fa-tag text-light"></i> <h5 className="mr-2  mb-0 ml-1 text-light"> Price: </h5>
                    <p className="mb-0 text-light"> {transport.price} $</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Booking */}
            <div className="col-lg-6 ">
              <div className="  hotel-single ftco-animate mb-2 mt-4 borderwitdh" style={{ borderRadius: "13px" }}>
                <h4 className="mb-5 mt-3 text-center ">
                  Booking <i class="fas fa-book-open"></i>
                </h4>
                <div className="fields">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group position-relative">
                        <div className="font-weight-bold text-dark mb-2">Check in date : </div>

                        <input type="date" id="checkin_date" onChange={handleChangeDateIn} className="w-75" placeholder="Date from" required />
                        {isSubmit && <span class="validity"></span>}
                        {isSubmit && timeIn == "" && <span className="text-danger"> Please enter Check-in date</span>}
                        <div className="text-dark ">Please enter the time you will come</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group timess">
                        <div className="font-weight-bold text-dark mb-2">Check in time :</div>

                        <input type="time" id="appt-time" name="appt" onChange={handleChangeDateOut} min="09:00" max="22:00" required></input>
                        {isSubmit && <span class="validity"></span>}
                        {isSubmit && timeOut == "" && <div className="text-danger"> Please enter Check-in times</div>}
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
                              addMultiQuantity(transport.transport_id, count, "Transport", times);
                              setIsSubmit(false);
                            } else {
                              setIsSubmit(true);
                            }
                          }}
                          value="Booking"
                          className="btn btn-primary py-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr></hr>
          <div className="col-md-12 hotel-single ftco-animate mb-5 mt-4">
            <h4 className="mb-4">Related Transport</h4>
            <div className="row">
              <div class="col-md-4 ftco-animate">
                <div class="destination">
                  <div class="text p-3">
                    <a href={`usertransport/detail/`}>
                      <h3> From: Name </h3>
                      <h3>To: Name </h3>
                      <div>
                        <span class="price per-price">
                          Price: Price $
                          <br />
                        </span>
                      </div>
                    </a>
                    <hr />
                    <p class="bottom-area d-flex">
                      <span hidden>
                        <i class="icon-map-o"></i> {}
                      </span>
                      <span class="ml-auto">
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            handleDetailTransport();
                          }}
                        >
                          Booking
                        </button>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4 ftco-animate">
                <div class="destination">
                  <div class="text p-3">
                    <a href={`usertransport/detail/`}>
                      <h3> From: Name </h3>
                      <h3>To: Name </h3>
                      <div>
                        <span class="price per-price">
                          Price: Price $
                          <br />
                        </span>
                      </div>
                    </a>
                    <hr />
                    <p class="bottom-area d-flex">
                      <span hidden>
                        <i class="icon-map-o"></i> {}
                      </span>
                      <span class="ml-auto">
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            handleDetailTransport();
                          }}
                        >
                          Booking
                        </button>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4 ftco-animate">
                <div class="destination">
                  <div class="text p-3">
                    <a href={`usertransport/detail/`}>
                      <h3> From: Name </h3>
                      <h3>To: Name </h3>
                      <div>
                        <span class="price per-price">
                          Price: Price $
                          <br />
                        </span>
                      </div>
                    </a>
                    <hr />
                    <p class="bottom-area d-flex">
                      <span hidden>
                        <i class="icon-map-o"></i> {}
                      </span>
                      <span class="ml-auto">
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            handleDetailTransport();
                          }}
                        >
                          Booking
                        </button>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* < !-- .section --> */}
    </div>
  );
}

export default UserDetailTransport;
