import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getListAccommodation,
  deleteAccommodation,
  deleteAccommodationImage,
} from "./Services/ApiService";
import Swal from "sweetalert2";
import "../AdminManager.css";

function ListAccommodation() {
  const [accommodation, setAccommodation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getListAccommodation()
      .then((pro) => setAccommodation(pro.data))
      .catch((error) => console.log(error));
  }, [accommodation]);

  const handleDeleteAccommodation = (id) => {
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
        deleteAccommodation(id)
          .then((pro) => {
            console.log("pro", pro);
            if (pro.status === 200) {
              deleteAccommodationImage(id)
                .then((response) => {
                  console.log("deleted Image", response);
                  if (response.status === 200) {
                    Swal.fire(
                      "Deleted!",
                      "Your file has been deleted.",
                      "success"
                    );
                    setAccommodation(
                      accommodation.filter((item) => item.id !== id)
                    );
                  }
                })
                .catch((error) => console.log("error", error));
            }
          })
          .catch((error) => console.log("error", error));
      }
    });
  };

  const handleUpdateAccommodation = (id) => {
    navigate(`updateAccommodation/${id}`);
  };

  const handleDetailAccommodation = (id) => {
    navigate(`detailAccommodation/${id}`);
  };
  return (
    <section>
      <h2 class="text-center font-weight-bold">List of Accommodation</h2>

      <div className="container-fluid">
        <div>
          <button
            className="btn background-green text-white"
            onClick={() => {
              navigate("/admin/accommodation/createAccommodation");
            }}
          >
            {" "}
            Create
          </button>
        </div>
        {accommodation != null && accommodation.length > 0 ? (
          <table class="table  mt-3 mb-3">
            <thead class="thead background-primary text-white">
              <tr>
                <th scope="col">Accommodation Id</th>
                <th scope="col">Accommodation Name</th>
                <th scope="col">Rate</th>
                <th scope="col">Type</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col">Discount</th>
                <th scope="col">location_id</th>

                <th colSpan={3} scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {accommodation.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <th scope="row">{item.accommodation_id}</th>
                      <td>{item.accommodation_name}</td>
                      <td>{item.rate}</td>
                      <td>{item.type === true ? "Resort" : "Hotel"}</td>
                      <td>{item.description.length > 27 ? `${item.description.substring(0, 27)}...` : item.description}</td>
                      <td>{item.price}</td>
                      <td>{item.status_Accommodation.toString()}</td>
                      <td>{item.discount}</td>
                      <td>{item.location_id}</td>
                      <td>
                        <button
                          className="btn btn-warning background-blue"
                          onClick={() => {
                            handleDetailAccommodation(item.accommodation_id);
                          }}
                        >
                          Detail
                        </button>
                      </td>
                      {/* <td>
                      <button className="btn btn-warning background-green" onClick={() => { handleUpdateAccommodation(item.accommodation_id) }}>
                        Update
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-warning background-red" onClick={() => handleDeleteAccommodation(item.accommodation_id)}>
                        Delete
                      </button>
                    </td> */}
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-5">
            <p className="text-muted">No accommodations found.</p>
            {/* You can add additional instructions or call-to-action here */}
          </div>
        )}
      </div>
    </section>
  );
}

export default ListAccommodation;
