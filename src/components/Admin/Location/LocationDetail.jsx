import { React, useContext, useEffect, useState } from "react";
import { getLocation, updateLocation } from "./ApiServiceLocation";
import "../AdminManager.css";
import axios from "axios";
import { TourContext } from "../contexts/TourContext";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


const LocationDetail = () => {
  const { id } = useParams()

  const [location, setLocation] = useState([]);
  const [img, setImg] = useState([]);
  const [loca, setLoca] = useState([]);
  const contextTour = useContext(TourContext);
  const { itemTour, setItemTour } = contextTour;
  const navigate = useNavigate();
  let [count, setCount] = useState(0);

  const handleBack = () => {
    navigate("/admin/location");
  };

  const handleGetPageUpdate = (item) => {
    navigate(`/admin/location/update/${item}`);
  };

  const handleDeleteLocation = (location_id) => {
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
        handleDeleteLocation(location_id)
          .then((s) => {
        
        setLocation(location.filter((item) => item.location_id !== location_id));

          })
          .then((error) => console.log(error));
      }
    });
  };

  useEffect(() => {

      //lấy location theo id và image
    
      getLocation(id)
      .then((s) => {
        setLocation(s);
        return s;
      })
      .then((loca) => {
        axios
        .get(`http://localhost:5158/api/LocationImage/${id}`)
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
            if (c < loca.length) {
              setCount(count++);
            }
          })
          .then((error) => console.log(error));
      })

      .then((error) => console.log(error));
  }, [count]);
      //
   
  return (
    <section>
      <h2 className="text-center font-weight-bold"> ID: {location.location_id}</h2>
      <div className="container-fluid">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="row">
              <div className="col-3">location Id:</div>
              <div className="col-9">{location.location_id}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col-3">Location Name:</div>
              <div className="col-9">{location.location_name}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col-3">Description:</div>
              <div className="col-9">{location.description}</div>
            </div>
          </li>

          <li className="list-group-item">
            <div className="row">
              <div className="col-3">Status: </div>
              <div className="col-9">{location.status_Location + ""}</div>
            </div>
          </li>

         
        </ul>
      </div>
      <div className="container-fluid ">
        <div className="container text-center my-3">
          <h2 className="font-weight-light pt-4">Location Image</h2>
          <div className="row mx-auto my-auto justify-content-center pb-5">
            <div id="recipeCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner" role="listbox">
                <div className="carousel-item active">
                  {img.map((item, index) => {
                    if (index < 4) {
                      return (
                        <>
                          <div className="col-md-3">
                            <div className="card">
                              <div className="card-img">
                                <img src={`http://localhost:5158/${item}`} className="img-fluid" />
                              </div>
                              </div>
                          </div>
                          
                        </>
                      );
                    }
                  })}
                </div>
                <div className="carousel-item ">
                  {img.map((item, index) => {
                    if (index >= 4) {
                      return (
                        <>
                          <div className="col-md-3">
                            <div className="card">
                              <div className="card-img">
                                <img src={`http://localhost:5158/${item}`} className="img-fluid" />
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  })}
                </div>
              </div>
              <a className="carousel-control-prev bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              </a>
              <a className="carousel-control-next bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
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
              setItemTour(location.location_id);
              handleGetPageUpdate(location.location_id);
            }}
          >
            Update
          </button>

          <button className="btn btn-warning background-red" onClick={() => handleDeleteLocation(location.location_id)}>
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default LocationDetail;
