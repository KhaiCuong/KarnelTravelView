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
  };

  const navigateListRestaurant = () => {
    navigate("/admin/restaurant");
  };

  function handleSubmit(e) {
    e.preventDefault();

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
// function handleSubmit(e) {
//     e.preventDefault();

//     postRestaurant(data)
//         .then((pro) => {
//             console.log("pro", pro);
//             if (pro.status === 201) {
//                 navigateListRestaurant();
//             }
//         })
//         .catch(error => console.log("error", error));
    
//     console.log("restaurant", restaurant);
    
// }
  return (
    <section>
      <div className="container">
        <h2>Restaurant Form</h2>
        <form onSubmit={handleSubmit} method="post" encType="multi/form-data" >
          <div className="form-group">
            <label htmlFor="restaurantId">Restaurant ID</label>
            <input
              type="text"
              className="form-control"
              id="restaurant_id"
              name="restaurant_id"
              placeholder="Enter Restaurant ID"
              value={restaurant.restaurant_id}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="restaurantName">Restaurant Name</label>
            <input
              type="text"
              className="form-control"
              id="restaurant_name"
              name="restaurant_name"
              placeholder="Enter Restaurant Name"
              value={restaurant.restaurant_name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rate">Rate</label>
            <input
              type="number"
              className="form-control"
              id="rate"
              name="rate"
              min="1"
              max="5"
              placeholder="Enter rate (1-5)"
              value={restaurant.rate}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select
                            className="form-control"
                            id="type"
                            name='type'
                            value={accommodation.type}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="false">false</option>
                            <option value="true">true</option>
                        </select>
                    </div> */}

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
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              placeholder="Enter price"
              value={restaurant.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="statusRestaurant">Status Restaurant</label>
            <select
              className="form-control"
              id="status_Restaurant"
              name="status_Restaurant"
              value={restaurant.status_Restaurant}
              onChange={handleInputChange}
              required
            >
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
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
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="locationId">Location ID</label>
            <select
              className="form-control"
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
