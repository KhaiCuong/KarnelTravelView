import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTouristSpot() {
  const navigate = useNavigate();

  const initalValue = {
    touristSpot_id: "",
    touristSpot_name: "",
    activities: "",
    description: null,
    price: "",
    status_TouristSpot: false,
    discount: null,
    location_id: "",
  };

  const [dataInput, setDataInput] = useState(initalValue);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setDataInput({
      ...dataInput,
      [name]: value,
    });
  };

  var data = {
    touristSpot_id: dataInput.touristSpot_id,
    touristSpot_name: dataInput.touristSpot_name,
    status_TouristSpot: dataInput.status_TouristSpot === "true" ? true : false,
    discount: dataInput.discount,
    price: dataInput.price,
    description: dataInput.description,
    activities: dataInput.activities,
    location_id: dataInput.location_id,
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
      .post("http://localhost:5158/api/TouristSpot/AddTouristSpot", data)
      .then((result) => {
        console.log(result.data);
        return result.data.touristSpot_id;
      })
      .then((id) => {
        // Upload hinh
        axios
          .post(
            `http://localhost:5158/api/TouristSpotImage/PostImages?TouristSpot_Id=${id}`,
            formData
          )
          .then((result) => {
            if (result.status === 200) {
              navigate("/admin/tourist-spot");
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid ">
      <>
        <h2 className="text-center">Create a new Tour</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3 mt-3">
            <label for="touristSpot_id" className="form-label w-100">
              touristSpot_id :
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Tour Id"
              id="touristSpot_id"
              name="touristSpot_id"
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3 mt-3">
            <label for="touristSpot_name" className="form-label w-100">
              touristSpot_name
            </label>
            <input
              type="text"
              className="form-control"
              id="touristSpot_name"
              placeholder="Enter Tour Name"
              name="touristSpot_name"
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3 mt-3">
            <label for="status_TouristSpot" className="form-label w-100">
              Status:
            </label>
            <input
              type="text"
              className="form-control"
              id="status_TouristSpot"
              placeholder="Enter Tour Status"
              name="status_TouristSpot"
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3 mt-3">
            <label for="discount" className="form-label w-100">
              Discount:
            </label>
            <input
              type="number"
              className="form-control"
              id="discount"
              placeholder="Enter Tour discount"
              name="discount"
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3 mt-3">
            <label for="activities" className="form-label w-100">
              activities
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Tour description"
              id="activities"
              name="activities"
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3 mt-3">
            <label for="price" className="form-label w-100">
              Price:
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Enter Tour price"
              name="price"
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3 mt-3">
            <label for="description" className="form-label w-100">
              Description:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Tour description"
              id="description"
              name="description"
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3 mt-3">
            <label for="location_id" className="form-label w-100">
              location_id:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Tour description"
              id="location_id"
              name="location_id"
              onChange={handleChangeInput}
            />
          </div>

          {/* Upload hinh */}
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
      </>
    </div>
  );
}

export default CreateTouristSpot;
