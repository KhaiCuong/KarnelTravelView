import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function CreateTransport() {
  const navigate = useNavigate();
  const initialState = {
    transport_id: "",
    start_position: "",
    transport_name: "",
    price: "",
    status_Transport: "",
    discount: "",

    location_id: "",
  };

  const [transport, setTransport] = useState(initialState);
  const [locations, setLocations] = useState([]);

  var data = {
    transport_id: transport.transport_id,
    transport_name: transport.transport_name,
    start_position: transport.start_position,
    discount: transport.discount,
    price: transport.price,

    status_Transport: transport.status_Transport === "true" ? true : false,
    location_id: transport.location_id,
  };
  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = () => {
    // make an API call to fetch the locations
   axios.get("http://localhost:5158/api/Location/GetLocations")
      .then((response) => {
        console.log("response", response);
        setLocations(response.data.data); // assuming the response contains the location data
      })
      .catch((error) => console.log("error", error));
  };
  console.log("locations", locations )
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setTransport({
      ...transport,
      [name]: value,
    });
  };

  const navigateListTransport = () => {
    navigate("/admin/transport");
  };

  function handleSubmit(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("http://localhost:5158/api/Transport/AddTransport", data)
          .then((result) => {
            console.log("transport", result);
            if (result.status === 201) {
            //   //upload image

            //   Swal.fire(
            //     "Created!",
            //     "Your transport has been created.",
            //     "success"
            //   );
            //   navigateListTransport();
            }
          })
          .catch((error) => console.log("error", error));
      }
    });
  }

  const formData = new FormData();
  //upload hinh
  const handleFileChange = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      formData.append("files", e.target.files[i]);
    }
  };

  return (
    <section>
      <div className="container">
        <h2>Transport Form</h2>
        <form
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label htmlFor="transportId">Transport ID</label>
            <input
              type="text"
              className="form-control"
              id="transport_id"
              name="transport_id"
              placeholder="Enter transport ID"
              value={transport.transport_id}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="transportName">Transport Name</label>
            <input
              type="text"
              className="form-control"
              id="transport_name"
              name="transport_name"
              placeholder="Enter transport name"
              value={transport.transport_name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startposition">Start Position</label>
            <input
              type="text"
              className="form-control"
              id="start_position"
              name="start_position"
              placeholder="Enter startposition"
              value={transport.start_position}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="discount">Discount</label>
            <input
              type="number"
              className="form-control"
              id="discount"
              name="discount"
              placeholder="Enter discount"
              value={transport.discount}
              onChange={handleInputChange}
              required
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              placeholder="Enter price"
              value={transport.price}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="5"
              placeholder="Enter description"
              value={accommodation.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div> */}

          <div className="form-group">
            <label htmlFor="statusTransport">Status Transport</label>
            <select
              className="form-control"
              id="status_Transport"
              name="status_Transport"
              value={transport.status_Transport}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Transport Status</option>
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="locationId">Location ID</label>
            <select
              className="form-control"
              id="location_id"
              name="location_id"
              value={transport.location_id}
              onChange={handleInputChange}
              // required
            >
              <option value="">Select location ID</option>
              {locations.map((item, index) => {
                return (
                  <>
                    <option key={index} value={item.location_id}>
                      {item.location_name}
                    </option>
                  </>
                );
              })}
              {/* Add more options for locations */}
            </select>
          </div>

          {/* <div className="mb-3 mt-3">
            <label for="photoimg" className="form-label w-100">
              Photo
            </label>
            <input
              type="file"
              className="form-control"
              id="photoimg"
              onChange={handleFileChange}
              multiple
            />
          </div> */}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreateTransport;
