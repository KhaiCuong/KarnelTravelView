import React, { useEffect, useState } from 'react';
import {  getLocations, getRestaurantByID, getRestaurantImageByID } from './Service/ApiService';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


function DetailRestaurant(props) {
    const [locations, setLocations] = useState([]);
    const [restaurant, setRestaurant] = useState({});
    const navigate = useNavigate();
    const [img, setImg] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        // fetch the accommodation data with the given ID
        getRestaurantByID(id)
            .then(response => {
                setRestaurant(response.data);
                console.log("restaurant", response);
                if (response.status === 200) {
                    getRestaurantImageByID(id)
                        .then(response => {
                            setImg(response.data)
                            console.log("Image", response);
                        })
                        .catch(error => console.log("error", error));
                }
            })
            .catch(error => console.log("error", error));
    }, [id]);

    useEffect(() => {
        fetchLocation();
    }, []);

    const fetchLocation = () => {
        // make an API call to fetch the locations
        getLocations()
            .then(response => {
                console.log("Location", response);
                setLocations(response.data); // assuming the response contains the location data
            })
            .catch(error => console.log("error", error));
    }

    const handleUpdateRestaurant = (id) => {
        navigate(`/admin/restaurant/updateRestaurant/${id}`)
    }
    return (
        <section>
            <h2 class="text-center font-weight-bold">{restaurant.restaurant_name}</h2>
            <div className="container-fluid">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Restaurant Id</div>
                            <div class="col-6 text-center">{restaurant.restaurant_id}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Restaurant Name</div>
                            <div class="col-6 text-center">{restaurant.restaurant_name}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Rate</div>
                            <div class="col-6 text-center">{restaurant.rate}</div>
                        </div>
                    </li>
                    {/* <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Type</div>
                            <div class="col-6 text-center">{accommodation.type + "" === "true" ? "Resort" : "Hotel"}</div>
                        </div>
                    </li> */}
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Description</div>
                            <div class="col-6 text-center">{restaurant.description}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Price </div>
                            <div class="col-6 text-center">{restaurant.price}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Status </div>
                            <div class="col-6 text-center">{restaurant.status_Restaurant + ""}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Discount</div>
                            <div class="col-6 text-center">{restaurant.discount}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Location ID</div>
                            <div class="col-6 text-center">{restaurant.location_id}</div>
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
                        {img.map((item, index) => {
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

            <div className="d-flex justify-content-around align-items-center mt-4">
                <div className="d-flex justify-content-between align-items-center w-50">
                    <button className="btn btn-warning" onClick={() => { navigate("/admin/restaurant") }}>
                        Back
                    </button>

                    <button className="btn btn-warning background-blue" onClick={() => { handleUpdateRestaurant(restaurant.restaurant_id) }}>Update</button>

                    {/* <button className="btn btn-warning background-red">Delete</button> */}
                </div>
            </div>
            <div lassName="container-fluid ">
        <div class="container text-center my-3">
          <h2 class="font-weight-light pt-4">Restaurant Image</h2>
          { (img != null) && (img != "")  ? (
            <>
          <div class="row mx-auto my-auto justify-content-center pb-5">
            <div id="recipeCarousel" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner" role="listbox">
                <div class="carousel-item active">
                  {img.map((item, index) => {
                    if (index < 4) {
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
                <div class="carousel-item ">
                  {img.map((item, index) => {
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
              <a class="carousel-control-prev bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              </a>
              <a class="carousel-control-next bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
              </a>
            </div>
          </div>
          </> ) : (
                <div className="mt-3 mb-3">No image found.</div>
          )}
        </div>
       
      </div>
        </section>
    );
}

export default DetailRestaurant;