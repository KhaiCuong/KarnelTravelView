import React, { useContext, useEffect, useState } from "react";
import "./Booking.css";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { TourContext } from "../../Admin/contexts/TourContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";

const BookingModal = ({ setShowModal, showModal }) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const contextTour = useContext(TourContext);
  // const { itemTour } = contextTour;

  let [count, setCount] = useState(1);
  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    setCount(count);
  }

  const usertoken = JSON.parse(localStorage.getItem("userToken"));
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
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5158/api/User/GetUser/${usertoken.user_id}`)
      .then((res) => {
        setUser(res.data.data);
      })
      .then((error) => console.log(error));

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
    <ReactModal isOpen={showModal} style={{ zIndex: 1000 }} className="Modal shopping-cart text-black" overlayClassName="Overlay">
      <button className="closeBtn" onClick={() => setShowModal(false)}>
        <i class="fas fa-times-circle"></i>
      </button>

      <MDBRow>
        <MDBCol lg="7" className="px-5 py-4">
          <MDBTypography tag="h3" className="mb-5 pt-2 text-center fw-bold text-uppercase">
            Your products
          </MDBTypography>

          <div className="d-flex align-items-center mb-5">
            <div className="flex-shrink-0">
              <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/6.webp" fluid style={{ width: "150px" }} alt="Generic placeholder image" />
            </div>

            <div className="flex-grow-1 ms-3">
              <a href="#!" className="float-end text-black">
                <MDBIcon fas icon="times" />
              </a>
              <MDBTypography tag="h5" className="text-primary"></MDBTypography>
              <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
                Departur Day :
              </MDBTypography>
              <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
                Times:
              </MDBTypography>
              <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
                Discount:
              </MDBTypography>

              <div className="d-flex align-items-center">
                <p className="fw-bold mb-0 me-5 pe-3">$</p>

                <div className="def-number-input number-input safari_only align-items-center">
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
            <p className="fw-bold">$</p>
          </div>
          <div className="d-flex justify-content-between p-2 mb-2" style={{ backgroundColor: "#e1f5fe" }}>
            <MDBTypography tag="h5" className="fw-bold mb-0">
              Total:
            </MDBTypography>
            <MDBTypography tag="h5" className="fw-bold mb-0"></MDBTypography>
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
    </ReactModal>
  );
};

export default BookingModal;
