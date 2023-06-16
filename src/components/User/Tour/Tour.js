import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getImageByTouristSpotID, getListTour, getListTouristSpot, getListTouristSpotTourByTourID } from "./Services/ApiService";
import "aos/dist/aos.css";
import { ContentPaste, Room } from '@mui/icons-material';

//Booking



// search
import "aos/dist/aos.css";
import { useSearch } from "../../contexts/SearchContext";
import { LocationOnOutlined, FilterListOutlined, FacebookOutlined, Instagram, CardTravel, FormatListBulleted, AppRegistrationOutlined } from "@mui/icons-material";
import { useShoppingCart } from "../Context/ShoppingCartContext";


function Tour() {

  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, getBookingByBookingId } = useShoppingCart();

  const [tour, setTour] = useState([]);
  //const [tourImage, setTourImage] = useState([]);
  const [touristSpot, setTouristSpot] = useState([]);
  const [touristSpotImage, setTouristSpotImage] = useState([]);
  const navigate = useNavigate();

  //search
  const { sendInfo, itemSearch } = useSearch();
  const [rs, setRs] = useState(0);
  const [fKey, setFKey] = useState("");
  const [fService, setFService] = useState("Tour");
  {
    /***/
  }
  const [fPrice, setFPrice] = useState(10000);
  const [isHiden, setIsHiden] = useState(true);
  const handelFilter = (e) => {
    sendInfo(fKey, fService, fPrice);
    {
      /***/
    }
    if (fService === "Accommodation") {
      navigate("/accommodation");
    } else if (fService === "Restaurant") {
      navigate("/restaurant");
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

    const fetchTourData = async () => {
      try {
        const tourResponse = await getListTour();

        //console.log("tourResponse", tourResponse.data);
        if (tourResponse.status === 200) {
          setTour(tourResponse.data);
          //console.log("tourResponse.data.length", tourResponse.data.length);

          // array
          const touristSpotImageArray = [];

          for (let index = 0; index < tourResponse.data.length; index++) {
            const touristSpotResponse = await getListTouristSpotTourByTourID(tourResponse.data[index].tour_id);

            console.log("touristSpotResponse", touristSpotResponse);

            if (touristSpotResponse.status === 200) {
              const imageResponse = await getImageByTouristSpotID(touristSpotResponse.data[0].touristSpot_id);

              console.log("imageResponse", imageResponse);

              if (imageResponse.status === 200) {
                touristSpotImageArray[index] = imageResponse.data;
              }
              console.log("touristSpotImageArray", touristSpotImageArray);
            }
          }
          setTouristSpotImage(touristSpotImageArray);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchTourData();
  }, []);
  // console.log("Tour", tour);
  console.log("image", touristSpotImage);

  const handleDetailTour = (id) => {
    navigate(`detail/${id}`);
  };
  return (
    <>
    <div className="main-view">
      {/* search */}
      <section className="home " style={{ height: "300px", alignItems: "end" }}>
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
                  <option value="Tour">Tour</option> {/***/}
                  <option value="Restaurant">Restaurant</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Tourist Sppot">Tourist Sppot</option>
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
      <section className="main container section pt-0 pl-0 pr-0 min-vh-100">
        <div className="secTitle">
          <h3 data-aos="fade-right" className="title">
            Most visited destinations
          </h3>
        </div>
        <div className="secContent grid">
          {/* search */}
          {tour
            .filter((i) => i.tour_name.toLowerCase().includes(fKey.toLowerCase()))
            .filter((i) => i.price < fPrice)
            .map((item, index) => (
              <div key={index} data-aos="fade-up-right" className="singleDestination">
                {touristSpotImage[index] && (
                  <div className="imageDiv">
                    <img src={`http://localhost:5158/${touristSpotImage[index][0]}`} alt={item}  onClick={() => handleDetailTour(item.tour_id)} style={{cursor:"pointer"}} />
                  </div>
                )}

                <div className="cardInfo">
                  <h4 className="destTitle"  onClick={() => handleDetailTour(item.tour_id)} style={{cursor:"pointer"}}>{item.tour_name}</h4>
                  <span className="continent flex"  onClick={() => handleDetailTour(item.tour_id)} style={{cursor:"pointer"}}>
                    <Room className="icon" />
                    <span className="name">{item.depature_date.split("T")[0]}</span>
                  </span>

                  <div className="fees flex">
                    <div className="grade">
                      <span>{item.times} hours</span>
                    </div>
                    <div className="price">
                      <h5>{item.price} $</h5>
                    </div>
                  </div>

                  <div className="description">
                    <p>{item.description}</p>
                  </div>

                  <button className="btn flex"  onClick={() => increaseCartQuantity(item.tour_id, "Tour", times)} >
                  Book now <ContentPaste className="icon"/>
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

export default Tour;
