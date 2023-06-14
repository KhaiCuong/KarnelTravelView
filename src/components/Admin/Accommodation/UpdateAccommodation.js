import React, { useEffect, useState } from "react";
import {
  getAccommodationByID,
  getAccommodationImageByID,
  getLocations,
  putAccommodation,
  putAccommodationImage,
} from "./Services/ApiService";
import { redirect, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateAccommodation(props) {
  const [locations, setLocations] = useState([]);
  const [accommodation, setAccommodation] = useState([]);
  const [updateAccommodation, setUpdateAccommodation] = useState([]);
  const [updateImage, setUpdateImage] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const formData = new FormData();
  const handleBack = () => {
    navigate(`/admin/accommodation/detailAccommodation/${id}`);
  };

  const { id } = useParams();

  var updatedData = {
    ...updateAccommodation,
    type: updateAccommodation.type + "" === "true" ? true : false,
    status_Accommodation:
      updateAccommodation.status_Accommodation + "" === "true" ? true : false,
  };

  useEffect(() => {
    // fetch the accommodation data with the given ID
    getAccommodationByID(id)
      .then((response) => {
        setAccommodation(response.data);
        setUpdateAccommodation(response.data);
        console.log("accommodation", response);
        if (response.status === 200) {
          getAccommodationImageByID(id)
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
      .then((response) => {
        console.log("Location", response);
        setLocations(response.data); // assuming the response contains the location data
      })
      .catch((error) => console.log("error", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUpdateAccommodation({
      ...updateAccommodation,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  //update accommodation and image, however cannot keep the old images when no new image
  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     //update accommodation with the updatedAccommodation data
  //     Swal.fire({
  //         title: 'Are you sure?',
  //         text: "You won't be able to revert this!",
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonColor: '#3085d6',
  //         cancelButtonColor: '#d33',
  //         confirmButtonText: 'Yes, update it!'
  //     })
  //         .then(result => {
  //             if (result.isConfirmed) {
  //                 putAccommodation(id, updatedData)
  //                     .then(response => {
  //                         console.log("Updated Accommodation", response);
  //                         if (response.status === 200) {
  //                             console.log("updateImage", updateImage);
  //                             console.log("formData", formData);
  //                             putAccommodationImage(id, formData)
  //                                 .then(response => {
  //                                     console.log("updated image", response);
  //                                     if (response.status === 200) {
  //                                         Swal.fire(
  //                                             'Updated!',
  //                                             'Your Accommodation has been updated.',
  //                                             'success'
  //                                         )
  //                                         // handle success or navigate to another page
  //                                         // navigate("/admin/accommodation");
  //                                     }
  //                                 })
  //                                 .catch(error => console.log("error", error));
  //                         }
  //                     })
  //                     .catch(error => console.log("error", error));
  //             }
  //         })
  //     console.log("updateAccommodation", updateAccommodation);
  // };

  // update accommodation and image, it can also keep the old images when there are no new updated images
  const handleSubmit = (e) => {
    e.preventDefault();
    //Validate form before call API to create
    const newErrors = validateForm(updateAccommodation);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
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
        putAccommodation(id, updatedData)
          .then((response) => {
            console.log("Updated Accommodation", response);
            if (response.status === 200) {
              if (formData.get("files")) {
                // Check if new files are selected
                putAccommodationImage(id, formData)
                  .then((response) => {
                    console.log("updated image", response);
                    if (response.status === 200) {
                      Swal.fire(
                        "Updated!",
                        "Your Accommodation has been updated.",
                        "success"
                      );
                      // handle success or navigate to another page
                      navigate("/admin/accommodation");
                    }
                  })
                  .catch((error) => console.log("error", error));
              } else {
                Swal.fire(
                  "Updated!",
                  "Your Accommodation has been updated.",
                  "success"
                );
                // handle success or navigate to another page
                navigate("/admin/accommodation");
              }
            }
          })
          .catch((error) => console.log("error", error));
      }
    });
    console.log("updateAccommodation", updateAccommodation);
  };

  //upload hinh
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      for (var i = 0; i < e.target.files.length; i++) {
        console.log("files", e);
        formData.append("files", e.target.files[i]);
      }
    }
  };

  const validateForm = (accommodation) => {
    let errors = {};

    if (!accommodation.accommodation_name) {
      errors.accommodation_name = "accommodation Name is required";
    } else if (accommodation.accommodation_name.length < 3 || accommodation.accommodation_name.length > 30) {
      errors.accommodation_name = "accommodation Name must be between 3 - 30 characters";
    }

    if (!accommodation.rate) {
      errors.rate = "Rate is required";
    } else if (accommodation.rate < 1 || accommodation.rate > 5) {
      errors.rate = "Rate  must be between 1- 5 stars";
    }

    if (!accommodation.type) {
      errors.type = "Type is required";
    }
    if (!accommodation.price) {
      errors.price = "Price is required";
    } else if (accommodation.price < 1 || accommodation.price > 100000000000) {
      errors.price = "Price  must be between 1- 100.000.000.000 ";
    }

    if (!accommodation.status_Accommodation) {
      errors.status_Accommodation = "Accommodation Status is required";
    }
    if (!accommodation.location_id) {
      errors.location_id = "Location ID is required";
    }
    return errors;
  };
  return (
    <section>
      <div className="container">
        <h2>Accommodation Form</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="accommodationId">Accommodation ID</label>
            <input
              type="text"
              className="form-control"
              id="accommodation_id"
              name="accommodation_id"
              placeholder="Enter accommodation ID"
              value={updateAccommodation.accommodation_id}
              onChange={handleInputChange}
             
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="accommodationName">Accommodation Name</label>
            <input
              type="text"
              className={`form-control ${errors.accommodation_name ? "is-invalid" : ""}`}
              id="accommodation_name"
              name="accommodation_name"
              placeholder="Enter accommodation name"
              value={updateAccommodation.accommodation_name}
              onChange={handleInputChange}

            />
            {errors.accommodation_name && <div className="invalid-feedback">{errors.accommodation_name}</div>}

          </div>

          <div className="form-group">
            <label htmlFor="rate">Rate</label>
            <input
              type="number"
              className={`form-control ${errors.rate ? "is-invalid" : ""}`}
              id="rate"
              name="rate"
              placeholder="Enter rate (1-5)"
              value={updateAccommodation.rate}
              onChange={handleInputChange}
            
            />
                        {errors.rate && <div className="invalid-feedback">{errors.rate}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              className="form-control"
              id="type"
              name="type"
              value={updateAccommodation.type}
              onChange={handleInputChange}
             
            >
              <option value="">Select accommodation type</option>
              <option value="false">Hotel</option>
              <option value="true">Resort</option>
            </select>
            {errors.type && <div className="invalid-feedback">{errors.type}</div>}

          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              id="price"
              name="price"
              placeholder="Enter price"
              value={updateAccommodation.price}
              onChange={handleInputChange}
              
            />
                        {errors.price && <div className="invalid-feedback">{errors.price}</div>}

          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="5"
              placeholder="Enter description"
              value={updateAccommodation.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="statusAccommodation">Status Accommodation</label>
            <select
                            className={`form-control ${errors.status_Accommodation ? "is-invalid" : ""}`}

              id="status_Accommodation"
              name="status_Accommodation"
              value={updateAccommodation.status_Accommodation}
              onChange={handleInputChange}
             
            >
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
                        {errors.status_Accommodation && <div className="invalid-feedback">{errors.status_Accommodation}</div>}

          </div>

          <div className="form-group">
            <label htmlFor="locationId">Location ID</label>
            <select
                            className={`form-control ${errors.location_id ? "is-invalid" : ""}`}
              id="location_id"
              name="location_id"
              value={updateAccommodation.location_id}
              onChange={handleInputChange}
              required
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

          <div className="d-flex justify-content-around align-items-center mt-4">
            <div className="d-flex justify-content-between align-items-center w-50">
              <button
                className="btn btn-warning background-dark"
                onClick={() => handleBack()}
              >
                Back
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default UpdateAccommodation;
