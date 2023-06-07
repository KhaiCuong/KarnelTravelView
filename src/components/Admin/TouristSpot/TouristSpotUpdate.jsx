import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateTouristSpot() {
  const navigate = useNavigate();
  const [img, setImg] = useState([]);
  const [spot, setSpot] = useState([]);
  const { id } = useParams();

  const handleBack = () => {
    navigate(`/admin/tourist-spot/detail/${id}`);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSpot({
      ...spot,
      [name]: value,
    });
  };

  var data = {
    touristSpot_id: spot.touristSpot_id,
    touristSpot_name: spot.touristSpot_name,
    status_TouristSpot: spot.status_TouristSpot === "true" ? true : false,
    discount: spot.discount,
    price: spot.price,
    description: spot.description,
    activities: spot.activities,
    location_id: spot.location_id,
  };

  const formData = new FormData();
  // Upload hinh
  const handleFileChange = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      formData.append("files", e.target.files[i]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5158/api/TouristSpot/UpdateTouristSpot/${id}`, data)
      .then((result) => {
        console.log(result.data);
        return result.data.data.touristSpot_id;
      })
      .then((id) => {
        // Upload hinh
        axios
          .post(`http://localhost:5158/api/TouristSpotImage/UpdateImageById/${id}`, formData)
          .then((result) => {
            if (result.status === 200) {
              navigate("/admin/tourist-spot");
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5158/api/TouristSpot/GetTouristSpotById/${id}`)
      .then((t) => {
        setSpot(t.data.data);
      })
      .then((error) => console.log(error));

    axios
      .get(`http://localhost:5158/api/TouristSpotImage/GetImagesByTouristSpotId/${id}`)
      .then((s) => {
        setImg(s.data.data);
        return s.data.data;
      })
      .then((error) => console.log(error));
  }, []);

  return (
    <div className="container-fluid ">
      <>
        <h2 className="text-center">Create a new Tourist Spot</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" className="form-control" hidden placeholder="Enter Tour Id" value={spot.touristSpot_id} name="touristSpot_id" onChange={handleChangeInput} />
          <div className="mb-3 mt-3">
            <label for="touristSpot_name" className="form-label w-100">
              touristSpot_name
            </label>
            <input type="text" className="form-control" value={spot.touristSpot_name} placeholder="Enter Tour Name" name="touristSpot_name" onChange={handleChangeInput} />
          </div>
          <div className="mb-3 mt-3">
            <label for="status_TouristSpot" className="form-label w-100">
              Status:
            </label>
            <input type="text" className="form-control" value={spot.status_TouristSpot} placeholder="Enter Tour Status" name="status_TouristSpot" onChange={handleChangeInput} />
          </div>
          <div className="mb-3 mt-3">
            <label for="discount" className="form-label w-100">
              Discount:
            </label>
            <input type="number" className="form-control" value={spot.discount} placeholder="Enter Tour discount" name="discount" onChange={handleChangeInput} />
          </div>
          <div className="mb-3 mt-3">
            <label for="activities" className="form-label w-100">
              activities
            </label>
            <input type="text" className="form-control" placeholder="Enter Tour description" value={spot.activities} name="activities" onChange={handleChangeInput} />
          </div>
          <div className="mb-3 mt-3">
            <label for="price" className="form-label w-100">
              Price:
            </label>
            <input type="number" className="form-control" value={spot.price} placeholder="Enter Tour price" name="price" onChange={handleChangeInput} />
          </div>
          <div className="mb-3 mt-3">
            <label for="description" className="form-label w-100">
              Description:
            </label>
            <input type="text" className="form-control" placeholder="Enter Tour description" value={spot.description} name="description" onChange={handleChangeInput} />
          </div>
          <div className="mb-3 mt-3">
            <label for="location_id" className="form-label w-100">
              location_id:
            </label>
            <input type="text" className="form-control" placeholder="Enter Tour description" value={spot.location_id} name="location_id" onChange={handleChangeInput} />
          </div>

          <div lassName="container-fluid ">
            <div class="container text-center my-3">
              <h2 class="font-weight-light pt-4">Old Photo</h2>
              {img != null && img != "" ? (
                <>
                  <div class="row mx-auto my-auto justify-content-center pb-5">
                    <div id="recipeCarousel" class="carousel slide" data-bs-ride="carousel">
                      <div class="carousel-inner" role="listbox">
                        <div class="carousel-item active">
                          {img.map((item, index) => {
                            if (index < 4) {
                              return (
                                <>
                                  <div class="col-md-3">
                                    <div class="card">
                                      <div class="card-img">
                                        <img src={`http://localhost:5158/${item}`} class="img-fluid" />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            }
                          })}
                        </div>
                        <div class="carousel-item ">
                          {img.map((item, index) => {
                            if (index >= 4) {
                              return (
                                <>
                                  <div class="col-md-3">
                                    <div class="card">
                                      <div class="card-img">
                                        <img src={`http://localhost:5158/${item}`} class="img-fluid" />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            }
                          })}
                        </div>
                      </div>
                      <a class="carousel-control-prev bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      </a>
                      <a class="carousel-control-next bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-3 mb-3">Old image not found.</div>
              )}
            </div>
          </div>

          {/* Upload hinh */}
          <div className="mb-3 mt-3">
            <label for="photoimg" className="form-label w-100">
              Change Photos
            </label>
            <input type="file" className="form-control" id="photoimg" onChange={handleFileChange} multiple />
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

export default UpdateTouristSpot;
