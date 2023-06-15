import React, { useEffect, useState } from "react";

import "../Accommodation/css/Accommodation.css";
import { Room, ContentPaste } from "@mui/icons-material";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";

// search
import "aos/dist/aos.css";
import { useSearch } from "../../contexts/SearchContext";
import { LocationOnOutlined, FilterListOutlined, FacebookOutlined, Instagram, CardTravel, FormatListBulleted, AppRegistrationOutlined } from "@mui/icons-material";
// import "../../Home/home.css";

//Booking
import { useShoppingCart } from "../Context/ShoppingCartContext";
import { GetImagesByTouristSpotId, GetTouristSpots } from "./Service/AppService";

function UserTouristSpot() {
  const [tourist, setTourist] = useState([]);
  const [touristsportImage, setTouristSpotImages] = useState([]);
  const navigate = useNavigate();

  // search
  const { sendInfo, itemSearch } = useSearch();
  const [rs, setRs] = useState(0);
  const [fKey, setFKey] = useState("");
  const [fService, setFService] = useState("Tourist Sppot");
  const [fPrice, setFPrice] = useState(10000);
  const [isHiden, setIsHiden] = useState(true);
  const handelFilter = (e) => {
    sendInfo(fKey, fService, fPrice);
    if (fService === "Restaurant") {
      navigate("/restaurant");
    } else if (fService === "Tour") {
      navigate("/tour");
    } else if (fService === "Accommodation") {
      navigate("/accommodation");
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

  //Booking
  var today = new Date();
  const date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, getBookingByBookingId } = useShoppingCart();
  let times = {
    timeIn: date,
    timeOut: date,
  };

  useEffect(() => {
    // Search
    if (typeof itemSearch.key != "undefined") {
      setFKey(itemSearch.key);
    }
    if (typeof itemSearch.price != "undefined") {
      setFPrice(itemSearch.price);
    }


    const fetchTouristSpotData = async () => {
      try {
        const response = await GetTouristSpots();
        if (response.status === 200) {
          setTourist(response.data);
          const touristsportImage = [];

          for (let index = 0; index < response.data.length; index++) {
            console.log("response", response);
            const imageResponse = await GetImagesByTouristSpotId(response.data[index].touristSpot_id);
            
            console.log("imageResponse", imageResponse);
            if (imageResponse.status === 200) {
              touristsportImage[index] = imageResponse.data;
            }
          }

          setTouristSpotImages(touristsportImage);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchTouristSpotData();
  }, []);


  const handleDetailTouristSpot = (id) => {
    navigate(`detail/${id}`);
  };
  return (
    <>
      {/* search */}
      <section className="home" style={{ height: "300px", alignItems: "end" }}>
        <div className="homeContent container pb-0 ">
          <div className="cardDiv grid bg-secondary">
            <div className="destinationInput">
              <label htmlFor="city" className=" text-white">
                Search your destination:
              </label>
              <div className="input flex">
                <input type="text" placeholder="Input your destination" onChange={FilterKey} value={fKey != null && fKey} />
                <LocationOnOutlined className="icon" />
              </div>
            </div>

            <div className="dateInput">
              <label htmlFor="service" className=" text-white">
                Select the Service:
              </label>
              <div className="input flex">
                <select name="" id="" placeholder="Keyword search" onChange={FilterService} className="w-100" style={{ border: "none", backgroundColor: "#efefef" }}>
                  <option value="Tourist Sppot">Tourist Sppot</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Restaurant">Restaurant</option>

                  <option value="Tour">Tour</option>
                  <option value="Transport">Transport</option>
                </select>
              </div>
            </div>

            <div className="priceInput">
              <div className="label_total flex">
                <label htmlFor="price" className=" text-white">
                  Max Price:
                </label>
                <h3 className="total text-white">$10000</h3>
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
      
      <section className="main container section  pt-0 pl-0 pr-0 min-vh-100">
        <div className="secTitle">
          <h3 data-aos="fade-right" className="title">
            Most visited destinations
          </h3>
        </div>
        {/* search */}

        <div className="secContent grid">
          {tourist
            .filter((i) => i.touristSpot_name.toLowerCase().includes(fKey.toLowerCase()))
            .filter((i) => i.price < fPrice)
            .map((item, idx) => (
              <div key={idx} data-aos="fade-up-right" className="singleDestination">
                {touristsportImage[idx] && (
                  <div className="imageDiv">
                    <img src={`http://localhost:5158/${touristsportImage[idx][0]}`} alt={item} onClick={() => handleDetailTouristSpot(item.touristSpot_id)}  style={{cursor:"pointer"}} />
                  </div>
                )}

                <div className="cardInfo">
                  <h4 className="destTitle" onClick={() => handleDetailTouristSpot(item.touristSpot_id)}  style={{cursor:"pointer"}}>{item.touristSpot_name}</h4>

                  <span className="continent flex" onClick={() => handleDetailTouristSpot(item.touristSpot_id)}  style={{cursor:"pointer"}}>
                    <Room className="icon" />
                    <span className="name">{item.location_id}</span>
                  </span>

                  <div className="fees flex">
                    {/* <div className="grade">
                    <span>
                      {item.grade}
                      <small> +1</small>
                    </span>
                  </div> */}
                    <div className="price">
                      <h5> {item.price} $</h5>
                    </div>
                  </div>

                  <div className="description">
                    <p>{item.description}</p>
                  </div>

                  <button className="btn flex" onClick={() => increaseCartQuantity(item.touristSpot_id, "TouristSpot", times)} >
                  Book now <ContentPaste className="icon"  />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
export default UserTouristSpot;
