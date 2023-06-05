import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TourContext } from "./contexts/TourContext";

function UpdateTour() {
  const contextTour = useContext(TourContext);
  const { itemTour, setItemTour } = contextTour;
  const navigate = useNavigate();
  const [tour, setTour] = useState([]);
  const handleBack = () => {
    navigate(`/admin/tour/detail/${itemTour}`);
  };

  // Upload accom
  const [accomList, setAccomList] = useState([]);
  const [accom, setAccom] = useState([]);
  const [valueAcc, setValueAcc] = useState([]);
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
  const [spotList, setSpotList] = useState([]);
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
  const [restaurantList, setRestaurantList] = useState([]);
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
  const [transList, setTransList] = useState([]);
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

  useEffect(() => {
    //API view
    axios
      .get("http://localhost:5158/api/Accommodation/GetAccommodations")
      .then((t) => {
        setAccomList(t.data.data);
        console.log("t", t);
      })
      .then((error) => console.log(error));
    axios
      .get("http://localhost:5158/api/TouristSpot/GetTouristSpots")
      .then((S) => {
        setSpotList(S.data.data);
        console.log("S", S);
      })
      .then((error) => console.log(error));
    axios
      .get("http://localhost:5158/api/Transport/GetTransports")
      .then((tr) => {
        setTransList(tr.data.data);
        console.log("tr", tr);
      })
      .then((error) => console.log(error));
    axios
      .get("http://localhost:5158/api/Restaurant/GetRestaurants")
      .then((r) => {
        setRestaurantList(r.data.data);
        console.log("r", r);
      })
      .then((error) => console.log(error));

    // API Info
    axios
      .get(`http://localhost:5158/api/Tour/GetTour/${itemTour}`)
      .then((t) => {
        setTour(t.data.data);
        return t.data.data.tour_id;
      })
      .then((id) => {
        axios
          .get(`http://localhost:5158/api/TransportTour/GetListByTourId/${id}`)
          .then((result) => {
            var data = Object.values(result.data.data);
            var dataId = [];
            data.forEach((element) => {
              dataId.push(element.transport_id);
            });
            setTrans(dataId);
          })
          .catch((err) => console.log(err));
        return id;
      })
      .then((id) => {
        axios
          .get(`http://localhost:5158/api/RestaurantTour/GetListByTourId/${id}`)
          .then((result) => {
            var data = Object.values(result.data.data);
            var dataId = [];
            data.forEach((element) => {
              dataId.push(element.restaurant_id);
            });
            setRestaurant(dataId);
          })
          .catch((err) => console.log(err));
        return id;
      })
      .then((id) => {
        axios
          .get(`http://localhost:5158/api/AccommodationTour/GetListByTourId/${id}`)
          .then((result) => {
            var data = Object.values(result.data.data);
            var dataId = [];
            data.forEach((element) => {
              dataId.push(element.accommodation_id);
            });
            setAccom(dataId);
          })
          .catch((err) => console.log(err));
        return id;
      })
      .then((id) => {
        axios
          .get(`http://localhost:5158/api/TouristSpotTour/GetListByTourId/${id}`)
          .then((result) => {
            var data = Object.values(result.data.data);
            var dataId = [];
            data.forEach((element) => {
              dataId.push(element.touristSpot_id);
            });
            setSpot(dataId);
          })
          .catch((err) => console.log(err));
      })
      .then((error) => console.log(error));
  }, []);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setTour({
      ...tour,
      [name]: value,
    });
  };

  var data = {
    tour_id: tour.tour_id,
    tour_name: tour.tour_name,
    status_tour: tour.status_tour === "true" ? true : false,
    discount: tour.discount,
    times: tour.times,
    price: tour.price,
    depature_date: tour.depature_date,
    description: tour.description,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5158/api/Tour/Updatetour/${itemTour}`, data)
      .then((result) => {
     
        return result.data.data.tour_id;
      })
      .then((id) => {
        if (valueAcc != null && valueAcc != "") {
          axios
            .post(`http://localhost:5158/api/AccommodationTour/PostAccommodationTour?Tour_Id=${id}`, valueAcc)
            .then((result) => {})
            .catch((err) => console.log(err));
        }
        return id;
      })
      .then((id) => {
        if (valueRes != null && valueRes != "") {
          axios
            .post(`http://localhost:5158/api/RestaurantTour/PostRestaurantTour?Tour_Id=${id}`, valueRes)
            .then((result) => {})
            .catch((err) => console.log(err));
        }
        return id;
      })
      .then((id) => {
        if (valueSpot != null && valueSpot != "") {
          axios
            .post(`http://localhost:5158/api/TouristSpotTour/PostTouristSpotTour?Tour_Id=${id}`, valueSpot)
            .then((result) => {})
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
        } else { navigate('/admin/tour');}
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid ">
      <>
        <h2 className="text-center">Update a new Tour</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={tour.tour_id} name="tour_id" hidden />

          <div className="mb-3 mt-3">
            <label for="tour_name" className="form-label w-100">
              Tour name:
            </label>
            <input type="text" className="form-control" id="tour_name" value={tour.tour_name} name="tour_name" onChange={handleChangeInput} />
          </div>
          <div className="mb-3 mt-3">
            <label for="status_tour" className="form-label w-100">
              Status:
            </label>
            <input type="text" className="form-control" id="status_tour" value={tour.status_tour + ""} name="status_tour" onChange={handleChangeInput} />
          </div>
          <div className="mb-3 mt-3">
            <label for="discount" className="form-label w-100">
              Discount:
            </label>
            <input type="number" className="form-control" id="discount" value={tour.discount} name="discount" onChange={handleChangeInput} />
          </div>
          <div className="mb-3 mt-3">
            <label for="depature_date" className="form-label w-100">
              Depature date:
            </label>
            <input type="date" className="form-control" value={tour.depature_date} id="depature_date" name="depature_date" onChange={handleChangeInput} />
          </div>
          <div className="mb-3 mt-3">
            <label for="times" className="form-label w-100">
              Times:
            </label>
            <input type="number" className="form-control" id="times" value={tour.times} name="times" onChange={handleChangeInput} />
          </div>
          <div className="mb-3 mt-3">
            <label for="price" className="form-label w-100">
              Price:
            </label>
            <input type="number" className="form-control" id="price" value={tour.price} name="price" onChange={handleChangeInput} />
          </div>
          <div className="mb-3 mt-3">
            <label for="description" className="form-label w-100">
              Description:
            </label>
            <input type="text" className="form-control" value={tour.description} id="description" name="description" onChange={handleChangeInput} />
          </div>

          <div className="mb-3 mt-3">
            <label>Accommodation</label>
            <select id="multiple-select-accom " multiple className="form-control" onChange={handleAccomChange}>
              {accomList.length > 0 ? (
                accomList.map((item, index) => {
                  if (accom.includes(item.accommodation_id)) {
                    return (
                      <option key={index} value={item.accommodation_id} selected>
                        {item.accommodation_name}
                      </option>
                    );
                  } else {
                    return (
                      <option key={index} value={item.accommodation_id}>
                        {item.accommodation_name}
                      </option>
                    );
                  }
                })
              ) : (
                <option value="">No items yet</option>
              )}
            </select>
          </div>
          <div className="mb-3 mt-3">
            <label>Tourist Spot</label>
            <select id="multiple-select-spot" multiple className="form-control" onChange={handleSpotChange}>
              {spotList.length > 0 ? (
                spotList.map((item, index) => {
                  if (spot.includes(item.touristSpot_id)) {
                    return (
                      <option key={index} value={item.touristSpot_id} selected>
                        {item.touristSpot_name}
                      </option>
                    );
                  } else {
                    return (
                      <option key={index} value={item.touristSpot_id}>
                        {item.touristSpot_name}
                      </option>
                    );
                  }
                })
              ) : (
                <option value="">No items yet</option>
              )}
            </select>
          </div>
          <div className="mb-3 mt-3">
            <label>Transport</label>
            <select id="multiple-select-trans" multiple className="form-control" onChange={handleTransChange}>
              {transList.length > 0 ? (
                transList.map((item, index) => {
                  if (trans.includes(item.transport_id)) {
                    return (
                      <option key={index} value={item.transport_id} selected>
                        Form: {item.start_position}, TO: {item.transport_name}{" "}
                      </option>
                    );
                  } else {
                    return (
                      <option key={index} value={item.transport_id}>
                        Form: {item.start_position}, TO: {item.transport_name}{" "}
                      </option>
                    );
                  }
                })
              ) : (
                <option value="">No items yet</option>
              )}
            </select>
          </div>
          <div className="mb-3 mt-3">
            <label>Restaurant</label>
            <select id="multiple-select-res" multiple className="form-control" onChange={handleRestaurantChange}>
            {restaurantList.length > 0 ? (
                restaurantList.map((item, index) => {
                  if (restaurant.includes(item.restaurant_id)) {
                    return (
                      <option key={index} value={item.restaurant_id} selected>
                      {item.restaurant_name}
                      </option>
                    );
                  } else {
                    return (
                      <option key={index} value={item.restaurant_id}>
                        {item.restaurant_name}
                      </option>
                    );
                  }
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
                Update
              </button>
            </div>
          </div>
        </form>
      </>
    </div>
  );
}

export default UpdateTour;
