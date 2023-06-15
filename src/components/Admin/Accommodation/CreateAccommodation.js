import React, { useEffect, useState } from 'react';
import { getLocations, postAccommodation, postAccommodationImage } from './Services/ApiService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


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
    const [errors, setErrors] = useState({});

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
        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const navigateListAccommodation = () => {
        navigate("/admin/accommodation");
    };

    function handleSubmit(e) {
        e.preventDefault();
        //Validate form before call API to create
        const newErrors = validateForm(accommodation);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, create it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    postAccommodation(data)
                        .then((result) => {
                            if (result.status === 201) {
                                //upload image
                                postAccommodationImage(result.data.accommodation_id, formData)
                                    .then(result => {
                                        console.log("image", result);
                                        if (result.status === 200) {
                                            Swal.fire('Created!', 'Your Accommodation has been created.', 'success');
                                            navigateListAccommodation();
                                        }
                                    })
                                    .catch(error => console.log("error", error));
                            }
                        })
                        .catch(error => console.log("error", error));
                }
            })
    }

    const formData = new FormData();
    //upload hinh 
    const handleFileChange = (e) => {
        for (var i = 0; i < e.target.files.length; i++) {
            formData.append("files", e.target.files[i]);
        }
    };

    // Validate
    const validateForm = (accommodation) => {
        let errors = {};

        if (!accommodation.accommodation_id) {
            errors.accommodation_id = "accommodation ID is required";
        }

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
                <form onSubmit={handleSubmit} method='post' encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="accommodationId">Accommodation ID</label>
                        <input
                            type="text"
                            className={`form-control ${errors.accommodation_id ? "is-invalid" : ""}`}
                            id="accommodation_id"
                            name='accommodation_id'
                            placeholder="Enter accommodation ID"
                            value={accommodation.accommodation_id}
                            onChange={handleInputChange}
                            
                        />
                        {errors.accommodation_id && <div className="invalid-feedback">{errors.accommodation_id}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="accommodationName">Accommodation Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.accommodation_name ? "is-invalid" : ""}`}
                            id="accommodation_name"
                            name='accommodation_name'
                            placeholder="Enter accommodation name"
                            value={accommodation.accommodation_name}
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
                            name='rate'
                            min="1"
                            max="5"
                            placeholder="Enter rate (1-5)"
                            value={accommodation.rate}
                            onChange={handleInputChange}
                            
                        />
                        {errors.rate && <div className="invalid-feedback">{errors.rate}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select
                            className={`form-control ${errors.type ? "is-invalid" : ""}`}
                            id="type"
                            name='type'
                            value={accommodation.type}
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
                            name='price'
                            placeholder="Enter price"
                            value={accommodation.price}
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
                            value={accommodation.description}
                            onChange={handleInputChange}
                            
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="statusAccommodation">Status Accommodation</label>
                        <select
                            className={`form-control ${errors.status_Accommodation ? "is-invalid" : ""}`}
                            id="status_Accommodation"
                            name='status_Accommodation'
                            value={accommodation.status_Accommodation}
                            onChange={handleInputChange}
                            
                        >
                            <option value="">Select accommodation Status</option>
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
                        {errors.location_id && <div className="invalid-feedback">{errors.location_id}</div>}

                    </div>

                    <div className="mb-3 mt-3">
                        <label for="photoimg" className="form-label w-100">
                            Photo
                        </label>
                        <input type="file" className="form-control" id="photoimg" onChange={handleFileChange} multiple />
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