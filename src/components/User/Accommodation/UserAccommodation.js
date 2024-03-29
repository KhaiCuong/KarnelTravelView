import React, { useEffect, useState } from "react";
import { getAccommodationImageByID, getListAccommodation } from "./Services/ApiService";
import "../Accommodation/css/Accommodation.css";
import { Room, ContentPaste } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
// search
import "aos/dist/aos.css";
import { useSearch } from "../../contexts/SearchContext";
import { LocationOnOutlined, FilterListOutlined, FacebookOutlined, Instagram, CardTravel, FormatListBulleted, AppRegistrationOutlined } from "@mui/icons-material";
// import "../../Home/home.css";



//Booking
import { useShoppingCart } from "../Context/ShoppingCartContext";

function UserAccommodation() {
  const [accommodation, setAccommodation] = useState([]);
  const [accommodationImage, setAccommodationImages] = useState([]);

  const navigate = useNavigate();

  // search
  const { sendInfo, itemSearch } = useSearch();
  const [rs, setRs] = useState(0);
  const [fKey, setFKey] = useState("");
  const [fService, setFService] = useState("Accommodation");
  const [fPrice, setFPrice] = useState(10000);
  const [isHiden, setIsHiden] = useState(true);
  const handelFilter = (e) => {
    sendInfo(fKey, fService, fPrice);
    if (fService === "Restaurant") {
      navigate("/restaurant");
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

    const fetchAccommodationData = async () => {
      try {
        const response = await getListAccommodation();
        if (response.status === 200) {
          setAccommodation(response.data);
          const accommodationImages = [];

          for (let index = 0; index < response.data.length; index++) {
            console.log("response", response);
            const imageResponse = await getAccommodationImageByID(response.data[index].accommodation_id);
            console.log("imageResponse", imageResponse);
            if (imageResponse.status === 200) {
              accommodationImages[index] = imageResponse.data;
            }
          }

          setAccommodationImages(accommodationImages);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchAccommodationData();
  }, []);
  console.log("fService", fService);

  const handleDetailAccommodation = (id) => {
    navigate(`detail/${id}`);
  };
  return (
    <>
      {/* search */}
      <div className="main-view">
      <section className="home " style={{ height: "auto", alignItems: "end" }}>
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
                  <option value="Accommodation">Accommodation</option>
                  <option value="Restaurant">Restaurant</option>
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
                <h3 className="total ">$1000</h3>
              </div>
              <div className="input flex position-relative ">
                <p className="position-absolute text-light mb-0 bg-secondary pl-1 pr-1 rounded " style={{ bottom: "100%", left: "43%" }} hidden={isHiden}>
                  {fPrice}
                </p>
                <input type="range" max="1000" min="1" onChange={FilterPrice} onMouseUp={handelDisplay} onMouseDown={handelHiden} value={fPrice} />
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

      <section className="main container section pt-0 pl-0 pr-0  min-vh-100">
        <div className="secTitle">
          <h3 data-aos="fade-right" className="title ">
            Most visited destinations
          </h3>
        </div>
        <div className="secContent grid">
          {/* search */}
          {accommodation
            .filter((i) => i.accommodation_name.toLowerCase().includes(fKey.toLowerCase()))
            .filter((i) => i.price < fPrice)
            .map((item, index) => (
              <div key={index} data-aos="fade-up-right" className="singleDestination">
                {accommodationImage[index] && (
                  <div className="imageDiv">
                    <img src={`http://localhost:5158/${accommodationImage[index][0]}`} alt={item} onClick={() => handleDetailAccommodation(item.accommodation_id)} style={{cursor:"pointer"}}/>
                  </div>
                )}

                <div className="cardInfo" >
                  <h4 className="destTitle" onClick={() => handleDetailAccommodation(item.accommodation_id)} style={{cursor:"pointer"}}>{item.accommodation_name}</h4>
                  <span className="continent flex" onClick={() => handleDetailAccommodation(item.accommodation_id)} style={{cursor:"pointer"}}>
                    <Room className="icon" />
                    <span className="name">{item.location_id}</span>
                  </span>

                  <div className="fees flex">
                    <div className="grade">
                      <span>{item.rate} <i class="fa fa-star-o"></i></span>
                    </div>
                    <div className="price">
                      <h5>${item.price} / Night</h5>
                    </div>
                  </div>

                  <div className="description">
                    <p>{item.description}</p>
                  </div>

                  <button className="btn flex" onClick={() => increaseCartQuantity(item.accommodation_id, "Accommodation", times)}>
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

export default UserAccommodation;
