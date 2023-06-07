import axios from "axios";
import { useState } from "react";

const { useNavigate } = require("react-router-dom");

function Login(props) {
  const { checkLogin, setCheckLogin } = props;
  const initialState = {
    email: "",
    password: "",
  };
  const [dataLogin, setDataLogin] = useState(initialState);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5158/api/Auth/Login", dataLogin)
      .then((data) => {
        if (data.status === 200) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem(
            "userToken",
            JSON.stringify(data.data.userToken)
          );
          setCheckLogin(!checkLogin);
          console.log("data", data);
          // navigate("/admin");
          if (data.data.userToken.role === "Admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <section>
      <div className="bg-gradient-primary vh-100 justify-content-center align-items-center d-flex">
        <div className="container ">
          <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
              <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                  <div class="row">
                    <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div class="col-lg-6">
                      <div class="p-5">
                        <div class="text-center">
                          <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        </div>
                        <form
                          onSubmit={handleSubmit}
                          method="post"
                          class="user"
                        >
                          <div class="form-group">
                            <input
                              type="email"
                              class="form-control form-control-user"
                              id="email"
                              aria-describedby="emailHelp"
                              name="email"
                              value={dataLogin.email}
                              onChange={handleInputChange}
                              placeholder="Enter Email Address..."
                            />
                          </div>
                          <div class="form-group">
                            <input
                              type="password"
                              class="form-control form-control-user"
                              id="password"
                              name="password"
                              value={dataLogin.password}
                              onChange={handleInputChange}
                              placeholder="Password"
                            />
                          </div>
                          <div class="form-group">
                            <div class="custom-control custom-checkbox small">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="customCheck"
                              />
                              <label
                                class="custom-control-label"
                                for="customCheck"
                              >
                                Remember Me
                              </label>
                            </div>
                          </div>
                          <button class="btn btn-primary btn-user btn-block">
                            Login
                          </button>

                          <a
                            href="index.html"
                            class="btn btn-google btn-user btn-block"
                          >
                            <i class="fab fa-google fa-fw"></i> Login with
                            Google
                          </a>
                          <a
                            href="index.html"
                            class="btn btn-facebook btn-user btn-block"
                          >
                            <i class="fab fa-facebook-f fa-fw"></i> Login with
                            Facebook
                          </a>
                        </form>

                        <div class="text-center">
                          <a class="small" href="forgot-password.html">
                            Forgot Password?
                          </a>
                        </div>
                        <div class="text-center">
                          <a class="small" href="/register">
                            Create an Account!
                          </a>
                        </div>
                      </div>
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
export default Login;
