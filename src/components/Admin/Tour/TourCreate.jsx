import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTour() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/admin/tour`);
  };

  // Upload accom
  const [accom, setAccom] = useState([]);
  const [valueAcc, setValueAcc] = useState([]);
  const [errors, setErrors] = useState({});

  const handleAccomChange = (e) => {
    var value = [];
    for (var i = 0; i < e.target.options.length; i++) {
      if (e.target.options[i].selected) {
        value.push(e.target.options[i].value);
      }
    }
    setValueAcc(value);
  };

  // Upload spot
  const [spot, setSpot] = useState([]);
  const [valueSpot, setValueSpot] = useState([]);
  const handleSpotChange = (e) => {
    var value = [];
    for (var i = 0; i < e.target.options.length; i++) {
      if (e.target.options[i].selected) {
        value.push(e.target.options[i].value);
      }
    }
    setValueSpot(value);
  };

  // Upload restarant
  const [restaurant, setRestaurant] = useState([]);
  const [valueRes, setValueRes] = useState([]);
  const handleRestaurantChange = (e) => {
    var value = [];
    for (var i = 0; i < e.target.options.length; i++) {
      if (e.target.options[i].selected) {
        value.push(e.target.options[i].value);
      }
    }
    setValueRes(value);
  };

  // Upload trans
  const [trans, setTrans] = useState([]);
  const [valueTrans, settValueTrans] = useState([]);
  const handleTransChange = (e) => {
    var value = [];
    for (var i = 0; i < e.target.options.length; i++) {
      if (e.target.options[i].selected) {
        value.push(e.target.options[i].value);
      }
    }
    settValueTrans(value);
  };

  // initalValue date is now
  const today = new Date();
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const date = today.getFullYear() + "-" + checkTime(today.getMonth() + 1) + "-" + checkTime(today.getDate());

  // set initalValue
  const initalValue = {
    tour_id: "",
    tour_name: "",
    status_tour: false,
    discount: null,
    times: 0,
    price: 0,
    depature_date: date,
    description: null,
  };
  // set data input
  const [dataInput, setDataInput] = useState(initalValue);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setDataInput({
      ...dataInput,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  //custom data before call API
  const data = {
    tour_id: dataInput.tour_id,
    tour_name: dataInput.tour_name,
    status_tour: dataInput.status_tour === "true" ? true : false,
    discount: dataInput.discount,
    times: dataInput.times,
    price: dataInput.price,
    depature_date: dataInput.depature_date,
    description: dataInput.description,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //Validate form before call API to create
    const newErrors = validateForm(dataInput);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    };
    axios
      .post("http://localhost:5158/api/Tour/AddTour", data)
      .then((result) => {
        return result.data.tour_id;
      })
      .then((id) => {
        if (valueAcc != null && valueAcc != "") {
          axios
            .post(`http://localhost:5158/api/AccommodationTour/PostAccommodationTour?Tour_Id=${id}`, valueAcc)
            .then((result) => { })
            .catch((err) => console.log(err));
        }
        return id;
      })
      .then((id) => {
        if (valueRes != null && valueRes != "") {
          axios
            .post(`http://localhost:5158/api/RestaurantTour/PostRestaurantTour?Tour_Id=${id}`, valueRes)
            .then((result) => { })
            .catch((err) => console.log(err));
        }
        return id;
      })
      .then((id) => {
        if (valueSpot != null && valueSpot != "") {
          axios
            .post(`http://localhost:5158/api/TouristSpotTour/PostTouristSpotTour?Tour_Id=${id}`, valueSpot)
            .then((result) => { })
            .catch((err) => console.log(err));
        }
        return id;
      })
      .then((id) => {
        if (valueTrans != null && valueTrans != "") {
          axios
            .post(`http://localhost:5158/api/TransportTour/PostTransportTour?Tour_Id=${id}`, valueTrans)
            .then((result) => {
              if (result.status === 200) {
                navigate('/admin/tour');
              }
            })
            .catch((err) => console.log(err));
        } else { navigate('/admin/tour'); }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:5158/api/Accommodation/GetAccommodations")
      .then((t) => {
        setAccom(t.data.data);
        console.log("t", t);
      })
      .then((error) => console.log(error));
    axios
      .get("http://localhost:5158/api/TouristSpot/GetTouristSpots")
      .then((S) => {
        setSpot(S.data.data);
        console.log("S", S);
      })
      .then((error) => console.log(error));
    axios
      .get("http://localhost:5158/api/Transport/GetTransports")
      .then((tr) => {
        setTrans(tr.data.data);
        console.log("tr", tr);
      })
      .then((error) => console.log(error));
    axios
      .get("http://localhost:5158/api/Restaurant/GetRestaurants")
      .then((r) => {
        setRestaurant(r.data.data);
        console.log("r", r);
      })
      .then((error) => console.log(error));
  }, []);
  const validateForm = (dataInput) => {
    let errors = {};

    if (!dataInput.tour_id) {
      errors.tour_id = "Tour ID is required";
    }
    if (!dataInput.tour_name) {
      errors.tour_name = "Tour Name is required";
    } else if (dataInput.tour_name.length < 3 || dataInput.tour_name.length > 30) {
      errors.tour_name = "Tour Name must be between 3 - 30 characters";
    }

  

    if (!dataInput.status_tour) {
      errors.status_tour = "Status is required";
    }
    if (!dataInput.depature_date) {
      errors.depature_date = "Depature_date is required";
    }
    if (!dataInput.times) {
      errors.times = "Times is required";
    } else if (dataInput.times < 1 || dataInput.times > 100) {
      errors.times = "Times must be between 1 - 100 ";
    }
    if (!dataInput.price) {
      errors.price = "Price is required";
    } else if (dataInput.price < 1 || dataInput.price > 100000000000) {
      errors.price = "Price Name must be between 1 - 100.000.000.000 ";
    }
    return errors;
  };

  return (
    <div className="container-fluid ">
      <>
        <h2 className="text-center">Create a new Tour</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label for="tour_id" className="form-label w-100">
              Tour id:
            </label>
            <input type="text" className={`form-control ${errors.tour_id ? "is-invalid" : ""}`}
              placeholder="Enter Tour Id" id="tour_id" name="tour_id" onChange={handleChangeInput} />
            {errors.tour_id && <div className="invalid-feedback">{errors.tour_id}</div>}

          </div>
          <div className="mb-3 mt-3">
            <label for="tour_name" className="form-label w-100">
              Tour name:
            </label>
            <input type="text" className={`form-control ${errors.tour_name ? "is-invalid" : ""}`}
              id="tour_name" placeholder="Enter Tour Name" name="tour_name" onChange={handleChangeInput} />
            {errors.tour_name && <div className="invalid-feedback">{errors.tour_name}</div>}

          </div>
          <div className="mb-3 mt-3">
            <label for="status_tour" className="form-label w-100">
              Status:
            </label>
            <input type="text" className={`form-control ${errors.status_tour ? "is-invalid" : ""}`}
              id="status_tour" placeholder="Enter Tour Status" name="status_tour" onChange={handleChangeInput} />
            {errors.status_tour && <div className="invalid-feedback">{errors.status_tour}</div>}

          </div>
          <div className="mb-3 mt-3">
            <label for="discount" className="form-label w-100">
              Discount:
            </label>
            <input type="number" className="form-control" id="discount" placeholder="Enter Tour discount" name="discount" onChange={handleChangeInput} />
          </div>
          <div className="mb-3 mt-3">
            <label for="depature_date" className="form-label w-100">
              Depature date:
            </label>
            <input type="date" className={`form-control ${errors.depature_date ? "is-invalid" : ""}`}
              placeholder="Enter Tour description" id="depature_date" name="depature_date" onChange={handleChangeInput} />
            {errors.depature_date && <div className="invalid-feedback">{errors.depature_date}</div>}

          </div>
          <div className="mb-3 mt-3">
            <label for="times" className="form-label w-100">
              Times:
            </label>
            <input type="number" className={`form-control ${errors.times ? "is-invalid" : ""}`}
              id="times" placeholder="Enter Tour times" name="times" onChange={handleChangeInput} />
            {errors.times && <div className="invalid-feedback">{errors.times}</div>}

          </div>
          <div className="mb-3 mt-3">
            <label for="price" className="form-label w-100">
              Price:
            </label>
           
            <input type="number"  className={`form-control ${errors.price ? "is-invalid" : ""}`} id="price" placeholder="Enter Tour price" name="price" onChange={handleChangeInput} />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}

          </div>
          <div className="mb-3 mt-3">
            <label for="description" className="form-label w-100">
              Description:
            </label>
            <input type="text" className="form-control" placeholder="Enter Tour description" id="description" name="description" onChange={handleChangeInput} />
          </div>
          <div className="mb-3 mt-3">
            <label>Accommodation</label>
            <select id="multiple-select-accom " multiple className="form-control" onChange={handleAccomChange}>
              {accom.length > 0 ? (
                accom.map((item, index) => {
                  return (
                    <option key={index} value={item.accommodation_id}>
                      {item.accommodation_name}
                    </option>
                  );
                })
              ) : (
                <option value="">No items yet</option>
              )}
            </select>
          </div>
          <div className="mb-3 mt-3">
            <label>Tourist Spot</label>
            <select id="multiple-select-spot" multiple className="form-control" onChange={handleSpotChange}>
              {spot.length > 0 ? (
                spot.map((item, index) => {
                  return (
                    <option key={index} value={item.touristSpot_id}>
                      {item.touristSpot_name}
                    </option>
                  );
                })
              ) : (
                <option value="">No items yet</option>
              )}
            </select>
          </div>
          <div className="mb-3 mt-3">
            <label>Transport</label>
            <select id="multiple-select-trans" multiple className="form-control" onChange={handleTransChange}>
              {trans.length > 0 ? (
                trans.map((item, index) => {
                  return (
                    <option key={index} value={item.transport_id}>
                      Form: {item.start_position}, TO: {item.transport_name}
                    </option>
                  );
                })
              ) : (
                <option value="">No items yet</option>
              )}
            </select>
          </div>
          <div className="mb-3 mt-3">
            <label>Restaurant</label>
            <select id="multiple-select-res" multiple className="form-control" onChange={handleRestaurantChange}>
              {restaurant.length > 0 ? (
                restaurant.map((item, index) => {
                  return (
                    <option key={index} value={item.restaurant_id}>
                      {item.restaurant_name}
                    </option>
                  );
                })
              ) : (
                <option value="">No items yet</option>
              )}
            </select>
          </div>

          <div className="d-flex justify-content-around align-items-center mt-4">
            <div className="d-flex justify-content-between align-items-center w-50">
              <button className="btn btn-warning background-dark" onClick={() => handleBack()}>
                Back
              </button>

              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </form>
      </>
    </div>
  );
}

export default CreateTour;
