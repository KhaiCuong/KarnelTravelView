import React, { useContext, useEffect, useState } from "react";
import "./Booking.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUser, getBookingByUserId, deleteBooking, getAccommodation, getRestaurant, postFeedback, getFeedbackList, getTransport, getBookingByBookingId } from "./Services/ApiService";
import Swal from "sweetalert2";

export default function BookingList() {
  const navigate = useNavigate();
  let [bookList, setBookList] = useState([]);
  let [listService, setListService] = useState([]);
  function handelDetail(id, type) {
    if (type == "Accommodation") {
      navigate(`/accommodation/detail/:${id}`);
    } else if (type == "Restaurant") {
      navigate(`/restaurant/detail/:${id}`);
    } else if (type == "Transport") {
      navigate(`/usertransport/detail/:${id}`);
    }
  }
  function handelDelete(id) {
    Swal.fire({
      title: "Do you want to delete it?",
      text: "You want to submit it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:5158/api/Booking/DeleteEmployee/${id}`)
            .then((response) => {
              if (response.status === 200) {
                window.location.reload();
              }

            })
            .catch((error) => console.log("error", error));

        }
      })
  
  }
  const usertoken = JSON.parse(localStorage.getItem("userToken"));

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        if (usertoken != null) {
          const bookingRes = await getBookingByUserId(usertoken.user_id);
          if (bookingRes.status === 200) {
            setBookList(bookingRes.data);
            const book = [];
            for (let index = 0; index < bookingRes.data.length; index++) {
              const bkId = await getBookingByBookingId(bookingRes.data[index].booking_id);
              if (bkId.status === 200) {
                if (bkId.data.accommodation_id != null) {
                  const Accres = await getAccommodation(bkId.data.accommodation_id);
                  if (Accres.status === 200) {
                    book[index] = { id: Accres.data.accommodation_id, name: Accres.data.accommodation_name, price: Accres.data.price, type: "Accommodation" };
                  }
                }
                if (bkId.data.restaurant_id != null) {
                  const Resres = await getRestaurant(bkId.data.restaurant_id);
                  if (Resres.status === 200) {
                    book[index] = { id: Resres.data.restaurant_id, name: Resres.data.restaurant_name, price: Resres.data.price, type: "Restaurant" };
                  }
                }
                if (bkId.data.transport_id != null) {
                  const ResTrans = await getTransport(bkId.data.transport_id);
                  if (ResTrans.status === 200) {
                    book[index] = { id: ResTrans.data.transport_id, name: ResTrans.data.transport_name, price: ResTrans.data.price, type: "Transport" };
                  }
                }
              }
            }
            setListService(book);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchBookingData();
  }, []);
  console.log("listService", Object(listService[0]).price);

  return (
    <section className="ftco-section ftco-degree-bg min-vh-100">
      <div className="container">
        <div className="row mb-5 mt-3">
          {listService.map((item, index) => (
            <div className="col-lg-6 ">
              <div className="hotel-single mt-4 ftco-animate border-dark border border-white pl-3  pr-3 pb-5 pt-4 bg-dark" style={{ borderRadius: "13px" }}>
                <h2 className="text-center text-light">The Information Booking</h2>
                <h2 className="text-center text-light" style={{ fontSize: "12px" }}>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </h2>
                <div className="mt-4 ml-4 ">
                  <div className="d-flex text-dark align-items-center ">
                    <i class="fas fa-arrow-circle-up text-light"></i>
                    <h5 className="mr-2 mb-0 ml-1 text-light"> Name: </h5>
                    <p className="mb-0 text-light"> {item.name} </p>
                  </div>
                  <div className="d-flex text-dark align-items-center">
                    <i class="fas fa-user-edit text-light"></i>
                    <h5 className="mr-2  mb-0 ml-1 text-light"> Quantity: </h5>
                    <p className="mb-0 text-light"> {bookList[index].quantity} </p>
                  </div>

                  <div className="d-flex text-dark align-items-center">
                    <i class="fas fa-tag text-light"></i> <h5 className="mr-2  mb-0 ml-1 text-light"> Price: </h5>
                    <p className="mb-0 text-light"> {item.price * bookList[index].quantity} $</p>
                  </div>
                </div>
                <div className="mt-4 d-flex align-items-center justify-content-between pl-5 pr-5 ml-5 mr-5">
                  <div>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        handelDetail(item.id, item.type);
                      }}
                    >
                      Detail
                    </button>
                  </div>

                  <div>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        handelDelete(bookList[index].booking_id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
