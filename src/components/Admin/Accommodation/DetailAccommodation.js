import React, { useEffect, useState } from 'react';
import { getAccommodationByID, getLocations, putAccommodation } from './Services/ApiService';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function DetailAccommodation(props) {
    const [locations, setLocations] = useState([]);
    const [accommodation, setAccommodation] = useState({});
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        // fetch the accommodation data with the given ID
        getAccommodationByID(id)
            .then(response => {
                setAccommodation(response.data);
                console.log("Accommodation", response);
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

    const handleUpdateAccommodation = (id) => {
        navigate(`/admin/accommodation/updateAccommodation/${id}`)
    }
    return (
        <section>
            <h2 class="text-center font-weight-bold">{accommodation.accommodation_name}</h2>
            <div className="container-fluid">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Accommodation Id</div>
                            <div class="col-6 text-center">{accommodation.accommodation_id}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Accommodation Name</div>
                            <div class="col-6 text-center">{accommodation.accommodation_name}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Rate</div>
                            <div class="col-6 text-center">{accommodation.rate}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Type</div>
                            <div class="col-6 text-center">{accommodation.type + "" === "true" ? "Resort" : "Hotel"}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Description</div>
                            <div class="col-6 text-center">{accommodation.description}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Price </div>
                            <div class="col-6 text-center">{accommodation.price}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Status </div>
                            <div class="col-6 text-center">{accommodation.status_Accommodation + ""}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Discount</div>
                            <div class="col-6 text-center">{accommodation.discount}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-6 text-center">Location</div>
                            <div class="col-6 text-center">{accommodation.location_id}</div>
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
                    <button className="btn btn-warning" onClick={() => { navigate("/admin/accommodation") }}>
                        Back
                    </button>

                    <button className="btn btn-warning background-blue" onClick={() => { handleUpdateAccommodation(accommodation.accommodation_id) }}>Update</button>

                    <button className="btn btn-warning background-red">Delete</button>
                </div>
            </div>
        </section>
    );
}

export default DetailAccommodation;