import React, { useEffect, useState } from 'react';
import { deleteAccommodation, deleteAccommodationImage, getAccommodationByID, getAccommodationImageByID, getLocations, putAccommodation } from './Services/ApiService';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Height } from '@mui/icons-material';

function DetailAccommodation(props) {
    const [locations, setLocations] = useState([]);
    const [accommodation, setAccommodation] = useState({});
    const [image, setImage] = useState([]);
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        // fetch the accommodation data with the given ID
        getAccommodationByID(id)
            .then(response => {
                setAccommodation(response.data);
                console.log("Accommodation", response);
                if (response.status === 200) {
                    getAccommodationImageByID(id)
                        .then(response => {
                            setImage(response.data)
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

    const handleDeleteAccommodation = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAccommodation(id)
                    .then(pro => {
                        console.log("pro", pro);
                        if (pro.status === 200) {
                            deleteAccommodationImage(id)
                                .then(response => {
                                    console.log("deleted Image", response);
                                    if (response.status === 200) {
                                        navigate("/admin/accommodation");
                                        Swal.fire(
                                            'Deleted!',
                                            'Your file has been deleted.',
                                            'success'
                                        )
                                    }
                                })
                                .catch(error => console.log("error", error));
                        }
                    })
                    .catch(error => console.log("error", error));
            }
        })
    }

    const handleUpdateAccommodation = (id) => {
        navigate(`/admin/accommodation/updateAccommodation/${id}`)
    }

    //get Accommodation Image

    return (
        <section>
            <h2 className="text-center font-weight-bold">{accommodation.accommodation_name}</h2>
            <div className="container-fluid">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-6 text-center">Accommodation Id</div>
                            <div className="col-6 text-center">{accommodation.accommodation_id}</div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-6 text-center">Accommodation Name</div>
                            <div className="col-6 text-center">{accommodation.accommodation_name}</div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-6 text-center">Rate</div>
                            <div className="col-6 text-center">{accommodation.rate}</div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-6 text-center">Type</div>
                            <div className="col-6 text-center">{accommodation.type + "" === "true" ? "Resort" : "Hotel"}</div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-6 text-center">Description</div>
                            <div className="col-6 text-center">{accommodation.description}</div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-6 text-center">Price </div>
                            <div className="col-6 text-center">{accommodation.price}</div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-6 text-center">Status </div>
                            <div className="col-6 text-center">{accommodation.status_Accommodation + ""}</div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-6 text-center">Discount</div>
                            <div className="col-6 text-center">{accommodation.discount}</div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-6 text-center">Location</div>
                            <div className="col-6 text-center">{accommodation.location_id}</div>
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
            {image != null && image.length > 0 ? (
                <div className="container text-center my-3">
                    <h2 className="font-weight-light">IMAGES</h2>
                    <div className="row mx-auto my-auto justify-content-center">
                        <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner" role="listbox">
                                <div class="carousel-item active">
                                    {image.map((item, index) => {
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
            )}

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
                    <button className="btn btn-warning" onClick={() => { navigate("/admin/accommodation") }}>
                        Back
                    </button>

                    <button className="btn btn-warning background-blue" onClick={() => { handleUpdateAccommodation(accommodation.accommodation_id) }}>Update</button>

                    <button className="btn btn-warning background-red" onClick={() => { handleDeleteAccommodation(accommodation.accommodation_id) }}>Delete</button>
                </div>
            </div>
        </section>
    );
}

export default DetailAccommodation;