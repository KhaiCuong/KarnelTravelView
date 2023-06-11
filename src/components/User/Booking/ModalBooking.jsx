import React, { useContext, useEffect, useState } from "react";
import "./Booking.css";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { TourContext } from "../../Admin/contexts/TourContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import Swal from "sweetalert2";

const BookingModal = ({ setShowModal, showModal }) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { cartItems } = useShoppingCart();
  const usertoken = JSON.parse(localStorage.getItem("userToken"));
  let [change, setChange] = useState(0);
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

    for (let i = 0; i < cartItems.length; i++) {
      axios
        .post("http://localhost:5158/api/Booking/AddBooking", {
          user_id: user.user_id,
          accommodation_id: cartItems[i].id,
          quantity: cartItems[i].quantity,
          // created_at: cartItems[i].times.timeIn,
          // update_at: cartItems[i].times.timeOut,
        })
        .then((result) => {})
        .catch((err) => console.log(err));
    }

    if (change > 0) {
      axios
        .put(`http://localhost:5158/api/User/UpdateUser/${user.user_id}`, dataUser)
        .then((result) => {
          if (result.status === 200) {
            Swal.fire({
              title: "Custom animation with Animate.css",
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            }).then(() => {
              setShowModal(false);
              localStorage.removeItem("shopping-cart");
              window.location.reload();
            });
          }
        })

        .catch((err) => console.log(err));
    } else {
      Swal.fire({
        title: "Custom animation with Animate.css",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      }).then(() => {
        setShowModal(false);
        localStorage.removeItem("shopping-cart");
        window.location.reload();
      });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5158/api/User/GetUser/${usertoken.user_id}`)
      .then((res) => {
        setUser(res.data.data);
      })
      .then((error) => console.log(error));
  }, []);

  console.log("cartItem", cartItems);
  return (
    <ReactModal isOpen={showModal} style={{ zIndex: 1000 }} className="Modal shopping-cart text-black" overlayClassName="Overlay">
      <button className="closeBtn" onClick={() => setShowModal(false)}>
        <i class="fas fa-times-circle"></i>
      </button>

      <MDBRow>
        <MDBCol lg="7" className="px-4 py-4">
          <MDBTypography tag="h3" className="mb-5 pt-2 text-center fw-bold text-uppercase">
            Your products
          </MDBTypography>

          <div className="p-4" style={{ overflowY: "scroll", height: "360px" }}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
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
              <a href="#!" onClick={() => setShowModal(false)}>
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
