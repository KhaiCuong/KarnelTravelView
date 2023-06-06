import axios from "axios";
import { useState } from "react";

const { useNavigate } = require("react-router-dom");

function Register(props) {
  
  const initialState = {
    username: "",
    phonenumber:"",
    Address:"",
    password: "",
    email:"",
  };
  const navigate = useNavigate();
  const navigateRegister = () => {
    navigate("/Register");
  };

  const navigateDashboard = () => {
    navigate("/dashboard");
  };

  const [createUser, setRegisterUser] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCreateProduct({
      ...createProduct,
      [name]: value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5257/api/Product", createProduct, getToken())
      .then((data) => {
        console.log("data", data);
        if (data.status === 200) {
          navigateDashboard();
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div class="container mt-3">
      <h2>Create Product</h2>
      <div className="row">
        <div
          className="col-sm-3 p-3 bg-info text-white"
          style={{
            height: "200px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <button className="btn btn-primary" onClick={navigateDashboard}>
            List Product
          </button>
          <button className="btn btn-success" onClick={navigateCreate}>
            Create product
          </button>
          <button className="btn btn-warning">Update product</button>
        </div>
        <div className="col-sm-9 p-3 bg-success">
          <form onSubmit={handleCreate} method="post">
            <div className="mb-3 mt-3">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Name"
                name="name"
                value={createProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Price:</label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Enter price"
                name="price"
                value={createProduct.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stock">Stock:</label>
              <input
                type="number"
                className="form-control"
                id="stock"
                placeholder="Enter Stock"
                name="stock"
                value={createProduct.stock}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
