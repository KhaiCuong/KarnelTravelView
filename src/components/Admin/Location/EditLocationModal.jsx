import { useState, useEffect, useContext } from "react";
import { getLocation, updateLocation, updateLocationImage } from "./ApiServiceLocation";
import { useNavigate, useParams } from "react-router-dom/dist";
import { TourContext } from "../contexts/TourContext";
import axios from "axios";




function EditLocationModel(props) {
  const navigate = useNavigate();
  //truyen du lieu qua cac component
  //  const contextTour = useContext(TourContext);
  //  const { itemLocation, setItemLocation } = contextTour;

  // lấy id từ ListLocation để sử dụng
  const { id } = useParams()
  const [dataInput, setDataInput] = useState([]);
  const [errors, setErrors] = useState({});
  const [img, setImg] = useState([]);



  useEffect(() => {
    // Gọi API để lấy dữ liệu địa điểm hiện tại và gán vào dataInput
    getLocation(id)
      .then((response) => {
        console.log("Location by id", response);

        setDataInput(response);
      })
      .catch((error) => {
        console.log(error);
      });
      axios
      .get(`http://localhost:5158/api/LocationImage/${id}`)
      .then((s) => {
        setImg(s.data.data);
        return s.data.data;
      })
      .then((error) => console.log(error));


  }, []);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;


    setDataInput({
      ...dataInput,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  // Upload hinh
  const formData = new FormData();
  const handleFileChange = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      formData.append("files", e.target.files[i]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm(dataInput);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Gọi API để cập nhật location form
      updateLocation(id, dataInput)
      .then((response) => {
        // Xử lý thành công
        // return response.data.location_id;
      });
      
        // Upload hinh
          updateLocationImage(id,formData)
          .then((response) => {
            console.log("Image after Update:", response);

            // if (response.status === 200) {
              navigate(`/admin/location/detail/${id}`);
            // }
          })
          .catch((error) => console.log(error));
     
    

    // Tạm thời in ra console để kiểm tra dữ liệu được gửi đi
    console.log("Updated Location:", dataInput);

    // navigate(`/admin/location/detail`);
  };
  //chuyen trang
  const handleGetPageList = () => {
    navigate(`/admin/location`);
  };

  const validateForm = (dataInput) => {
    let errors = {};

    if (!dataInput.location_name) {
      errors.location_name = "Location Name is required";
    }

    if (!dataInput.description) {
      errors.description = "Description is required";
    }

    return errors;
  };

  return (
    <div className="container-fluid">
      <>
        <h2 className="text-center">Edit Location</h2>
        <button className="btn background-green text-white" onClick={() => { handleGetPageList(); }}> List</button>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3 mt-3">
            <label htmlFor="location_name" className="form-label w-100">
              Location Name:
            </label>
            <input
              type="text"
              className={`form-control ${errors.location_name ? "is-invalid" : ""}`}
              id="location_name"
              name="location_name"
              onChange={handleChangeInput}
              value={dataInput.location_name}
            />
            {errors.location_name && <div className="invalid-feedback">{errors.location_name}</div>}
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="description" className="form-label w-100">
              Description:
            </label>
            <input
              type="text"
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              id="description"
              name="description"
              onChange={handleChangeInput}
              value={dataInput.description}
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>
          {/* <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="status_Location"
              name="status_Location"
              onChange={handleChangeInput}
              checked={dataInput.status_Location}
            />
            <label className="form-check-label" htmlFor="status_Location">
              Status
            </label>
          </div> */}
          {/* <div className="form-group">
            <label htmlFor="status_Location">Status Location</label>
            <select
              className="form-control"
              id="status_Location"
              name='status_Location'
              value={dataInput.status_Location}
              onChange={handleChangeInput}
              required
            >
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          </div> */}
          <div className="mb-3 mt-3">
            <label for="status_Location" className="form-label w-100">
              Status:
            </label>
            <input type="text" className="form-control" id="status_Location" value={dataInput.status_Location + ""} name="status_Location" onChange={handleChangeInput} />
          </div>
          <div className="container-fluid ">
            <div class="container text-center my-3">
              <h2 class="font-weight-light pt-4">Old Photo</h2>
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
            </div>
          </div>
          {/* Upload hinh */}
          <div className="mb-3 mt-3">
            <label for="photoimg" className="form-label w-100">
              Change Photos
            </label>
            <input type="file" className="form-control" id="photoimg" onChange={handleFileChange} multiple />
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </>
    </div>
  );
}

export default EditLocationModel;
