import React, { useEffect, useState } from "react";
import { getLocations, postRestaurant, postRestaurantImg } from "./Service/ApiService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateRestaurant() {
  const navigate = useNavigate();
  const initialState = {
    restaurant_id: "",
    restaurant_name: "",
    rate: "",
    description: "",
    price: "",
    status_Restaurant: "",
    discount: "",
    location_id: "",
  };

  const [restaurant, setRestaurant] = useState(initialState);
  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState({});
  var data = {
    restaurant_id: restaurant.restaurant_id,
    restaurant_name: restaurant.restaurant_name,
    rate: restaurant.rate,
    description: restaurant.description,
    price: restaurant.price,
    status_Restaurant: restaurant.status_Restaurant === "true" ? true : false,
    discount: restaurant.discount,
    location_id: restaurant.location_id,
  };
  const formData = new FormData();

  // Upload hinh
  const handleFileChange = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      formData.append("files", e.target.files[i]);
    }
  };
  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = () => {
    // make an API call to fetch the locations
    getLocations()
      .then((response) => {
        console.log("response", response);
        setLocations(response.data); // assuming the response contains the location data
      })
      .catch((error) => console.log("error", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setRestaurant({
      ...restaurant,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const navigateListRestaurant = () => {
    navigate("/admin/restaurant");
  };

  function handleSubmit(e) {
    e.preventDefault();
    //Validate form before call API to create
    const newErrors = validateForm(restaurant);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    postRestaurant(data)
      .then((result) => {
        console.log("restaurant", result);
        if (result.status === 201) {
          //upload image
          postRestaurantImg(result.data.restaurant_id, formData)
            .then(result => {
              console.log("image", result);
              if (result.status === 200) {
                navigateListRestaurant();
              }
            })
            .catch(error => console.log("error", error));
        }
      })
      .catch(error => console.log("error", error));
  }

  // Validate
  const validateForm = (restaurant) => {
    let errors = {};

    if (!restaurant.restaurant_id) {
      errors.restaurant_id = "Restaurant ID is required";
    }

    if (!restaurant.restaurant_name) {
      errors.restaurant_name = "restaurant Name is required";
    } else if (restaurant.restaurant_name.length < 3 || restaurant.restaurant_name.length > 30) {
      errors.restaurant_name = "restaurant Name must be between 3 - 30 characters";
    }

    if (!restaurant.price) {
      errors.price = "Price is required";
    } else if (restaurant.price < 1 || restaurant.price > 100000000000) {
      errors.price = "Price  must be between 1- 100.000.000.000 ";
    }

    return errors;
  };
  return (
    <section>
      <div className="container">
        <h2>Restaurant Form</h2>
        <form onSubmit={handleSubmit} method="post" encType="multi/form-data" >
          <div className="form-group">
            <label htmlFor="restaurantId">Restaurant ID</label>
            <input
              type="text"
              className={`form-control ${errors.restaurant_id ? "is-invalid" : ""}`}

              id="restaurant_id"
              name="restaurant_id"
              placeholder="Enter Restaurant ID"
              value={restaurant.restaurant_id}
              onChange={handleInputChange}
              
            />
            {errors.restaurant_id && <div className="invalid-feedback">{errors.restaurant_id}</div>}

          </div>

          <div className="form-group">
            <label htmlFor="restaurantName">Restaurant Name</label>
            <input
              className={`form-control ${errors.restaurant_name ? "is-invalid" : ""}`}

              id="restaurant_name"
              name="restaurant_name"
              placeholder="Enter Restaurant Name"
              value={restaurant.restaurant_name}
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
              name="rate"
              min="1"
              max="5"
              placeholder="Enter rate (1-5)"
              value={restaurant.rate}
              onChange={handleInputChange}
              
            />
            {errors.rate && <div className="invalid-feedback">{errors.rate}</div>}

          </div>

         

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="5"
              placeholder="Enter description"
              value={restaurant.description}
              onChange={handleInputChange}

            ></textarea>
            
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}

              id="price"
              name="price"
              placeholder="Enter price"
              value={restaurant.price}
              onChange={handleInputChange}
            
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}

          </div>

          <div className="form-group">
            <label htmlFor="statusRestaurant">Status Restaurant</label>
            <select
              className={`form-control ${errors.status_Restaurant ? "is-invalid" : ""}`}

              id="status_Restaurant"
              name="status_Restaurant"
              value={restaurant.status_Restaurant}
              onChange={handleInputChange}
             
            >
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
            {errors.status_Restaurant && <div className="invalid-feedback">{errors.status_Restaurant}</div>}

          </div>

          <div className="form-group">
            <label htmlFor="price">Discount</label>
            <input
              type="number"
              className="form-control"
              id="discount"
              name="discount"
              placeholder="Enter discount"
              value={restaurant.discount}
              onChange={handleInputChange}
            
            />
            
          </div>

          <div className="form-group">
            <label htmlFor="locationId">Location ID</label>
            <select
              className={`form-control ${errors.location_id ? "is-invalid" : ""}`}

              id="location_id"
              name="location_id"
              value={restaurant.location_id}
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
            {errors.location_id && <div className="invalid-feedback">{errors.location_id}</div>}

          </div>
          <div className="mb-3 mt-3">
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
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreateRestaurant;

