import React, { useEffect, useState } from "react";
import "../Restaurant/css/Restaurant.css";
import { Room, ContentPaste } from "@mui/icons-material";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { getListRestaurantUser, getRestaurantImageByID } from "../../User/Restaurant/Service/ApiService";

// search
import "aos/dist/aos.css";
import { useSearch } from "../../contexts/SearchContext";
import { LocationOnOutlined, FilterListOutlined, FacebookOutlined, Instagram, CardTravel, FormatListBulleted, AppRegistrationOutlined } from "@mui/icons-material";

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
    timeIn: date,
    timeOut: "09:00",
  };

  //search
  const { sendInfo, itemSearch } = useSearch();
  const [rs, setRs] = useState(0);
  const [fKey, setFKey] = useState("");
  const [fService, setFService] = useState("Restaurant");
  const [fPrice, setFPrice] = useState(10000);
  const [isHiden, setIsHiden] = useState(true);
  const handelFilter = (e) => {
    sendInfo(fKey, fService, fPrice);
    if (fService === "Accommodation") {
      navigate("/accommodation");
    } else if (fService === "Tour") {
      navigate("/tour");
    } else if (fService === "Tourist Sppot") {
      navigate("/touristsport");
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

  useEffect(() => {
    // Search
    if (typeof itemSearch.key != "undefined") {
      setFKey(itemSearch.key);
    }
    if (typeof itemSearch.price != "undefined") {
      setFPrice(itemSearch.price);
    }

    const fetchRestaurantData = async () => {
      try {
        const response = await getListRestaurantUser();
        if (response.status === 200) {
          setRestaurant(response.data);
          const restaurantImages = [];

          for (let index = 0; index < response.data.length; index++) {
            console.log("response", response);
            const imageResponse = await getRestaurantImageByID(response.data[index].restaurant_id);
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

  const stars = document.querySelectorAll(".star-rating .star");
  let rating = 0;

  stars.forEach(function (star) {
    star.addEventListener("click", function () {
      rating = star.dataset.rating;
      applyRating(rating);
    });
  });

  function applyRating(rating) {
    stars.forEach(function (star) {
      if (star.dataset.rating <= rating) {
        star.classList.add("selected");
      } else {
        star.classList.remove("selected");
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
      <div className="main-view">
        {/* search */}
        <section className="home" style={{ height: "300px", alignItems: "end" }}>
          <div className="homeContent container pb-0 ">
            <div className="cardDiv grid bg-light">
              <div className="destinationInput">
                <label htmlFor="city" className=" ">
                  Search your destination:
                </label>
                <div className="input flex">
                  <input type="text" placeholder="Input your destination" onChange={FilterKey} value={fKey != null && fKey} />
                  <LocationOnOutlined className="icon" />
                </div>
              </div>

              <div className="dateInput">
                <label htmlFor="service" className=" ">
                  Select the Service:
                </label>
                <div className="input flex">
                  <select name="" id="" placeholder="Keyword search" onChange={FilterService} className="w-100" style={{ border: "none", backgroundColor: "#efefef" }}>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Accommodation">Accommodation</option>
                    <option value="Tourist Sppot">Tourist Sppot</option>
                    <option value="Tour">Tour</option>
                    <option value="Transport">Transport</option>
                  </select>
                </div>
              </div>

              <div className="priceInput">
                <div className="label_total flex">
                  <label htmlFor="price" className=" ">
                    Max Price:
                  </label>
                  <h3 className="total ">$10000</h3>
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

        <section className="main container section pt-0   min-vh-100">
          <div className="secTitle">
            <h3 data-aos="fade-right" className="title">
              Most visited restaurant
            </h3>
          </div>

          <div className="secContent grid">
            {restaurant
              .filter((i) => i.restaurant_name.toLowerCase().includes(fKey.toLowerCase()))
              .filter((i) => i.price < fPrice)
              .map((item, idx) => (
                <div key={idx} data-aos="fade-up-right" className="singleDestination">
                  {restaurantImage[idx] && (
                    <div className="imageDiv" onClick={() => handleDetailRestaurant(item.restaurant_id)} style={{ cursor: "pointer" }}>
                      <img src={`http://localhost:5158/${restaurantImage[idx][0]}`} alt={item.restaurant_name} />
                    </div>
                  )}
                  <div className="cardInfo" >
                    <h4 className="destTitle" onClick={() => handleDetailRestaurant(item.restaurant_id)} style={{ cursor: "pointer" }}>{item.restaurant_name}</h4>
                    <span className="continent flex">
                      <Room className="icon" onClick={() => handleDetailRestaurant(item.restaurant_id)} style={{ cursor: "pointer" }}/>
                      <span className="name">{item.location_id}</span>
                    </span>

                    <div className="fees flex">
                      <div className="grade">
                        <span>
                          {item.rate}
                          <i class="fa fa-star-o"></i>
                        </span>
                      </div>
                      <div className="price">
                        <h5>
                          {item.price}
                          <i class="fa fa-dollar"></i>
                        </h5>
                      </div>
                    </div>

                    <div className="description">{fullDescription ? <p>{item.description}</p> : <p>{`${item.description.substring(0, 100)}...`}</p>}</div>

                    <button className="btn flex" onClick={() => increaseCartQuantity(item.restaurant_id, "Restaurant", times)}>
                      Book now <ContentPaste className="icon" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Restaurant;
