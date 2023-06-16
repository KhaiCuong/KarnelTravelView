import GetUsers from "./Service/ApiServiceUser";
import axios from "axios";
import { useEffect, useState } from "react";
import ("./Login.css");
const { useNavigate } = require("react-router-dom");

function Register(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [emailUser, setEmailUser] = useState([]);

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

  // // Upload hinh
  // const handleFileChange = (e) => {
  //   for(var i = 0 ; i < e.target.files.length ; i++){
  //     formData.append("files", e.target.files[i]);
  //   }

  const handleSubmit = (e) => {
    e.preventDefault();
    //Validate form before call API to create
    const newErrors = validateForm(dataInput);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios
      .post("http://localhost:5158/api/User/addUser", data)
      .then((result) => {
        console.log(result.data);
        if (result.data.status === 201) {
          navigate("/login");
        }
        // return result.data.user_id;
      })

      .catch((err) => console.log(err));
  };

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
    } else if (Object.values(emailUser).includes(dataInput.email)) {
      errors.email = "Email already used!";
    }

    if (!dataInput.password) {
      errors.password = "password is required";
    } else if (dataInput.password.length < 6 || dataInput.password.length > 20) {
      errors.password = "Password must be between 6 - 20 characters";
    }

    return errors;
  };
  useEffect(() => {
    const fetchDataList = async () => {
      try {
        const listUser = await GetUsers();
     
         if(listUser.status === 200 ) {
          let arr = [];
          for(let i = 0 ; i < listUser.data.length ; i++) {
            arr[i] = listUser.data[i].email;
          }
          setEmailUser(arr);
         }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDataList();
  }, []);
  console.log("setEmailUser" , emailUser)

  return (
    <section>
      <div class="bg-gradient-primary  vh-100 justify-content-center align-items-center d-flex">
        <div class="container">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <div class="row">
                <div class="col-lg-6 d-none d-lg-block RegisterCss"></div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                    </div>
                    <form onSubmit={handleSubmit} class="user">
                      <div class="form-group row">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                          <input type="text" className={`form-control form-control-user ${errors.user_name ? "is-invalid" : ""}`} id="username" placeholder="user name" name="user_name" onChange={handleChangeInput} />
                          {errors.user_name && <div className="invalid-feedback">{errors.user_name}</div>}
                        </div>
                        <div class="col-sm-6">
                          <input type="text" className={`form-control form-control-user ${errors.phone_number ? "is-invalid" : ""}`} id="phonenumber" placeholder="phone number" name="phone_number" onChange={handleChangeInput} />
                          {errors.phone_number && <div className="invalid-feedback">{errors.phone_number}</div>}
                        </div>
                      </div>
                      <div class="form-group">
                        <input type="text" class="form-control form-control-user" id="address" placeholder=" Address" name="address" onChange={handleChangeInput} />
                      </div>
                      <div class="form-group">
                        <input type="email" className={`form-control form-control-user ${errors.email ? "is-invalid" : ""}`} id="email" placeholder="Email Address" name="email" onChange={handleChangeInput} />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                          <input type="password" className={`form-control form-control-user ${errors.password ? "is-invalid" : ""}`} id="password" placeholder="Password" name="password" onChange={handleChangeInput} />
                          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div class="col-sm-6">
                          <input hidden type="text" className={`form-control form-control-user ${errors.role ? "is-invalid" : ""}`} id="role" name="role" value={dataInput.role} onChange={handleChangeInput} />
                          {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                        </div>
                      </div>
                      <button class="btn btn-primary btn-user btn-block">Register Account</button>
                    </form>

                    {/* <div class="text-center">
                      <a class="small" href="forgot-password.html">
                        Forgot Password?
                      </a>
                    </div> */}
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
