import { useShoppingCart } from "../Context/ShoppingCartContext";
import "./Booking.css";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import axios from "axios";

export function CartItem({ id, quantity, type, times }) {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity, changeQuantity, changeDate } = useShoppingCart();
  const [item, setItem] = useState([]);
  const [location, setLocation] = useState([]);

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
          //
          // setTimeOut(t.data.data.update_at.slice(0, 10).split("-").reverse().join("-"))
          return t.data.data;
        })
        .then((item) => {
          axios
            .get(`http://localhost:5158/api/Location/GetLocation/${item.location_id}`)
            .then((t) => {
              setLocation(t.data.data.location_name);
            })
            .then((error) => console.log(error));
        })
        .then((error) => console.log(error));
    }
  }, []);
  const handleChangeInput = (e) => {
    setCount(e.target.value);
    changeQuantity(item.accommodation_id, e.target.value, "Accommodation");
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
    <div className="d-flex align-items-center mb-5">
      <div className="flex-shrink-0">
        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/6.webp" fluid style={{ width: "150px" }} alt="Generic placeholder image" />
      </div>

      <div className="flex-grow-1 ms-3">
        <button className="float-end text-black border-0 bg-white" onClick={() => removeFromCart(item.accommodation_id)}>
          <MDBIcon fas icon="times" />
        </button>

        <MDBTypography tag="h5" className="text-primary">
          {/* {item.tour_name} */}
          {item.accommodation_name}

          {type === "Accommodation" && <i class="fas fa-home ml-3"></i>}
          {type === "Transport" && <i class="fas fa-car-side ml-3"></i>}
          {type === "Restaurant" && <i class="fas fa-utensils ml-3"></i>}
          {type === "TouristSpot" && <i class="fas fa-map-marked  ml-3"></i>}
        </MDBTypography>
        <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
          {/* Departur Day : {item.depature_date.slice(0, 10).split("-").reverse().join("-")} */}
        </MDBTypography>
        <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
          {/* Times: {item.times} */}
          Location : {location}
        </MDBTypography>
        <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
          {/* Times: {item.times} */}
          Check-in date :{timeIn}
          <input type="date" id="checkin_date" onChange={handleChangeDateIn} onBlur={handleSaveDate} className="form-control" />
          {timeIn > timeOut && <span className="text-danger"> Date must be less than Check-out Date</span>}
        </MDBTypography>
        <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
          Check-out date :{timeOut}
          <input type="date" id="checkout_date" onChange={handleChangeDateOut} onBlur={handleSaveDate} className="form-control" />
          {timeOut < timeIn && <span className="text-danger"> Date must be greater than Check-in Date</span>}
          {/* Discount: {item.total_payment > 3000 ? 10 : 0} % */}
        </MDBTypography>

        <div className="d-flex align-items-center">
          <p className="fw-bold mb-0 me-5 pe-3">{item.price}$</p>

          <div className="def-number-input number-input safari_only">
            <button
              className="minus"
              onClick={() => {
                decreaseCartQuantity(item.accommodation_id);
                decrementCount();
              }}
            ></button>
            <input className="quantity fw-bold text-black" onChange={handleChangeInput} value={count} type="number" />
            <button
              className="plus"
              onClick={() => {
                increaseCartQuantity(item.accommodation_id);
                incrementCount();
              }}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
