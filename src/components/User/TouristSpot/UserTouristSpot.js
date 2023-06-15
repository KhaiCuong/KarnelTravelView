import React, { useEffect, useState } from "react";

import "../Accommodation/css/Accommodation.css";
import { Room, ContentPaste } from "@mui/icons-material";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";

//Booking
import { useShoppingCart } from "../Context/ShoppingCartContext";
import {
  GetImagesByTouristSpotId,
  GetTouristSpots,
} from "./Service/AppService";

function UserTouristSpot() {
  const [tourist, setTourist] = useState([]);
  const [touristsportImage, setTouristSpotImages] = useState([]);
  const navigate = useNavigate();

  //Booking
  var today = new Date();
  const date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    getBookingByBookingId,
  } = useShoppingCart();
  let times = {
    timeIn: date,
    timeOut: date,
  };

  useEffect(() => {
    const fetchTouristSpotData = async () => {
      try {
        const response = await GetTouristSpots();
        if (response.status === 200) {
          setTourist(response.data);
          const touristsportImage = [];

          for (let index = 0; index < response.data.length; index++) {
            console.log("response", response);
            const imageResponse = await GetImagesByTouristSpotId(
              response.data[index].touristSpot_id
            );
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
      <section className="main container section">
        <div className="secTitle">
          <h3 data-aos="fade-right" className="title">
            Most visited destinations
          </h3>
        </div>
        <div className="secContent grid">
          {tourist.map((item, idx) => (
            <div
              key={idx}
              data-aos="fade-up-right"
              className="singleDestination"
            >
                {touristsportImage[idx] && (
                      <div className="imageDiv">
                      <img
                        src={`http://localhost:5158/${touristsportImage[idx][0]}`}
                        alt={item}
                      />
                    </div>
                )}
            

              <div className="cardInfo">
                <h4 className="destTitle">{item.touristSpot_name}</h4>
                  
                <span className="continent flex">
                  <Room className="icon" />
                  <span className="name">{item.Location_id}</span>
                </span>

                <div className="fees flex">
                  {/* <div className="grade">
                    <span>
                      {item.grade}
                      <small> +1</small>
                    </span>
                  </div> */}
                  <div className="price">
                    <h5>{item.price}</h5>
                  </div>
                </div>

                <div className="description">
                  <p>{item.description}</p>
                </div>

                <button className="btn flex"
                onClick={()=>
                    handleDetailTouristSpot(item.touristSpot_id)
                }
                >
                  DETAILS <ContentPaste className="icon" />
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
