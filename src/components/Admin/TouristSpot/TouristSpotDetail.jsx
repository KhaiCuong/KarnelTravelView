import { React, useContext, useEffect, useState } from "react";
import "../AdminManager.css";
import axios from "axios";
import { TourContext } from "../contexts/TourContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TouristSpotDetail = () => {
  const [img, setImg] = useState([]);
  const [spot, setSpot] = useState([]);
  const contextTour = useContext(TourContext);
  const { itemTour, setItemTour } = contextTour;
  const navigate = useNavigate();
  let [count, setCount] = useState(0);

  const handleBack = () => {
    navigate("/admin/tourist-spot");
  };

  const handleGetPageUpdate = (item) => {
    navigate(`/admin/tourist-spot/update/${item}`);
  };

  const handleDelete = (touristSpot_id) => {
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
          .delete(`http://localhost:5158/api/TouristSpot/DeleteEmployee/${touristSpot_id}`)
          .then((s) => {
            navigate("/admin/tourist-spot");
          })
          .then((error) => console.log(error));
      }
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5158/api/TouristSpot/GetTouristSpotById/${itemTour}`)
      .then((t) => {
        setSpot(t.data.data);
      })
      .then((error) => console.log(error));

    axios
      .get(`http://localhost:5158/api/TouristSpotImage/GetImagesByTouristSpotId/${itemTour}`)
      .then((s) => {
        setImg(s.data.data);
        return s.data.data;
      })
      .then((error) => console.log(error));
  }, []);
console.log("itemTour", itemTour);
  return (
    <section>
      <h2 class="text-center font-weight-bold">{spot.touristSpot_name}</h2>
      <div className="container-fluid">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <div class="row">
              <div class="col-3">Tourist Spot Id</div>
              <div class="col-9">{spot.touristSpot_id}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-3">Tourist Spot Name</div>
              <div class="col-9">{spot.touristSpot_name}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-3">Location </div>
              <div class="col-9">{spot.location_id}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-3">Activities</div>
              <div class="col-9">{spot.activities}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-3">Status </div>
              <div class="col-9">{spot.status_TouristSpot + ""}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-3">Price</div>
              <div class="col-9">{spot.price}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-3">Discount</div>
              <div class="col-9">{spot.discount}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-3">Description</div>
              <div class="col-9">{spot.description}</div>
            </div>
          </li>
        </ul>
      </div>
      <div lassName="container-fluid ">
        <div class="container text-center my-3">
          <h2 class="font-weight-light pt-4">Tour Image</h2>
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
              setItemTour(spot.touristSpot_id);
              handleGetPageUpdate(spot.touristSpot_id);
            }}
          >
            Update
          </button>

          <button className="btn btn-warning background-red" onClick={() => handleDelete(spot.touristSpot_id)}>
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default TouristSpotDetail;
