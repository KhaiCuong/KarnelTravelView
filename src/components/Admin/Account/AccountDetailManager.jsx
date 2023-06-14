import React, { useEffect, useState } from "react";

import { Navigate, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Height } from "@mui/icons-material";

import { GetUser } from "./Service/ApiServiceUser";

function AccountDetailManager(props) {
  const [user, setUser] = useState({});
  // const [image, setImage] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // fetch the accommodation data with the given ID
    GetUser(id)
      .then((response) => {
        setUser(response.data);
        console.log("User", response);
        // if (response.status === 200) {
        //     getAccommodationImageByID(id)
        //         .then(response => {
        //             setImage(response.data)
        //             console.log("Image", response);
        //         })
        //         .catch(error => console.log("error", error));
        // }
      })
      .catch((error) => console.log("error", error));
  }, [id]);

  // useEffect(() => {
  //     fetchLocation();
  // }, []);

  // const fetchLocation = () => {
  //     // make an API call to fetch the locations
  //     getLocations()
  //         .then(response => {
  //             console.log("Location", response);
  //             setLocations(response.data); // assuming the response contains the location data
  //         })
  //         .catch(error => console.log("error", error));
  // }

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      // if (result.isConfirmed) {
      //     deleteUser(id)
      //         .then(pro => {
      //             console.log("pro", pro);
      //             if (pro.status === 200) {
      //                 deleteAccommodationImage(id)
      //                     .then(response => {
      //                         console.log("deleted Image", response);
      //                         if (response.status === 200) {
      //                             navigate("/admin/accommodation");
      //                             Swal.fire(
      //                                 'Deleted!',
      //                                 'Your file has been deleted.',
      //                                 'success'
      //                             )
      //                         }
      //                     })
      //                     .catch(error => console.log("error", error));
      //             }
      //         })
      //         .catch(error => console.log("error", error));
      // }
    });
  };

  const handleUpdateAccount = (id) => {
    navigate(`/admin/account/updateAccount/${id}`);
  };

  //get Accommodation Image

  return (
    <section>
      <h2 className="text-center font-weight-bold">{user.user_name}</h2>
      <div className="container-fluid">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="row">
              <div className="col-3 ">User Id</div>
              <div className="col-9 ">{user.user_id}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col-3 ">User Name</div>
              <div className="col-9 ">{user.user_name}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col-3 ">Phone number</div>
              <div className="col-9 ">{user.phone_number}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col-3 ">Address</div>
              <div className="col-9 ">{user.address}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col-3 ">Total payment</div>
              <div className="col-9 ">{user.total_payment}</div>
            </div>
          </li>
          {/* <li className="list-group-item">
                        <div className="row">
                            <div className="col-3 ">Price </div>
                            <div className="col-9 ">{accommodation.price}</div>
                        </div>
                    </li> */}
          <li className="list-group-item">
            <div className="row">
              <div className="col-3 ">Charge_card </div>
              <div className="col-9 ">{user.charge_card}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col-3 ">Email</div>
              <div className="col-9 ">{user.email}</div>
            </div>
          </li>
        </ul>
      </div>
      {/* <div lassName="container-fluid ">
                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        {image.map((item, index) => {
                            if (index === 0) {
                                return (
                                    <>
                                        <div class="carousel-item active">
                                            <img src={`http://localhost:5158/${item}`} class="d-block w-100" alt={item} />
                                        </div>
                                    </>
                                );
                            } else {
                                return (
                                    <>
                                        <div class="carousel-item">
                                            <img src={`http://localhost:5158/${item}`} class="d-block w-100" alt={item} />
                                        </div>
                                    </>
                                );
                            }
                        })}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div> */}
      {/* {image != null && image.length > 0 ? (
                <div className="container text-center my-3">
                    <h2 className="font-weight-light">IMAGES</h2>
                    <div className="row mx-auto my-auto justify-content-center">
                        <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner" role="listbox">
                                <div class="carousel-item admin-carousel active">
                                    {image.map((item, index) => {
                                        if (index < 4) {
                                            return (
                                                <>
                                                    <div class="col-md-3">
                                                        <div class="card">
                                                            <div key={index} class="card-img">
                                                                <img src={`http://localhost:5158/${item}`} class="img-fluid" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        }
                                    })}
                                </div>
                                <div class="carousel-item admin-carousel">
                                    {image.map((item, index) => {
                                        if (index >= 4) {
                                            return (
                                                <>
                                                    <div class="col-md-3">
                                                        <div class="card">
                                                            <div class="card-img">
                                                                <img src={`http://localhost:5158/${item}`} class="img-fluid" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>

            ) : (
                <div className="container text-center my-3">
                    <h2 className="font-weight-light">IMAGES</h2>
                    <p>No images found.</p>
                </div>
            )} */}

      {/* <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        {image.map((item, index) => {
                            if (index <= 4) {
                                return (
                                    <>
                                        <img class="d-block w-100" src={`http://localhost:5158/${item}`} alt={item} />
                                    </>
                                );
                            }
                        })}
                    </div>
                    <div class="carousel-item">
                        {image.map((item, index) => {
                            if (index > 4) {
                                return (
                                    <>
                                        <img class="d-block w-100" src={`http://localhost:5158/${item}`} alt={item} />
                                    </>
                                );
                            }
                        })}
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div> */}

      <div className="d-flex justify-content-around align-items-center mt-4">
        <div className="d-flex justify-content-between align-items-center w-50">
          <button
            className="btn btn-warning background-dark"
            onClick={() => {
              navigate("/admin/account");
            }}
          >
            Back
          </button>

          <button
            className="btn btn-warning background-blue"
            onClick={() => {
              handleUpdateAccount(user.user_id);
            }}
          >
            Update
          </button>

          <button
            className="btn btn-warning background-red"
            onClick={() => {
              handleDeleteUser(user.user_id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}

export default AccountDetailManager;
