import React, { useEffect, useState } from "react";

// import "../Restaurant/css/Restaurant.css";
import { Room, ContentPaste } from "@mui/icons-material";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import {
  getListRestaurantUser,
  getRestaurantImageByID,
} from "../../User/Restaurant/Service/ApiService";


//Booking
import { useShoppingCart } from "../Context/ShoppingCartContext";

function Restaurant() {
  const [restaurant, setRestaurant] = useState([]);
  const [restaurantImage, setRestaurantImages] = useState([]);
  const [fullDescription, setFullDescription] = useState(false);
  
  const description = "Description";
  const navigate = useNavigate();

    //Booking
    var today = new Date();
    const date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
    let times = {
      timeIn : date,
      timeOut : "09:00",

    }

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

  const stars = document.querySelectorAll('.star-rating .star');
let rating = 0;

stars.forEach(function(star) {
  star.addEventListener('click', function() {
    rating = star.dataset.rating;
    applyRating(rating);
  });
});

function applyRating(rating) {
  stars.forEach(function(star) {
    if (star.dataset.rating <= rating) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}

// //search
// function searchRestaurant(keyword) {
//   const filteredRestaurant = restaurant.filter(restaurant => 
//     restaurant.restaurant_name.toLowerCase().includes(keyword.toLowerCase())
//     || restaurant.description.toLowerCase().includes(keyword.toLowerCase())
//   );
//   searchRestaurant(filteredRestaurant);
// }
// {searchResult.map(restaurant => (
//   <div key={restaurant.restaurant_id}>
//     <h3>{restaurant.restaurant_name}</h3>
//     <p>{restaurant.description}</p>
//   </div>
// ))}
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
                      // onChange={e => searchRestaurant(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div class="groove">
            <div class="sidebar-wrap bg-light ftco-animate">
              <h3 class="heading mb-4">Star Rating</h3>

              <div class="star-rating">
                <div class="star-rating">
                  <span class="star" data-rating="1"></span>
                  <span class="star" data-rating="2"></span>
                  <span class="star" data-rating="3"></span>
                  <span class="star" data-rating="4"></span>
                  <span class="star" data-rating="5"></span>
                </div>
              </div>
            </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="row">
     
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
                          {item.restaurant_name.length > 15  ? ( `${item.restaurant_name.substring(0, 15)}...`) : item.restaurant_name} 
                            </a>
                          </h3>
                          <p class="rate">
                            <p>
                              {item.rate} <i class="fa fa-star-o"></i>
                            </p>
                          </p>
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
                          <Link onClick={() => increaseCartQuantity(item.restaurant_id, "Restaurant",times)}>Book Now</Link>
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
