import { React, useContext, useEffect, useState } from "react";
import "../AdminManager.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TourContext } from "../contexts/TourContext";

const TouristSpotManager = () => {
  const [spots, setspots] = useState([]);
 

  const contextTour = useContext(TourContext);
  const { itemTour, setItemTour } = contextTour;

  
  const navigate = useNavigate();
  const handleGetPageDetail = (item) => {
    console.log("itemTour", itemTour);
    navigate(`/admin/tourist-spot/detail/${item}`);
  };
  const handleGetPageCreate = (item) => {
    navigate("/admin/tourist-spot/create");
  };
  useEffect(() => {
    axios
      .get("http://localhost:5158/api/TouristSpot/GetTouristSpots")
      .then((t) => {
        setspots(t.data.data);
        console.log("t", t);
      })
      .then((error) => console.log(error));
  }, []);
  console.log("spots", spots);
  return (
    <section>
      <h2 class="text-center font-weight-bold">List of Tour</h2>

      <div className="container-fluid">
        <div>
          <button
            className="btn background-green text-white"
            onClick={() => {
              handleGetPageCreate();
            }}
          >
            {" "}
            Create
          </button>
        </div>
        <table class="table mt-3 mb-3">
          <thead class="thead background-primary text-white">
            <tr>
              <th scope="col">Tour Id</th>
              <th scope="col">Tour Name</th>
              <th scope="col">Depature date</th>
              <th scope="col">Price</th>
              <th scope="col">Status Tour</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody class="text-dark">
            {spots.length > 0 ? (
              spots.map((item, index) => {
                return (
                  <>
                    {item.status_TouristSpot === true ? (
                      <tr key={index}>
                        <th>{item.touristSpot_id}</th>
                        <td>{item.touristSpot_name}</td>
                        <td>{item.location_id}</td>
                        <td>{item.price}</td>
                        <td>
                          <label class="switch">
                            <input
                              type="checkbox"
                              onClick={() => {
                                //  handleChangeStatus(item.touristSpot_id);
                              }}
                              checked
                            />
                            <span class="slider round "></span>
                          </label>
                        </td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              setItemTour(item.touristSpot_id);
                              handleGetPageDetail(item.touristSpot_id);
                            }}
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={index} className="background-disable">
                        <th>{item.touristSpot_id}</th>
                        <td>{item.touristSpot_name}</td>
                        <td>{item.location_id}</td>
                        <td>{item.price}</td>
                        <td>
                          <label class="switch">
                            <input
                              type="checkbox"
                              onClick={() => {
                                //  handleChangeStatus(item.touristSpot_id);
                              }}
                            />
                            <span class="slider round "></span>
                          </label>
                        </td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              setItemTour(item.touristSpot_id);
                              handleGetPageDetail(item.touristSpot_id);
                            }}
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })
            ) : (
              <div>
                <div>No product to show </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TouristSpotManager;
