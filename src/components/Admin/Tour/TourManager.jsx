import { React, useContext, useEffect, useState } from "react";
import "../AdminManager.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TourContext } from "../contexts/TourContext";

const TourManager = () => {
  const [tours, setTours] = useState([]);
  const [status, setStatus] = useState([]);
  const [checkedToggle, setCheckedToggle] = useState(false);


  const contextTour = useContext(TourContext);
  const { itemTour, setItemTour } = contextTour;

  const navigate = useNavigate();

  const handleGetPageDetail = (item) => {
    navigate(`detail/${item}`);
  };
  const handleGetPageCreate = (item) => {
    navigate("/admin/tour/create");
  };
  const handleChangeStatus = (item) => {
    axios
      .put(`http://localhost:5158/api/Tour/UpdateStatus/${item}`)
      .then((s) => {
        setStatus(s.data.data);
      })
      .then((error) => console.log(error));
    // window.location.reload();
  };

  useEffect(() => {
    axios
      .get("http://localhost:5158/api/Tour/GetTours")
      .then((t) => {
        setTours(t.data.data);
        console.log("t", t);
      })
      .then((error) => console.log(error));
  }, [status]);

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
            {tours.length > 0 ? (
              tours.map((item, index) => {
                return (
                  <>
                    <tr key={index} >
                      <th>{item.tour_id}</th>
                      <td>{item.tour_name}</td>
                      <td>{item.depature_date.slice(0, 10).split("-").reverse().join("-")}</td>
                      <td>{item.price}</td>
                      <td >
                        <label class="switch" >
                          <input
                            type="checkbox"
                            onClick={() => {
                              handleChangeStatus(item.tour_id);
                            }}
                             
                            checked={item.status_tour}
                          />
                          <span class="slider round "></span>
                        </label>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setItemTour(item);
                            handleGetPageDetail(item.tour_id);
                          }}
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <div>No product to show</div>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TourManager;
