import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UpdateContext } from "./Context/UpdateContext";
import { getLocations } from "./Service/ApiService";

function UpdateRestaurant(props) {
  const navigate = useNavigate();
  const initialState = {
    restaurant_id: "",
    restaurant_name: "",
    rate: "",
    description: "",
    price:"",
    status_Restaurant: "",
    discount: "",
    location_id: "",
};

const [restaurant, setRestaurant] = useState(initialState);
const [locations, setLocations] = useState([])

var data = {
    restaurant_id: restaurant.restaurant_id,
    restaurant_name: restaurant.restaurant_name,
    rate: restaurant.rate,
    description: restaurant.description,
    price: restaurant.price,
    status_Restaurant: restaurant.status_Restaurant === "true" ? true : false,
    discount: restaurant.discount,
    location_id: restaurant.location_id,
}
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



const navigateListRestaurant = () => {
    navigate("/admin/restaurant");
};
  const [updateRestaurant, setUpdateRestaurant] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5158/api/Restaurant/GetRestaurantById/`)
      .then((pro) => setUpdateRestaurant(pro.data.data))
      .catch((error) => console.log(error));
  }, []);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUpdateRestaurant({
      ...updateRestaurant,
      [name]: value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5158/api/Restaurant/GetRestaurantById/`,
        updateRestaurant,
       
      )
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
            navigateListRestaurant();
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <section>
            <div className="container">
                <h2>Restaurant Form</h2>
                <form onSubmit={handleUpdate} method='post'>
                    <div className="form-group">
                        <label htmlFor="restaurantId">Restaurant ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="restaurant_id"
                            name='restaurant_id'
                            placeholder="Enter Restaurant ID"
                            value={updateRestaurant.restaurant_id}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="restaurantName">Restaurant Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="restaurant_name"
                            name='restaurant_name'
                            placeholder="Enter Restaurant Name"
                            value={updateRestaurant.restaurant_name}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="rate">Rate</label>
                        <input
                            type="number"
                            className="form-control"
                            id="rate"
                            name='rate'
                            min="1"
                            max="5"
                            placeholder="Enter rate (1-5)"
                            value={updateRestaurant.rate}
                            onChange={handleChangeInput}
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
                            name='description'
                            rows="5"
                            placeholder="Enter description"
                            value={updateRestaurant.description}
                            onChange={handleChangeInput}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name='price'
                            placeholder="Enter price"
                            value={updateRestaurant.price}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="statusRestaurant">Status Restaurant</label>
                        <select
                            className="form-control"
                            id="status_Restaurant"
                            name='status_Restaurant'
                            value={updateRestaurant.status_Restaurant}
                            onChange={handleChangeInput}
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
                            name='discount'
                            placeholder="Enter discount"
                            value={updateRestaurant.discount}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="locationId">Location ID</label>
                        <select
                            className="form-control"
                            id="location_id"
                            name='location_id'
                            value={updateRestaurant.location_id}
                            onChange={handleChangeInput}
                        // required
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
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </section>
  );
}

export default UpdateRestaurant;
