import React, { useEffect, useState } from 'react';
import { getAccommodationByID, getLocations, putAccommodation } from './Services/ApiService';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateAccommodation(props) {
    const [locations, setLocations] = useState([]);
    const [accommodation, setAccommodation] = useState([]);
    const [updateAccommodation, setUpdateAccommodation] = useState([]);
    const navigate = useNavigate();
    console.log("props", props);

    const { id } = useParams();

    var updatedData = {
        ...updateAccommodation,
        type: updateAccommodation.type + "" === "true" ? true : false,
        status_Accommodation: updateAccommodation.status_Accommodation + "" === "true" ? true : false,
    }

    useEffect(() => {
        // fetch the accommodation data with the given ID
        getAccommodationByID(id)
            .then(response => {
                setAccommodation(response.data);
                setUpdateAccommodation(response.data);
            })
            .catch(error => console.log("error", error));
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
        setUpdateAccommodation({
            ...updateAccommodation,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //update accommodation with the updatedAccommodation data
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        })
            .then(result => {
                if (result.isConfirmed) {
                    putAccommodation(id, updatedData)
                        .then(response => {
                            console.log("Updated Accommodation", response);
                            if (response.status === 200) {
                                Swal.fire(
                                    'Updated!',
                                    'Your Accommodation has been updated.',
                                    'success'
                                )
                                // handle success or navigate to another page
                                navigate("/admin/accommodation");
                            }
                        })
                        .catch(error => console.log("error", error));
                }
            })
        console.log("updateAccommodation", updateAccommodation);
    };
    return (
        <section>
            <div className="container">
                <h2>Accommodation Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="accommodationId">Accommodation ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="accommodation_id"
                            name='accommodation_id'
                            placeholder="Enter accommodation ID"
                            value={updateAccommodation.accommodation_id}
                            onChange={handleInputChange}
                            required
                            disabled

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
                            value={updateAccommodation.accommodation_name}
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
                            value={updateAccommodation.rate}
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
                            value={updateAccommodation.type}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select accommodation type</option>
                            <option value="false">Hotel</option>
                            <option value="true">Resort</option>
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
                            value={updateAccommodation.price}
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
                            value={updateAccommodation.description}
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
                            value={updateAccommodation.status_Accommodation}
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
                            value={updateAccommodation.location_id}
                            onChange={handleInputChange}
                            required
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
            </div >
        </section >
    );
}

export default UpdateAccommodation;