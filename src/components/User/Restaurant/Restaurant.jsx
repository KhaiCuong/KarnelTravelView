import React, { useEffect, useState } from "react";

import "./Restaurant.css";
import { Room, ContentPaste } from "@mui/icons-material";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import {
  getListRestaurantUser,
  getRestaurantImageByID,
} from "../../User/Restaurant/Service/ApiService";

function Restaurant() {
  const [restaurant, setRestaurant] = useState([]);
  const [restaurantImage, setRestaurantImages] = useState([]);
  const [fullDescription, setFullDescription] = useState(false);
  const description = "Description";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await getListRestaurantUser();
        if (response.status === 200) {
          setRestaurant(response.data);
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

          setRestaurantImages(restaurantImages);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchRestaurantData();
  }, []);

  console.log("restaurantImage", restaurantImage);

  const handleDetailRestaurant = (id) => {
    navigate(`detail/${id}`);
  };
  return (
    <>
      <section className="main container section">
        <div className="secTitle">
          <h3 data-aos="fade-right" className="title">
            Most visited restaurant
          </h3>
        </div>
        <div className="row">
          <div class="col-lg-3 sidebar">
            <div class="sidebar-wrap bg-light ftco-animate">
              <h3 class="heading mb-4">Find City</h3>
              <form action="#">
                <div class="fields">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Destination, City"
                    />
                  </div>
                  <div class="form-group">
                    <div class="select-wrap one-third">
                      <div class="icon">
                        <span class="ion-ios-arrow-down"></span>
                      </div>
                      <select
                        name=""
                        id=""
                        class="form-control"
                        placeholder="Keyword search"
                      >
                        <option value="">Select Location</option>
                        <option value="">San Francisco USA</option>
                        <option value="">Berlin Germany</option>
                        <option value="">Lodon United Kingdom</option>
                        <option value="">Paris Italy</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      id="checkin_date"
                      class="form-control"
                      placeholder="Date from"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      id="checkin_date"
                      class="form-control"
                      placeholder="Date to"
                    />
                  </div>
                  <div class="form-group">
                    <input type="number" value="25000" min="0" max="120000" /> -
                    <input type="number" value="50000" min="0" max="120000" />
                    <div class="range-slider">
                      <span></span>
                      <input
                        value="1000"
                        min="0"
                        max="120000"
                        step="500"
                        type="range"
                      />
                      <input
                        value="50000"
                        min="0"
                        max="120000"
                        step="500"
                        type="range"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      type="submit"
                      value="Search"
                      class="btn btn-primary py-3 px-5"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div class="sidebar-wrap bg-light ftco-animate">
              <h3 class="heading mb-4">Star Rating</h3>
              <form method="post" class="star-rating">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    <p class="rate">
                      <span>
                        <i class="icon-star"></i>
                        <i class="icon-star"></i>
                        <i class="icon-star"></i>
                        <i class="icon-star"></i>
                        <i class="icon-star"></i>
                      </span>
                    </p>
                  </label>
                </div>
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    <p class="rate">
                      <span>
                        <i class="icon-star"></i>
                        <i class="icon-star"></i>
                        <i class="icon-star"></i>
                        <i class="icon-star"></i>
                        <i class="icon-star-o"></i>
                      </span>
                    </p>
                  </label>
                </div>
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    <p class="rate">
                      <span>
                        <i class="icon-star"></i>
                        <i class="icon-star"></i>
                        <i class="icon-star"></i>
                        <i class="icon-star-o"></i>
                        <i class="icon-star-o"></i>
                      </span>
                    </p>
                  </label>
                </div>
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    <p class="rate">
                      <span>
                        <i class="icon-star"></i>
                        <i class="icon-star"></i>
                        <i class="icon-star-o"></i>
                        <i class="icon-star-o"></i>
                        <i class="icon-star-o"></i>
                      </span>
                    </p>
                  </label>
                </div>
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    <p class="rate">
                      <span>
                        <i class="icon-star"></i>
                        <i class="icon-star-o"></i>
                        <i class="icon-star-o"></i>
                        <i class="icon-star-o"></i>
                        <i class="icon-star-o"></i>
                      </span>
                    </p>
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row">
              {/* ----------------------- */}
              {/* <div className="secContent grid">

                                {accommodation.map((item, index) => (
                                    <div key={index} data-aos="fade-up-right" className='singleDestination'>
                                        {accommodationImage[index] && (
                                            <div className="imageDiv">
                                                <img src={`http://localhost:5158/${accommodationImage[index][0]}`} alt={item.accommodation_name} />
                                            </div>
                                        )}

                                        <div className="cardInfo">
                                            <h4 className="destTitle">
                                                {item.accommodation_name}
                                            </h4>
                                            <span className="continent flex">
                                                <Room className="icon" />
                                                <span className="name">
                                                    {item.location_id}
                                                </span>
                                            </span>

                                            <div className="fees flex">
                                                <div className="grade">
                                                    <span>
                                                        {item.type === true ? "Resort" : "Hotel"}
                                                        {/* <small> +1</small> */}
              {/* </span>
                                                </div>
                                                <div className="price">
                                                    <h5>{item.price}</h5>
                                                </div>
                                            </div>

                                            <div className="description">
                                                <p>{item.description}</p>
                                            </div>

                                            <button className='btn flex'>
                                                DETAILS <ContentPaste className='icon' />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div> */}
              {/* ----------------------- */}
              {restaurant.map((item, index) => (
                <div class="col-md-4 ftco-animate">
                  <div class="destination">
                    {restaurantImage[index] && (
                      <div>
                        <div
                          class="icon d-flex justify-content-center align-items-center"
                          onClick={() =>
                            handleDetailRestaurant(item.restaurant_id)
                          }
                        >
                          <img
                            src={`http://localhost:5158/${restaurantImage[index][0]}`}
                          />
                          <span class="icon-search2"></span>
                        </div>
                      </div>
                    )}
                    <div class="text p-3">
                      <div class="d-flex">
                        <div class="one">
                          <h3>
                            <a href={`restaurant/detail/${item.restaurant_id}`}>
                              {item.restaurant_name}
                            </a>
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
      </section>
    </>
  );
}

export default Restaurant;
