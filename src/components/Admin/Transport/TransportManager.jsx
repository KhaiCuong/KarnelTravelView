import { React, useContext, useEffect, useState } from "react";
import "../AdminManager.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { TransportContext } from "../contexts/TransportContext";

const TransportManager = () => {
  const [spots, setspots] = useState([]);

  // const contextTransport = useContext(TransportContext);
  // const { itemTransport, setItemTransport } = contextTransport;

  const navigate = useNavigate();
  const handleGetPageDetail = (item) => {
    // console.log("itemTransport", itemTransport);
    navigate(`/admin/transport/detail/${item}`);
  };
  const handleGetPageCreate = (item) => {
    navigate("/admin/transport/create");
  };
  useEffect(() => {
    axios
      .get("http://localhost:5158/api/Transport/GetTransports")
      .then((t) => {
        setspots(t.data.data);
        console.log("t", t);
      })
      .then((error) => console.log(error));
  }, []);
  console.log("spots", spots);
  return (
    <section>
      <h2 class="text-center font-weight-bold">List of Transport</h2>

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
              <th scope="col">Transport Id</th>
              <th scope="col">Transport name</th>
              <th scope="col">Start position</th>
              
              <th scope="col">Discount</th>
              <th scope="col">Location Id</th>
              <th scope="col">Price</th>
              <th scope="col">Status Transport</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody class="text-dark">
            {spots.length > 0 ? (
              spots.map((item, index) => {
                return (
                  <>
                    {item.status_transport === true ? (
                      <tr key={index}>
                        <th>{item.transport_id}</th>
                        <td>{item.transport_name}</td>
                        <td>{item.start_position}</td>
                        {/* <td>{item.Status_Transport}</td> */}
                        <td>{item.Discount}</td>
                        {/* <td hidden>{item.location_id}</td> */}
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
                              // setItemTransport(item.transport_id);
                              handleGetPageDetail(item.transport_id);
                            }}
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={index} className="background-disable">
                        <th>{item.transport_id}</th>
                        <td>{item.transport_name}</td>
                        <td>{item.start_position}</td>
                        <td>{item.Status_Transport}</td>
                        <td>{item.Discount}</td>
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
                              // setItemTransport(item.transport_id);
                              handleGetPageDetail(item.transport_id);
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

export default TransportManager;
