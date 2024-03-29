import React, { useEffect, useState } from 'react';
import {  getLocations, getRestaurantByID,  getRestaurantImageByID,  putRestaurant, putRestaurantImage } from './Service/ApiService';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateRestaurant(props) {
    const [locations, setLocations] = useState([]);
    const [restaurant, setRestaurant] = useState([]);
    const [updateRestaurant, setUpdateRestaurant] = useState([]);
    const [updateImage, setUpdateImage] = useState([]);
    const navigate = useNavigate();
    const formData = new FormData();
    const [errors, setErrors] = useState({});

    console.log("props", props);

    const { id } = useParams();

    var updatedData = {
        ...updateRestaurant,
        // type: updateAccommodation.type + "" === "true" ? true : false,
        status_Restaurant: updateRestaurant.status_Restaurant + "" === "true" ? true : false,
    }

    useEffect(() => {
        // fetch the accommodation data with the given ID
        getRestaurantByID(id)
            .then(response => {
                setRestaurant(response.data);
                setUpdateRestaurant(response.data);
            })
            .catch(error => console.log("error", error));
    }, [id]);

    useEffect(() => {
        // fetch the accommodation data with the given ID
        getRestaurantByID(id)
          .then((response) => {
            setRestaurant(response.data);
            setUpdateRestaurant(response.data);
            console.log("restaurant", response);
            if (response.status === 200) {
                getRestaurantImageByID(id)
                .then((response) => {
                  console.log("image", response);
                  setUpdateImage(response.data);
                })
                .catch((error) => console.log("error", error));
            }
          })
          .catch((error) => console.log("error", error));
      }, [id]);
      useEffect(() => {
        fetchLocation();
      }, []);
    

    const fetchLocation = () => {
        // make an API call to fetch the locations
        getLocations()
            .then(response => {
                console.log("response", response);
                setLocations(response.data); // assuming the response contains the location data
            })
            .catch(error => console.log("error", error));
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setUpdateRestaurant({
            ...updateRestaurant,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: "",
        });
    };
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
          for (var i = 0; i < e.target.files.length; i++) {
            console.log("files", e);
            formData.append("files", e.target.files[i]);
          }
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        //Validate form before call API to create
        const newErrors = validateForm(updateRestaurant);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        //update accommodation with the updatedAccommodation data
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, update it!",
        }).then((result) => {
          if (result.isConfirmed) {
            putRestaurant(id, updatedData)
              .then((response) => {
                console.log("Updated Restaurant", response);
                if (response.status === 200) {
                  if (formData.get("files")) {
                    // Check if new files are selected
                    putRestaurantImage(id, formData)
                      .then((response) => {
                        console.log("updated image", response);
                        if (response.status === 200) {
                          Swal.fire(
                            "Updated!",
                            "Your Restaurant has been updated.",
                            "success"
                          );
                          // handle success or navigate to another page
                          navigate("/admin/restaurant");
                        }
                      })
                      .catch((error) => console.log("error", error));
                  } else {
                    Swal.fire(
                      "Updated!",
                      "Your Restaurant has been updated.",
                      "success"
                    );
                    // handle success or navigate to another page
                    navigate("/admin/restaurant");
                  }
                }
              })
              .catch((error) => console.log("error", error));
          }
        });
        console.log("updateRestaurant", updateRestaurant);
    };

    const validateForm = (updateRestaurant) => {
        let errors = {};



        if (!updateRestaurant.restaurant_name) {
            errors.restaurant_name = "restaurant Name is required";
        } else if (updateRestaurant.restaurant_name.length < 3 || updateRestaurant.restaurant_name.length > 30) {
            errors.restaurant_name = "restaurant Name must be between 3 - 30 characters";
        }

        if (!updateRestaurant.rate) {
            errors.rate = "Rate is required";
        } else if (updateRestaurant.rate < 1 || updateRestaurant.rate > 5) {
            errors.rate = "Rate  must be between 1- 5 stars";
        }


        if (!updateRestaurant.price) {
            errors.price = "Price is required";
        } else if (updateRestaurant.price < 1 || updateRestaurant.price > 100000000000) {
            errors.price = "Price  must be between 1- 100.000.000.000 ";
        }

        if (!updateRestaurant.status_Restaurant) {
            errors.status_Restaurant = "restaurant Status is required";
        }
        if (!updateRestaurant.location_id) {
            errors.location_id = "Location ID is required";
        }
        return errors;
    };
    return (
        <section>
            <div className="container">
                <h2>Restaurant Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="restaurantId">Restaurant ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="restaurant_id"
                            name='restaurant_id'
                            placeholder="Enter Restaurant ID"
                            value={updateRestaurant.restaurant_id}
                            onChange={handleInputChange}

                            disabled

                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="restaurantName">Restaurant Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.restaurant_name ? "is-invalid" : ""}`}
                            id="restaurant_name"
                            name='restaurant_name'
                            placeholder="Enter Restaurant Name"
                            value={updateRestaurant.restaurant_name}
                            onChange={handleInputChange}

                        />
                        {errors.restaurant_name && <div className="invalid-feedback">{errors.restaurant_name}</div>}

                    </div>

                    <div className="form-group">
                        <label htmlFor="rate">Rate</label>
                        <input
                            type="number"
                            className={`form-control ${errors.rate ? "is-invalid" : ""}`}
                            id="rate"
                            name='rate'
                            placeholder="Enter rate (1-5)"
                            value={updateRestaurant.rate}
                            onChange={handleInputChange}

                        />
                        {errors.rate && <div className="invalid-feedback">{errors.rate}</div>}

                    </div>

                    {/* <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select
                            className="form-control"
                            id="type"
                            name='type'
                            value={updateAccommodation.type}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select accommodation type</option>
                            <option value="false">Hotel</option>
                            <option value="true">Resort</option>
                        </select>
                    </div> */}

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            className={`form-control ${errors.price ? "is-invalid" : ""}`}
                            id="price"
                            name='price'
                            placeholder="Enter price"
                            value={updateRestaurant.price}
                            onChange={handleInputChange}

                        />
                        {errors.price && <div className="invalid-feedback">{errors.price}</div>}

                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name='description'
                            rows="5"
                            placeholder="Enter description"
                            value={updateRestaurant.description}
                            onChange={handleInputChange}

                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="statusRestaurant">Status Restaurant</label>
                        <select
                            className={`form-control ${errors.status_Restaurant ? "is-invalid" : ""}`}
                            id="status_Restaurant"
                            name='status_Restaurant'
                            value={updateRestaurant.status_Restaurant}
                            onChange={handleInputChange}

                        >
                            <option value="false">false</option>
                            <option value="true">true</option>
                        </select>
                        {errors.status_Restaurant && <div className="invalid-feedback">{errors.status_Restaurant}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="locationId">Location ID</label>
                        <select
                            className={`form-control ${errors.location_id ? "is-invalid" : ""}`}
                            id="location_id"
                            name='location_id'
                            value={updateRestaurant.location_id}
                            onChange={handleInputChange}

                        >
                            <option value="">Select location ID</option>
                            {locations.map((item, index) => {
                                return <>
                                    <option key={index} value={item.location_id}>
                                        {item.location_name}
                                    </option>
                                </>
                            })}
                            {/* Add more options for locations */}
                        </select>
                        {errors.location_id && <div className="invalid-feedback">{errors.location_id}</div>}
                    </div>
                    <div className="mb-3 mt-3">
            <label for="photoimg" className="form-label w-100">
              Photo
            </label>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {updateImage.map((item, index) => (
                <div
                  key={index}
                  style={{ width: "200px", height: "200px", margin: "5px" }}
                >
                  <img
                    src={`http://localhost:5158/${item}`}
                    alt={item}
                    className=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
            <input
              type="file"
              className="form-control"
              id="photoimg"
              onChange={handleFileChange}
              multiple
              style={{ marginTop: "10px" }}
            />
          </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div >
        </section >
    );
}

export default UpdateRestaurant;