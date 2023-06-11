import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";




function CreateLocation() {
  const navigate = useNavigate();
  const initalValue = {
    location_id: "",
    location_name: "",
    description: "",
    status_Location: false,
  };
  const [dataInput, setDataInput] = useState(initalValue);
  const [errors, setErrors] = useState({});


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

  var data = {
    location_id: dataInput.location_id,
    location_name: dataInput.location_name,
    status_Location: dataInput.status_Location === "true" ? true : false,
    description: dataInput.description,
  };

  const formData = new FormData();

  // Upload hinh
  const handleFileChange = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      formData.append("files", e.target.files[i]);
    }

  };
  //chuyen trang
  const handleGetPageList = () => {
    navigate(`/admin/location`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //kiem tra loi truoc khi nhap
    const newErrors = validateForm(dataInput);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    axios
      .post("http://localhost:5158/api/Location", data)
      .then((result) => {
        console.log(result.data)
        return result.data.location_id;
      })
      .then((location_id) => {
        // Upload hinh
        axios
          .post(`http://localhost:5158/api/LocationImage?Location_id=${dataInput.location_id}`, formData)
          .then((result) => {
            console.log("result", result)
            if (result.data.status === 200) {
              navigate(`/admin/location`);

            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const validateForm = (dataInput) => {
    let errors = {};

    if (!dataInput.location_id) {
      errors.location_id = "Location ID is required";
    }

    if (!dataInput.location_name) {
      errors.location_name = "Location Name is required";
    }

    if (!dataInput.description) {
      errors.description = "Description is required";
    }

    if (!dataInput.status_Location) {
      errors.status_Location = "Status is required";
    }

    return errors;
  };

  return (
    <div className="container-fluid ">
      <>
        <h2 className="text-center">Create a new Location</h2>
        <button className="btn background-green text-white" onClick={() => { handleGetPageList(); }}> List</button>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3 mt-3">
            <label htmlFor="location_id" className="form-label w-100">
              location id :
            </label>
            <input
              type="text"
              className={`form-control ${errors.location_id ? "is-invalid" : ""}`}
              placeholder="Enter Location Id"
              id="location_id"
              name="location_id"
              onChange={handleChangeInput}
              value={dataInput.location_id}
            />
            {errors.location_id && <div className="invalid-feedback">{errors.location_id}</div>}
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="location_name" className="form-label w-100">
              location_name
            </label>
            <input
              type="text"
              className={`form-control ${errors.location_name ? "is-invalid" : ""}`}
              id="location_name"
              placeholder="Enter location Name"
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
              placeholder="Enter Location description"
              id="description"
              name="description"
              onChange={handleChangeInput}
              value={dataInput.description}
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="status_Location" className="form-label w-100">
              Status:
            </label>
            <input
              type="text"
              className={`form-control ${errors.status_Location ? "is-invalid" : ""}`}
              id="status_Location"
              placeholder="Enter true/false"
              name="status_Location"
              onChange={handleChangeInput}
            // value={dataInput.status_Location}
            />
            {errors.status_Location && <div className="invalid-feedback">{errors.status_Location}</div>}
          </div>

          {/* Upload hinh */}
          <div className="mb-3 mt-3">
            <label htmlFor="photo" className="form-label w-100">
              Photo
            </label>
            <input type="file" id="photo" onChange={handleFileChange} multiple />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    </div>
  );
}

export default CreateLocation;