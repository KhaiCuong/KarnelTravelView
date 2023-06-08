import axios from "axios";
import { useState } from "react";

const { useNavigate } = require("react-router-dom");

function Register(props) {
  const navigate = useNavigate();

  const initialState = {
    username: "",
    phonenumber: "",
    Address: "",
    password: "",
    email: "",
    role: "User",
  };

  const [dataInput, setDataInput] = useState(initialState);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setDataInput({
      ...dataInput,
      [name]: value,
    });
  };

  var data = {
    user_id: dataInput.user_id,
    user_name: dataInput.user_name,
    status_User: dataInput.status_User === "true" ? true : false,
    phone_number: dataInput.phone_number,
    address: dataInput.address,
    role: dataInput.role,
    total_payment: dataInput.total_payment,
    charge_card: dataInput.charge_card,
    email: dataInput.email,
    password: dataInput.password,
  };

  const formData = new FormData();

  // // Upload hinh
  // const handleFileChange = (e) => {
  //   for(var i = 0 ; i < e.target.files.length ; i++){
  //     formData.append("files", e.target.files[i]);
  //   }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5158/api/User/addUser", data)
      .then((result) => {
        console.log(result.data);
        if(result.data.status===201){
          navigate("/");
        }
        // return result.data.user_id;
      })
      // .then((id) => {
      //     // Upload hinh
      //   axios
      //     .post(`http://localhost:5158/api/TouristSpotImage/PostImages?TouristSpot_Id=${id}`, formData )
      //     .then((result) => {
      //       if (result.status === 200) {
      //         navigate("/admin/tourist-spot");
      //       }
      //     })
      //     .catch((err) => console.log(err));
      // })
      .catch((err) => console.log(err));
  };

  return (
    <section>
      <div class="bg-gradient-primary  vh-100 justify-content-center align-items-center d-flex">
        <div class="container">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <div class="row">
                <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                <div class="col-lg-7">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                    </div>
                    <form onSubmit={handleSubmit} class="user">
                      <div class="form-group row">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="text"
                            class="form-control form-control-user"
                            id="username"
                            placeholder="user name"
                            name="user_name"
                            onChange={handleChangeInput}
                          />
                        </div>
                        <div class="col-sm-6">
                          <input
                            type="text"
                            class="form-control form-control-user"
                            id="phonenumber"
                            placeholder="phone number"
                            name="phone_number"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control form-control-user"
                          id="address"
                          placeholder=" Address"
                          name="address"
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control form-control-user"
                          id="email"
                          placeholder="Email Address"
                          name="email"
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="password"
                            class="form-control form-control-user"
                            id="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChangeInput}
                          />
                        </div>
                        <div class="col-sm-6">
                        <input hidden
                          type="text"
                          class="form-control form-control-user"
                          id="role"
                          name="role"
                          value={dataInput.role}
                          onChange={handleChangeInput}
                        />
                      </div>
                      </div>
                      <button  class="btn btn-primary btn-user btn-block">
                        Register Account
                      </button>

                      <a
                        href="index.html"
                        class="btn btn-google btn-user btn-block"
                      >
                        <i class="fab fa-google fa-fw"></i> Register with Google
                      </a>
                      <a
                        href="index.html"
                        class="btn btn-facebook btn-user btn-block"
                      >
                        <i class="fab fa-facebook-f fa-fw"></i> Register with
                        Facebook
                      </a>
                    </form>

                    <div class="text-center">
                      <a class="small" href="forgot-password.html">
                        Forgot Password?
                      </a>
                    </div>
                    <div class="text-center">
                      <a class="small" href="/login">
                        Already have an account? Login!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

        <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

        <script src="js/sb-admin-2.min.js"></script>
      </div>
    </section>
  );
}

export default Register;
