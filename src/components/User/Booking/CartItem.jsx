import { useShoppingCart } from "../Context/ShoppingCartContext";
import "./Booking.css";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import axios from "axios";

export function CartItem({ id, quantity, type, times }) {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity, changeQuantity, changeDate,SetPrice } = useShoppingCart();
  const [item, setItem] = useState([]);
  const [location, setLocation] = useState([]);
  const [img, setImg] = useState([]);

  // var today = new Date();
  // const date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  // console.log("timeIn",timeIn)
  const [timeIn, setTimeIn] = useState([]);
  const [timeOut, setTimeOut] = useState([]);
  let [count, setCount] = useState(quantity);
  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    setCount(count);
  }

  useEffect(() => {
    if (typeof times != "undefined") {
      setTimeIn(times.timeIn);
      setTimeOut(times.timeOut);
    }

    if (type === "Accommodation") {
      axios
        .get(`http://localhost:5158/api/Accommodation/GetAccommodation/${id}`)
        .then((t) => {
          setItem(t.data.data);
          SetPrice(id,t.data.data.price);
          return t.data.data;
        })
        .then((item) => {
          axios
            .get(`http://localhost:5158/api/Location/GetLocation/${item.location_id}`)
            .then((t) => {
              setLocation(t.data.data.location_name);
            })
            .then((error) => console.log(error));

          axios
            .get(`http://localhost:5158/api/AccommodationImage/GetImagesByTouristSpotId/${id}`)
            .then((t) => {
              setImg(t.data.data[0]);
            })
            .then((error) => console.log(error));
        })
        .then((error) => console.log(error));
    } else if (type === "Restaurant") {
      axios
        .get(`http://localhost:5158/api/Restaurant/GetRestaurantById/${id}`)
        .then((t) => {
          setItem(t.data.data);
          SetPrice(id,t.data.data.price);

          return t.data.data;
        })
        .then((item) => {
          axios
            .get(`http://localhost:5158/api/Location/GetLocation/${item.location_id}`)
            .then((t) => {
              setLocation(t.data.data.location_name);
            })
            .then((error) => console.log(error));

          axios
            .get(`http://localhost:5158/api/ResImg/GetImagesByRestaurantId/${id}`)
            .then((t) => {
              setImg(t.data.data[0]);
            })
            .then((error) => console.log(error));
        })
        .then((error) => console.log(error));
    }

  }, []);
console.log(item.price);

  const handleChangeInput = (e) => {
    if (type === "Accommodation") {
      setCount(e.target.value);
      changeQuantity(item.accommodation_id, e.target.value, "Accommodation");
    }
  };

  const handleChangeDateIn = (e) => {
    setTimeIn(e.target.value);
  };

  const handleChangeDateOut = (e) => {
    setTimeOut(e.target.value);
  };

  const handleSaveDate = () => {
    changeDate(item.accommodation_id, { timeIn, timeOut });
  };

  return (
    <div className="d-flex align-items-center mb-3 border border-primary rounded p-3">
      <div className="flex-shrink-0">
        <MDBCardImage src={`http://localhost:5158/${img}`} fluid style={{ width: "150px" }} alt="Generic placeholder image" />
      </div>

      <div className="flex-grow-1 ms-3">
        <button
          className="float-end text-black border-0 bg-white"
          onClick={() => {
            if (type === "Accommodation") {
              removeFromCart(item.accommodation_id);
            } else if (type === "Restaurant") {
              removeFromCart(item.restaurant_id);
            }
          }}
        >
          <MDBIcon fas icon="times" />
        </button>

        <MDBTypography tag="h5" className="text-primary">
          {type === "Accommodation" && item.accommodation_name}
          {type === "Restaurant" && item.restaurant_name}

          {type === "Accommodation" && <i class="fas fa-home ml-3"></i>}
          {type === "Transport" && <i class="fas fa-car-side ml-3"></i>}
          {type === "Restaurant" && <i class="fas fa-utensils ml-3"></i>}
          {type === "TouristSpot" && <i class="fas fa-map-marked  ml-3"></i>}
        </MDBTypography>
        <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
          {/* Departur Day : {item.depature_date.slice(0, 10).split("-").reverse().join("-")} */}
        </MDBTypography>
        <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
          Location : {location}
        </MDBTypography>

        <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
          Check-in date :{timeIn}
          <input type="date" id="checkin_date" onChange={handleChangeDateIn} onBlur={handleSaveDate} className="form-control"  />
          {type === "Accommodation" && timeIn > timeOut && <span className="text-danger "> Date must be less than Check-out Date</span>}
          {type === "Restaurant" && <span class="validity position-relative"></span>}
        </MDBTypography>

        {type === "Accommodation" && (
          <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
            Check-out date : {timeOut}
            <input type="date" id="checkout_date" onChange={handleChangeDateOut} onBlur={handleSaveDate} className="form-control" />
            {timeOut < timeIn && <span className="text-danger "> Date must be greater than Check-in Date</span>}
          </MDBTypography>
        )}

        {type === "Restaurant" && (
          <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
            Check-out date :{timeOut} ( From 9am To 10pm)
            <input type="time" id="appt-time" name="appt" onChange={handleChangeDateOut} className="form-control" min="09:00" max="22:00" required></input>
            <span class="validity position-relative" ></span>
          </MDBTypography>
        )}

        <div className="d-flex align-items-center">
          <p className="fw-bold mb-0 me-5 pe-3">{item.price}$</p>

          <div className="def-number-input number-input safari_only">
            <button
              className="minus"
              onClick={() => {
                if (type === "Accommodation") {
                  decreaseCartQuantity(item.accommodation_id);
                } else if (type === "Restaurant") {
                  increaseCartQuantity(item.restaurant_id);
                }

                decrementCount();
              }}
            ></button>
            <input className="quantity fw-bold text-black" onChange={handleChangeInput} value={count} type="number" />
            <button
              className="plus"
              onClick={() => {
                if (type === "Accommodation") {
                  increaseCartQuantity(item.accommodation_id);
                } else if (type === "Restaurant") {
                  increaseCartQuantity(item.restaurant_id);
                }

                incrementCount();
              }}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
