import React, { useContext, useEffect, useState } from "react";
import "./Booking.css";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { TourContext } from "../../Admin/contexts/TourContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Token } from "@mui/icons-material";

export default function Booking() {
  const navigate = useNavigate();
  const contextTour = useContext(TourContext);
  const { itemTour } = contextTour;
  const usertoken = JSON.parse(localStorage.getItem("userToken"));
  const [img, setImg] = useState([]);
  let [count, setCount] = useState(1);
  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    setCount(count);
  }

  let [change, setChange] = useState(0);
  // lay thong tin cu
  let [user, setUser] = useState([]);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    setChange(change + 1);
  };

  let dataBooking = {
    user_id: user.user_id,
    tour_id: itemTour.tour_id,
    quantity: count,
  };

  let dataUser = {
    user_id: user.user_id,
    user_name: user.user_name,
    phone_number: user.phone_number,
    address: user.address,
    role: user.role,
    total_payment: user.total_payment,
    status_User: user.status_User,
    email: user.email,
    password: user.password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5158/api/Booking/AddBooking", dataBooking)
      .then((result) => { })
      .then(() => {
        if (change > 0) {
          axios
            .put(`http://localhost:5158/api/User/UpdateUser/${user.user_id}`, dataUser)
            .then((result) => {
              if (result.status === 200) {
                navigate("/");
              }
            })
            .catch((err) => console.log(err));
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (usertoken != null) {
      axios
        .get(`http://localhost:5158/api/User/GetUser/${usertoken.user_id}`)
        .then((res) => {
          console.log("res", res);
          setUser(res.data.data);
        })
        .then((error) => console.log(error));
    }

    // axios
    //   .get(`http://localhost:5158/api/TouristSpotTour/GetListByTourId/${itemTour.tour_id}`)
    //   .then((s) => {

    //     return s.data.data;
    //   })
    //   .then((spot) => {
    //     axios
    //       .get(`http://localhost:5158/api/TouristSpotImage/GetImagesByTouristSpotId/${spot[0].touristSpot_id}`)
    //       .then((i) => {
    //         setImg(i.data.data[0]);
    //         console.log("i", i.data.data[0])
    //       })
    //       .then((error) => console.log(error));
    //   })
    //   .then((error) => console.log(error));
  }, []);
  return (
    <section className="h-100 h-custom bg-dark" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="h-100 py-5">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard className="shopping-cart" style={{ borderRadius: "15px" }}>
              <MDBCardBody className="text-black">
                <MDBRow>
                  <MDBCol lg="7" className="px-5 py-4">
                    <MDBTypography tag="h3" className="mb-5 pt-2 text-center fw-bold text-uppercase">
                      Your products
                    </MDBTypography>

                    <div className="d-flex align-items-center mb-5">
                      <div className="flex-shrink-0">
                        <MDBCardImage src={`http://localhost:5158/${img}`} fluid style={{ width: "150px" }} alt="Generic placeholder image" />
                      </div>

                      <div className="flex-grow-1 ms-3">
                        <a href="#!" className="float-end text-black">
                          <MDBIcon fas icon="times" />
                        </a>
                        <MDBTypography tag="h5" className="text-primary">
                          {itemTour.tour_name}
                        </MDBTypography>
                        <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
                          Departur Day : {itemTour.depature_date.slice(0, 10).split("-").reverse().join("-")}
                        </MDBTypography>
                        <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
                          Times: {itemTour.times}
                        </MDBTypography>
                        <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
                          Discount: {itemTour.total_payment > 3000 ? 10 : 0} %
                        </MDBTypography>


                        <div className="d-flex align-items-center">
                          <p className="fw-bold mb-0 me-5 pe-3">{itemTour.price}$</p>

                          <div className="def-number-input number-input safari_only">
                            <button className="minus" onClick={decrementCount}></button>
                            <input className="quantity fw-bold text-black" min={0} value={count} type="number" />
                            <button className="plus" onClick={incrementCount}></button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr
                      className="mb-4"
                      style={{
                        height: "2px",
                        backgroundColor: "#1266f1",
                        opacity: 1,
                      }}
                    />

                    <div className="d-flex justify-content-between px-x">
                      <p className="fw-bold">Discount: </p>
                      <p className="fw-bold">{itemTour.total_payment > 3000 ? 10 : 0} $</p>
                    </div>
                    <div className="d-flex justify-content-between p-2 mb-2" style={{ backgroundColor: "#e1f5fe" }}>
                      <MDBTypography tag="h5" className="fw-bold mb-0">
                        Total:
                      </MDBTypography>
                      <MDBTypography tag="h5" className="fw-bold mb-0">
                        {itemTour.price * count * (itemTour.total_payment > 3000 ? 0.9 : 1)}
                      </MDBTypography>
                    </div>
                  </MDBCol>
                  <MDBCol lg="5" className="px-5 py-4">
                    <MDBTypography tag="h3" className="mb-5 pt-2 text-center fw-bold text-uppercase">
                      User Information
                    </MDBTypography>

                    <form className="mb-5" onSubmit={handleSubmit}>
                      <MDBTypography tag="h5">Name</MDBTypography>
                      <div className="mb-3">
                        <MDBInput type="text" size="lg" name="user_name" value={user.user_name} onChange={handleChangeInput} />
                      </div>
                      <MDBTypography tag="h5">Phone Number</MDBTypography>
                      <div className="mb-3">
                        <MDBInput type="text" size="lg" name="phone_number" value={user.phone_number} onChange={handleChangeInput} />
                      </div>
                      <MDBTypography tag="h5">Email</MDBTypography>
                      <div className="mb-3">
                        <MDBInput type="text" size="lg" name="email" value={user.email} onChange={handleChangeInput} />
                      </div>

                      <p className="mb-5">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit
                        <a href="#!"> obcaecati sapiente</a>.
                      </p>

                      <button type="submit" className="ripple ripple-surface btn btn-primary btn-lg btn-block">
                        Book now
                      </button>

                      <MDBTypography tag="h5" className="fw-bold mb-5" style={{ position: "absolute", bottom: "0" }}>
                        <a href="#!">
                          <MDBIcon fas icon="angle-left me-2" />
                          Back to shopping
                        </a>
                      </MDBTypography>
                    </form>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
