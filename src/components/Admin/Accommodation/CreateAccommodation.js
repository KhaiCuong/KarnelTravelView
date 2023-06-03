import React, { useEffect, useState } from 'react';
import { getLocations, postAccommodation } from './Services/ApiService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateAccommodation() {
    const navigate = useNavigate();
    const initialState = {
        accommodation_id: "",
        accommodation_name: "",
        rate: "",
        type: "",
        price: "",
        description: "",
        status_Accommodation: "",
        location_id: "",
    };

    const [accommodation, setAccommodation] = useState(initialState);
    const [locations, setLocations] = useState([])

    var data = {
        accommodation_id: accommodation.accommodation_id,
        accommodation_name: accommodation.accommodation_name,
        rate: accommodation.rate,
        type: accommodation.type === "true" ? true : false,
        price: accommodation.price,
        description: accommodation.description,
        status_Accommodation: accommodation.status_Accommodation === "true" ? true : false,
        location_id: accommodation.location_id,
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setAccommodation({
            ...accommodation,
            [name]: value,

        });
    };

    const navigateListAccommodation = () => {
        navigate("/admin/accommodation");
    };

    function handleSubmit(e) {
        e.preventDefault();

        postAccommodation(data)
            .then((pro) => {
                console.log("pro", pro);
                if (pro.status === 201) {
                    navigateListAccommodation();
                }
            })
            .catch(error => console.log("error", error));
        //console.log("Accommodation", accommodation);
        console.log("accommodation", accommodation);
        // console.log("price", typeof (accommodation.price));
        // console.log("rate", typeof (accommodation.rate));
        // console.log("status accommodation", typeof (accommodation.status_Accommodation));
        // console.log("type", typeof (accommodation.type));
    }
    return (
        <section>
            <div className="container">
                <h2>Accommodation Form</h2>
                <form onSubmit={handleSubmit} method='post'>
                    <div className="form-group">
                        <label htmlFor="accommodationId">Accommodation ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="accommodation_id"
                            name='accommodation_id'
                            placeholder="Enter accommodation ID"
                            value={accommodation.accommodation_id}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="accommodationName">Accommodation Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="accommodation_name"
                            name='accommodation_name'
                            placeholder="Enter accommodation name"
                            value={accommodation.accommodation_name}
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
                            name='rate'
                            min="1"
                            max="5"
                            placeholder="Enter rate (1-5)"
                            value={accommodation.rate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
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
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name='price'
                            placeholder="Enter price"
                            value={accommodation.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name='description'
                            rows="5"
                            placeholder="Enter description"
                            value={accommodation.description}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="statusAccommodation">Status Accommodation</label>
                        <select
                            className="form-control"
                            id="status_Accommodation"
                            name='status_Accommodation'
                            value={accommodation.status_Accommodation}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="false">false</option>
                            <option value="true">true</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="locationId">Location ID</label>
                        <select
                            className="form-control"
                            id="location_id"
                            name='location_id'
                            value={accommodation.location_id}
                            onChange={handleInputChange}
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

export default CreateAccommodation;