import React, { useEffect, useState } from "react";

import "../Accommodation/css/Accommodation.css";
import { Room, ContentPaste } from "@mui/icons-material";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { getListTransport, getTransportByID } from "./Service/ApiService";
import { useShoppingCart } from "../Context/ShoppingCartContext";

function UserTransport() {
  const [Transport, setTransport] = useState([]);
  // const [accommodationImage, setAccommodationImages] = useState([]);
  const navigate = useNavigate();


  var today = new Date();
  const date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
  let times = {
    timeIn : date,
    timeOut : "09:00",

  }

  useEffect(() => {
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
      <section className="main container section">
        <div className="secTitle">
          <h3 data-aos="fade-right" className="title">
            Most visited destinations
          </h3>
        </div>
        <div className="row">
          {/* <div class="col-lg-3 sidebar pl-4">
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
              {Transport.map((item, index) => (
                <div class="col-md-4 ftco-animate">
                  <div class="destination">
                    <div class="text p-3">
                      <div class="d-flex">
                        <div class="one">
                          <h3>
                            <a href={`usertransport/detail/${item.transport_id}`}>
                              Transport Name: {item.transport_name}
                            </a>
                          </h3>
                          <p class="rate">
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star-o"></i>
                            {/* <span>8 Rating</span> */}
                          </p>
                        </div>
                        <div class="two">
                          <span class="price per-price">
                            Price: {item.price}$
                            <br />
                            {/* <small>/night</small> */}
                          </span>
                        </div>
                      </div>
                      <p> Star Point: {item.start_position}</p>
                      <hr />
                      <p class="bottom-area d-flex">
                        <span hidden>
                          <i class="icon-map-o"></i> {item.location_id}
                        </span>
                        <span class="ml-auto">
                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              
                                handleDetailTransport(item.transport_id);
                            }}
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
