import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAccommodationByID, getAccommodationImageByID, getListAccommodation } from './Services/ApiService';
import '../Accommodation/css/DetailAccommodation.css';


function UserDetailAccommodation() {
    const { id } = useParams();

    const [accommodation, setAccommodation] = useState([]);
    const [imageAccommodation, setImageAccommodation] = useState([]);

    const [extraAccommodation, setExtraAccommodation] = useState([]);
    const [extraAccommodationImage, setExtraAccommodationImage] = useState([]);

    const [accommodationID, setAccommodationID] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccommodationDataByID = async () => {
            try {
                const response = await getAccommodationByID(id)
                //console.log("response", response);
                if (response.status === 200) {
                    setAccommodation(response.data)
                    const imageResponse = await getAccommodationImageByID(response.data.accommodation_id);

                    console.log("imageResponse", imageResponse);
                    if (imageResponse.status === 200) {
                        setImageAccommodation(imageResponse.data);
                    }
                }
            } catch (error) {
                console.log("error", error);
            }
        };

        const fetchAccommodationData = async () => {
            try {
                const response = await getListAccommodation();
                if (response.status === 200) {
                    setExtraAccommodation(response.data);
                    const accommodationImages = [];

                    for (let index = 0; index < response.data.length; index++) {
                        console.log("response", response);
                        const imageResponse = await getAccommodationImageByID(response.data[index].accommodation_id);
                        console.log("imageResponse", imageResponse);
                        if (imageResponse.status === 200) {
                            accommodationImages[index] = imageResponse.data;
                        }
                    }

                    setExtraAccommodationImage(accommodationImages);
                }
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchAccommodationDataByID();
        fetchAccommodationData();

    }, [accommodationID])

    // useEffect(() => {

    // }, []);

    const handleDetailAccommodation = (id) => {
        setAccommodationID(id);
        navigate(`/accommodation/detail/${id}`);

        //window.location.reload(`accommodation/detail/:${id}`);
        //console.log("id", id);
    }
    // console.log("accommodation", accommodation);
    // console.log("imageAccommodation", imageAccommodation);
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <section className="ftco-section ftco-degree-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 sidebar">
                            <div className="sidebar-wrap bg-light ftco-animate">
                                <h3 className="heading mb-4">Find City</h3>
                                <form action="#">
                                    <div className="fields">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Destination, City" />
                                        </div>
                                        <div className="form-group">
                                            <div className="select-wrap one-third">
                                                <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                                <select name="" id="" className="form-control" placeholder="Keyword search">
                                                    <option value="">Select Location</option>
                                                    <option value="">San Francisco USA</option>
                                                    <option value="">Berlin Germany</option>
                                                    <option value="">Lodon United Kingdom</option>
                                                    <option value="">Paris Italy</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" id="checkin_date" className="form-control" placeholder="Date from" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" id="checkin_date" className="form-control" placeholder="Date to" />
                                        </div>
                                        <div className="form-group">
                                            <div className="range-slider">
                                                <span>
                                                    <input type="number" value="25000" min="0" max="120000" />	-
                                                    <input type="number" value="50000" min="0" max="120000" />
                                                </span>
                                                <input value="1000" min="0" max="120000" step="500" type="range" />
                                                <input value="50000" min="0" max="120000" step="500" type="range" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" value="Search" className="btn btn-primary py-3 px-5" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="sidebar-wrap bg-light ftco-animate">
                                <h3 className="heading mb-4">Star Rating</h3>
                                <form method="post" className="star-rating">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" for="exampleCheck1">
                                            <p className="rate"><span><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i></span></p>
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" for="exampleCheck1">
                                            <p className="rate"><span><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star-o"></i></span></p>
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" for="exampleCheck1">
                                            <p className="rate"><span><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star-o"></i><i className="icon-star-o"></i></span></p>
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" for="exampleCheck1">
                                            <p className="rate"><span><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star-o"></i><i className="icon-star-o"></i><i className="icon-star-o"></i></span></p>
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" for="exampleCheck1">
                                            <p className="rate"><span><i className="icon-star"></i><i className="icon-star-o"></i><i className="icon-star-o"></i><i className="icon-star-o"></i><i className="icon-star-o"></i></span></p>
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-md-12 ftco-animate">
                                    <div id="carouselExampleControls" class="carousel slide user-slide" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="carousel-item user-carousel active">
                                                {imageAccommodation.map((item, index) => {
                                                    if (index < 1) {
                                                        return (
                                                            <>

                                                                <img src={`http://localhost:5158/${item}`} className="" alt={item} />
                                                            </>
                                                        )
                                                    }
                                                })}
                                            </div>
                                            <div className="carousel-item user-carousel">
                                                {imageAccommodation.map((item, index) => {
                                                    if (index >= 1) {
                                                        return (
                                                            <>
                                                                <img src={`http://localhost:5158/${item}`} className="" alt={item} />
                                                            </>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-12 hotel-single mt-4 mb-5 ftco-animate">
                                    <span>Our Best hotels &amp; Rooms</span>
                                    <h2>{accommodation.accommodation_name}</h2>
                                    <p className="rate mb-5">
                                        <span className="loc"><a href="#"><i className="icon-map"></i> 291 South 21th Street, Suite 721 New York NY 10016</a></span>
                                        &nbsp;
                                        <span className="star">
                                            <i className="icon-star"></i>
                                            <i className="icon-star"></i>
                                            <i className="icon-star"></i>
                                            <i className="icon-star"></i>
                                            <i className="icon-star-o"></i>
                                            8 Rating</span>
                                    </p>
                                    <p>{accommodation.description}</p>
                                </div>
                                {/* <div className="col-md-12 hotel-single ftco-animate mb-5 mt-4">
                                    <h4 className="mb-4">Take A Tour</h4>
                                    <div className="block-16">
                                        <figure>
                                            <img src="images/hotel-6.jpg" alt="Image placeholder" className="img-fluid" />
                                            <a href="https://vimeo.com/45830194" className="play-button popup-vimeo"><span className="icon-play"></span></a>
                                        </figure>
                                    </div>
                                </div> */}
                                {/* <div className="col-md-12 hotel-single ftco-animate mb-5 mt-4">
                                    <h4 className="mb-4">Our Rooms</h4>
                                    <div className="row">
                                        {extraAccommodation.map((item, index) => (
                                            <div class="col-md-4 ftco-animate">
                                                <div class="destination">
                                                    {extraAccommodationImage[index] && (
                                                        <div>
                                                            <div class="icon d-flex justify-content-center align-items-center">
                                                                <img src={`http://localhost:5158/${extraAccommodationImage[index][0]}`} />
                                                                <span class="icon-search2" >
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div class="text p-3">
                                                        <div class="d-flex">
                                                            <div class="one">
                                                                <h3><a href={`accommodation/detail/${item.accommodation_id}`}>{item.accommodation_name}</a></h3>
                                                                <p class="rate">
                                                                    <i class="icon-star"></i>
                                                                    <i class="icon-star"></i>
                                                                    <i class="icon-star"></i>
                                                                    <i class="icon-star"></i>
                                                                    <i class="icon-star-o"></i>
                                                                    <span>8 Rating</span>
                                                                </p>
                                                            </div>
                                                            <div class="two">
                                                                <span class="price per-price">{item.price}<br /><small>/night</small></span>
                                                            </div>
                                                        </div>
                                                        <p>{item.description}</p>
                                                        <hr />
                                                        <p class="bottom-area d-flex">
                                                            <span><i class="icon-map-o"></i> {item.location_id}</span>
                                                            <span class="ml-auto"><Link to="#">Book Now</Link></span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                </div> */}
                                <div className="col-md-12 hotel-single ftco-animate mb-5 mt-4">
                                    <h4 className="mb-5">Check Availability &amp; Booking</h4>
                                    <div className="fields">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Name" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Email" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="text" id="checkin_date" className="form-control" placeholder="Date from" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="text" id="checkin_date" className="form-control" placeholder="Date to" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <div className="select-wrap one-third">
                                                        <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                                        <select name="" id="" className="form-control" placeholder="Guest">
                                                            <option value="0">Guest</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <div className="select-wrap one-third">
                                                        <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                                        <select name="" id="" className="form-control" placeholder="Children">
                                                            <option value="0">Children</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input type="submit" value="Check Availability" className="btn btn-primary py-3" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 hotel-single ftco-animate mb-5 mt-4">
                                    <h4 className="mb-4">Review &amp; Ratings</h4>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <form method="post" className="star-rating">
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">
                                                        <p className="rate"><span><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i> 100 Ratings</span></p>
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">
                                                        <p className="rate"><span><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star-o"></i> 30 Ratings</span></p>
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">
                                                        <p className="rate"><span><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star-o"></i><i className="icon-star-o"></i> 5 Ratings</span></p>
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">
                                                        <p className="rate"><span><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star-o"></i><i className="icon-star-o"></i><i className="icon-star-o"></i> 0 Ratings</span></p>
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">
                                                        <p className="rate"><span><i className="icon-star"></i><i className="icon-star-o"></i><i className="icon-star-o"></i><i className="icon-star-o"></i><i className="icon-star-o"></i> 0 Ratings</span></p>
                                                    </label>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 hotel-single ftco-animate mb-5 mt-5">
                                    <h4 className="mb-4">Related Hotels</h4>
                                    <div className="row">
                                        {extraAccommodation.slice(0, 3).map((item, index) => (
                                            <div class="col-md-4 ftco-animate" key={index}>
                                                <div class="destination">
                                                    {extraAccommodationImage[index] && (
                                                        <div>
                                                            <div class="icon d-flex justify-content-center align-items-center" onClick={() => (handleDetailAccommodation(item.accommodation_id))}>
                                                                <img src={`http://localhost:5158/${extraAccommodationImage[index][0]}`} />
                                                                <span class="icon-search2" >
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div class="text p-3">
                                                        <div class="d-flex">
                                                            <div class="one">
                                                                <h3><a >{item.accommodation_name}</a></h3>
                                                                <p class="rate">
                                                                    <i class="icon-star"></i>
                                                                    <i class="icon-star"></i>
                                                                    <i class="icon-star"></i>
                                                                    <i class="icon-star"></i>
                                                                    <i class="icon-star-o"></i>
                                                                    <span>8 Rating</span>
                                                                </p>
                                                            </div>
                                                            <div class="two">
                                                                <span class="price per-price">{item.price}<br /><small>/night</small></span>
                                                            </div>
                                                        </div>
                                                        <p>{item.description}</p>
                                                        <hr />
                                                        <p class="bottom-area d-flex">
                                                            <span><i class="icon-map-o"></i> {item.location_id}</span>
                                                            <span class="ml-auto"><Link to="#">Book Now</Link></span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* <!-- .col-md-8 --> */}
                    </div>
                </div >
            </section >
            {/* < !-- .section --> */}
        </div>
    );
}

export default UserDetailAccommodation;