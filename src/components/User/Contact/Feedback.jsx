import { Minimize } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./animate.css";
import "./style.css";
import { getUser, getBookingByUserId, getAccommodation,    getTour,
  getTouristSpot, getRestaurant, postFeedback, getFeedbackList, getTransport, getBookingByBookingId } from "./Services/ApiService";
import Swal from "sweetalert2";

export default function Feedback() {
  const navigate = useNavigate();
  const usertoken = JSON.parse(localStorage.getItem("userToken"));
  // let [fullDescription, setFullDescription] = useState(false);

  let [user, setUser] = useState([]);
  let [bookList, setBookList] = useState([]);
  let [fbList, setFbList] = useState([]);
  let [reset, SetReset] = useState([]);

  let [star, setStar] = useState(0);
  let [bookId, setBookId] = useState(0);
  let [contentIn, setContentIn] = useState("");

  let [listService, setListService] = useState("");
  let [listUser, setListUser] = useState("");

  const handleLogin = () => {
    navigate("/login");
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleRate = (rate) => {
    setStar(rate);
    console.log("rate", rate);
  };
  const GetbookingId = (e) => {
    setBookId(e.target.value);
    console.log("setBookId", e.target.value);
  };
  const GetContent = (e) => {
    setContentIn(e.target.value);
    console.log("setBookId", e.target.value);
  };

  let data = {
    booking_id: bookId,
    content: contentIn,
    rate: star,
    status_Feedback: true,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postFb = postFeedback(data);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to submit it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        SetReset(0);
      }
    });
  };

  console.log("user", user);
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        if (usertoken != null) {
          const res = await getUser(usertoken.user_id);
          if (res.status === 200) {
            setUser(res.data);
          }
          const bookingRes = await getBookingByUserId(usertoken.user_id);
          if (bookingRes.status === 200) {
            const temp = [];
            const book = [];

            // console.log("bookingRes", bookingRes.data);

            for (let index = 0; index < bookingRes.data.length; index++) {
              if (bookingRes.data[index].accommodation_id != null) {
                const Accres = await getAccommodation(bookingRes.data[index].accommodation_id);

                if (Accres.status === 200) {
                  if (!temp.includes(Accres.data.accommodation_name)) {
                    book[index] = { valuename: Accres.data.accommodation_name, book: bookingRes.data[index].booking_id };
                    temp[index] = Accres.data.accommodation_name;
                    // console.log("Accres", Accres.data);
                  }
                }
              }
              if (bookingRes.data[index].restaurant_id != null) {
                const Resres = await getRestaurant(bookingRes.data[index].restaurant_id);
                if (Resres.status === 200) {
                  if (!temp.includes(Resres.data.restaurant_name)) {
                    book[index] = { valuename: Resres.data.restaurant_name, book: bookingRes.data[index].booking_id };
                    temp[index] = Resres.data.restaurant_name;
                    // console.log("Resres", Resres.data);
                  }
                }
              }
              if (bookingRes.data[index].transport_id != null) {
                const ResTrans = await getTransport(bookingRes.data[index].transport_id);
                if (ResTrans.status === 200) {
                  if (!temp.includes(ResTrans.data.transport_name)) {
                    book[index] = { valuename: ResTrans.data.transport_name, book: bookingRes.data[index].booking_id };
                    temp[index] = ResTrans.data.transport_name;
                  }
                }
              }
              if (bookingRes.data[index].touristSpot_id != null) {
                const ResSpot = await getTouristSpot(bookingRes.data[index].touristSpot_id);
                if (ResSpot.status === 200) {
                  if (!temp.includes(ResSpot.data.touristSpot_name)) {
                    book[index] = { valuename: ResSpot.data.touristSpot_name, book: bookingRes.data[index].booking_id };
                    temp[index] = ResSpot.data.touristSpot_name;
                  }
                }
              }
              if (bookingRes.data[index].tour_id != null) {
                const ResTour = await getTour(bookingRes.data[index].tour_id);
                if (ResTour.status === 200) {
                  if (!temp.includes(ResTour.data.tour_name)) {
                    book[index] = { valuename: ResTour.data.tour_name, book: bookingRes.data[index].booking_id };
                    temp[index] = ResTour.data.tour_name;
                  }
                }
              }
            }

            setBookList(book);
          }
        }


        // lay ra feedback
        const FeedbackList = await getFeedbackList();
        if (FeedbackList.status === 200) {
          setFbList(FeedbackList.data);
          const book = [];
          const userl = [];
          for (let index = 0; index < FeedbackList.data.length; index++) {
            const bkId = await getBookingByBookingId(FeedbackList.data[index].booking_id);
            if (bkId.status === 200) {
              if (bkId.data.accommodation_id != null) {
                const Accres = await getAccommodation(bkId.data.accommodation_id);
                if (Accres.status === 200) {
                  book[index] = Accres.data.accommodation_name;
                }
              }
              if (bkId.data.restaurant_id != null) {
                const Resres = await getRestaurant(bkId.data.restaurant_id);
                if (Resres.status === 200) {
                  book[index] = Resres.data.restaurant_name;
                }
              }
              if (bkId.data.transport_id != null) {
                const ResTrans = await getTransport(bkId.data.transport_id);
                if (ResTrans.status === 200) {
                  book[index] = ResTrans.data.transport_name;
                }
              }
              if (bkId.data.touristSpot_id != null) {
                const ResSpot = await getTouristSpot(bkId.data.touristSpot_id);
                if (ResSpot.status === 200) {
                  book[index] = ResSpot.data.touristSpot_name;
                }
              }
              if (bkId.data.tour_id != null) {
                const ResTour = await getTour(bkId.data.tour_id);
                if (ResTour.status === 200) {
                  book[index] = ResTour.data.tour_name;
                }
              }

              const resUser = await getUser(bkId.data.user_id);
              if (resUser.status === 200) {
                userl[index] = resUser.data.user_name;
              }
            }
          }
          setListService(book);
          setListUser(userl);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchBookingData();
  }, [reset]);
  console.log("book", bookList);

  return (
    <section class="ftco-section " style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 text-center mb-5"></div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-10 col-md-12">
            <div class="wrapper">
              <div class="row no-gutters">
                <div class="col-md-6 d-flex align-items-stretch">
                  {usertoken != null ? (
                    <div class="contact-wrap  w-100 p-md-5 p-4">
                      <h3 class="mb-4 text-center">Feedback</h3>
                      <div id="form-message-warning" class="mb-4"></div>
                      <div id="form-message-success" class="mb-4">
                        Your message was sent, thank you!
                      </div>
                      <form method="POST" id="contactForm" name="contactForm" onSubmit={handleSubmit}>
                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-group pr-0 pl-0">
                              <input type="text" class="form-control pr-1 pl-1" name="user_name" value={user.user_name} />
                            </div>
                          </div>

                          <div class="col-md-6  ">
                            <div class="form-group pr-0 pl-0">
                              <input type="email" class="form-control pr-1 pl-1" name="email" value={user.email} />
                            </div>
                          </div>

                          <div class="col-md-12  ">
                            <div class="form-group pr-0 pl-0">
                              <select className="form-control" id="Service_booking" onChange={GetbookingId} name="booking_id" required>
                                <option value="">Select the service you want to response</option>
                                {bookList.map((item, index) => (
                                  <option value={item.book}>{item.valuename}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div class="col-md-12 ">
                            <div class="form-group pr-0 pl-0">
                              <textarea class="form-control pr-1 pl-1" id="message" name="content" cols="30" rows="7" onChange={GetContent} placeholder="Message"></textarea>
                            </div>
                          </div>
                          <div class="col-md-12 stars">
                            <div class="form-group pr-0 pl-0 ">
                              <input
                                class="star star-5"
                                id="star-5"
                                type="radio"
                                name="star"
                                onChange={() => {
                                  handleRate(5);
                                }}
                              />
                              <label class="star star-5" for="star-5"></label>
                              <input
                                class="star star-4"
                                id="star-4"
                                type="radio"
                                name="star"
                                onChange={() => {
                                  handleRate(4);
                                }}
                              />
                              <label class="star star-4" for="star-4"></label>
                              <input
                                class="star star-3"
                                id="star-3"
                                type="radio"
                                name="star"
                                onChange={() => {
                                  handleRate(3);
                                }}
                              />
                              <label class="star star-3" for="star-3"></label>
                              <input
                                class="star star-2"
                                id="star-2"
                                type="radio"
                                name="star"
                                onChange={() => {
                                  handleRate(2);
                                }}
                              />
                              <label class="star star-2" for="star-2"></label>
                              <input
                                class="star star-1"
                                id="star-1"
                                type="radio"
                                name="star"
                                onChange={() => {
                                  handleRate(1);
                                }}
                              />
                              <label class="star star-1" for="star-1"></label>
                            </div>
                          </div>
                          <div class="col-md-12 ">
                            <div class="form-group pr-0 pl-0 d-flex justify-content-around">
                              <input type="submit" value="Send Feedback" class="btn text-light btn-secondary bg-feedback " />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div class="contact-wrap  w-100 p-md-5 p-4">
                      <div className="text-center pt-5 text-dark">
                        <p>Please login to Feedback </p>
                        <button type="submit" className="ripple ripple-surface btn  text-light btn-secondary  bg-feedback  btn-block" onClick={handleLogin}>
                          <a href="/login">Login</a>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div class="col-md-6 d-flex align-items-stretch">
                  <div class="info-wrap bg-feedback  w-100 p-lg-5 p-4">
                    <h3 class="mb-4 mt-md-4 font-weight-bold">PRODUCT PREVIEW</h3>
                    <p class="text-light text-right">
                      <i class="fas fa-arrow-down"></i> Scroll down to see the review
                    </p>

                    <div style={{ overflowY: "scroll", height: "420px", borderRadius: "10px" }} className="p-3 scrollbar border ">
                      {fbList.map((item, index) => (
                        <div class="dbox w-100 align-items-start border border border-light p-2  text-secondary mb-2 bg-light" style={{ borderRadius: "10px" }}>
                          <div className="d-flex align-items-center justify-content-between w-100 ">
                            <div>
                              <span className="font-weight-bold" style={{ fontSize: "14px" }}>
                                {listUser[index]}
                              </span>
                            </div>
                            <div style={{ fontSize: "10px" }}>
                              {item.rate}
                              <i class="fas fa-star text-danger ml-1"></i>
                            </div>
                          </div>

                          <div className="d-flex  align-items-start justify-content-between w-100 ">
                            <div className="col-sm-5 pl-0 pr-0">
                              <span className="font-weight-bold" style={{ fontSize: "14px" }}>
                                FEEDBACK ABOUT:
                              </span>
                            </div>
                            <div className="col-sm-7  pl-0 pr-0">
                              <span>{listService[index]} </span>
                            </div>
                          </div>
                          <div className=" w-100 ">
                            <div className="font-weight-bold">
                              <span style={{ fontSize: "14px" }}>CONTENT :</span>
                            </div>
                            <div className="border p-1 rounded">
                              <span> {item.content.length > 120 ? `${item.content.substring(0, 120)}...` : item.content} </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
