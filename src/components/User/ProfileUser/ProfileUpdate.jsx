import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ProfileUpdate() {
  const navigate = useNavigate();
//   const [img, setImg] = useState([]);
  const [spot, setSpot] = useState([]);
  const { id } = useParams();

  const handleBack = () => {
    navigate(`/profileuser/detail/${id}`);
  };

  const initialState = {
    username: "",
    phonenumber: "",
    Address: "",
    password: "",
    email: "",
    role: "User",
  };

  const [dataInput, setDataInput] = useState(initialState);
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
  // Upload hinh
//   const handleFileChange = (e) => {
//     for (var i = 0; i < e.target.files.length; i++) {
//       formData.append("files", e.target.files[i]);
//     }
//   };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5158/api/User/UpdateUser/${id}`, data)
      .then((result) => {
        console.log(result.data);
        return result.data.data.user_id;
      })
    //   .then((id) => {
    //     // Upload hinh
    //     axios
    //       .post(`http://localhost:5158/api/TouristSpotImage/UpdateImageById/${id}`, formData)
    //       .then((result) => {
    //         if (result.status === 200) {
    //           navigate("/admin/tourist-spot");
    //         }
    //       })
    //       .catch((err) => console.log(err));
    //   })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5158/api/User/GetUser/${id}`)
      .then((t) => {
        setSpot(t.data.data);
      })
      .then((error) => console.log(error));

    // axios
    //   .get(`http://localhost:5158/api/TouristSpotImage/GetImagesByTouristSpotId/${id}`)
    //   .then((s) => {
    //     setImg(s.data.data);
    //     return s.data.data;
    //   })
    //   .then((error) => console.log(error));
  }, []);

  // Validate message
  const validateForm = (dataInput) => {
    let errors = {};

    if (!dataInput.user_name) {
      errors.user_name = "User Name is required";
    } else if (dataInput.user_name.length < 3 || dataInput.user_name.length > 30) {
      errors.user_name = "User Name must be between 3 - 30 characters";
    }

    if (!dataInput.phone_number) {
      errors.phone_number = "Phone Number is required";
    }
    if (!dataInput.email) {
      errors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(dataInput.email)) {
      errors.email = "Invalid email format";
    }

    if (!dataInput.role) {
      errors.role = "Role is required. Please enter Admin/User";
    }

    if (!dataInput.total_payment) {
      errors.total_payment = "Total_payment is required";
    }
    if (!dataInput.password) {
      errors.password = "password is required";
    } else if (dataInput.password.length < 6 || dataInput.password.length > 20) {
      errors.password = "Password must be between 6 - 20 characters";
    }

    return errors;
};

return (
    <section className="min-vh-100">
      <div class="bg-gradient-primary  vh-100 justify-content-center align-items-center d-flex">
        <div class="container">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <div class="row">
                <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                <div class="col-lg-7">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Update Account!</h1>
                    </div>
                    <form onSubmit={handleSubmit} class="user">
                      <div class="form-group row">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="text"
                            className={`form-control form-control-user ${errors.user_name ? "is-invalid" : ""}`}
                            id="username"
                            placeholder="user name"
                            name="user_name"
                            onChange={handleChangeInput}
                          />
                          {errors.user_name && <div className="invalid-feedback">{errors.user_name}</div>}

                        </div>
                        <div class="col-sm-6">
                          <input
                            type="text"
                            className={`form-control form-control-user ${errors.phone_number ? "is-invalid" : ""}`}
                            id="phonenumber"
                            placeholder="phone number"
                            name="phone_number"
                            onChange={handleChangeInput}
                          />
                          {errors.phone_number && <div className="invalid-feedback">{errors.phone_number}</div>}
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
                          className={`form-control form-control-user ${errors.email ? "is-invalid" : ""}`}
                          id="email"
                          placeholder="Email Address"
                          name="email"
                          onChange={handleChangeInput}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="password"
                            className={`form-control form-control-user ${errors.password ? "is-invalid" : ""}`}
                            id="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChangeInput}
                          />
                          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div class="col-sm-6">
                          <input hidden
                            type="text"
                            className={`form-control form-control-user ${errors.role ? "is-invalid" : ""}`}
                            id="role"
                            name="role"
                            value={dataInput.role}
                            onChange={handleChangeInput}
                          />
                          {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                        </div>
                      </div>
                      <button class="btn btn-primary btn-user btn-block">
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

export default ProfileUpdate;
