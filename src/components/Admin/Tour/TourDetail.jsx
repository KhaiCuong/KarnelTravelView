import { React, useContext, useEffect, useState } from "react";
import "../AdminManager.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const TourDetail = () => {
  const [tour, setTour] = useState([]);
  const [img, setImg] = useState([]);
  const [spot, setSpot] = useState([]);
  const navigate = useNavigate();
  let [count, setCount] = useState(0);
  const { id } = useParams();

  const handleBack = () => {
    navigate("/admin/tour");
  };

  const handleGetPageUpdate = (item) => {
    navigate(`/admin/tour/update/${item}`);
  };

  const handleDelete = (tour_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        axios
          .delete(`http://localhost:5158/api/Tour/Deletetour/${tour_id}`)
          .then((s) => {
            navigate("/admin/tour");
          })
          .then((error) => console.log(error));
      }
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5158/api/Tour/GetTour/${id}`)
      .then((t) => {
        setTour(t.data.data);
      })
      .then((error) => console.log(error));

    axios
      .get(`http://localhost:5158/api/TouristSpotTour/GetListByTourId/${id}`)
      .then((s) => {
        setSpot(s.data.data);
        return s.data.data;
      })
      .then((spot) => {
        axios
          .get(`http://localhost:5158/api/TouristSpotImage/GetImagesByTouristSpotId/${spot[count].touristSpot_id}`)
          .then((i) => {
            if (img.length > 0) {
              var list = Object.values(img).concat(Object.values(i.data.data));
            } else {
              var list = Object.values(i.data.data);
            }
            setImg(list);
            return count;
          })
          .then((c) => {
            if (c < spot.length) {
              setCount(count++);
              console.log("count", count)

            }
          })
          .then((error) => console.log(error));
      })

      .then((error) => console.log(error));
  }, [count]);

  return (
    <section>
      <h2 class="text-center font-weight-bold">{tour.tour_name}</h2>
      <div className="container-fluid">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <div class="row">
              <div class="col-3">Tour Id</div>
              <div class="col-9">{tour.tour_id}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-3">Tour Name</div>
              <div class="col-9">{tour.tour_name}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-3">Depature date</div>
              <div class="col-9">{tour.depature_date}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-3">Times</div>
              <div class="col-9">{tour.times}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-3">Status </div>
              <div class="col-9">{tour.status_tour + ""}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-3">Price</div>
              <div class="col-9">{tour.price}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-3">Discount</div>
              <div class="col-9">{tour.discount}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-3">Description</div>
              <div class="col-9">{tour.description}</div>
            </div>
          </li>
        </ul>
      </div>
      <div lassName="container-fluid ">
        <div class="container text-center my-3">
          <h2 class="font-weight-light pt-4">Tour Image</h2>
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

      <div className="d-flex justify-content-around align-items-center mt-4">
        <div className="d-flex justify-content-between align-items-center w-50 mb-4">
          <button className="btn btn-warning background-dark" onClick={() => handleBack()}>
            Back
          </button>

          <button
            className="btn btn-warning background-blue"
            onClick={() => {
              handleGetPageUpdate(tour.tour_id);
            }}
          >
            Update
          </button>

          <button className="btn btn-warning background-red" onClick={() => handleDelete(tour.tour_id)}>
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default TourDetail;
