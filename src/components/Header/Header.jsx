import { React, useEffect, useState } from "react";
import "./header.css";
import { FlightOutlined, Cancel, Apps } from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { height } from "@mui/system";
import { useShoppingCart } from "../User/Context/ShoppingCartContext";

const Header = ({ setShowModal, showModal }) => {
  const { openCart, cartQuantity } = useShoppingCart();

  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);
  const usertoken = JSON.parse(localStorage.getItem("userToken"));

  const token = localStorage.getItem("token");
  console.log("token", token);
  const navigate = useNavigate();
  const [active, setActive] = useState("navBar");

  //handle show navigation toggle navbar
  const showNavigation = () => {
    // Cập nhật lại giá trị active add class navBar + activeNavbar
    setActive("navBar activeNavbar");
  };

  const showModalCart = (e) => {
    e.preventDefault();
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  // remove navbar
  const closeNavbar = () => {
    // update class navBar
    setActive("navBar");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");

    // setUserInfo(null);
    navigate("/");
  };

  return (
    <section className="navbarSection">
      <header className="header flex">
        <div className="logoDiv">
          <a href="" className="logo flex">
            <h1>
              <FlightOutlined className="icon" /> Karnel Travel
            </h1>
          </a>
        </div>

        <div className={active}>
          <ul className="navLists flex navbar-nav justify-content-end">
            <li className="navItem">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item dropdown no-arrow pl-4 ">
              <a className="nav-link dropdown-toggle d-flex justify-content-end w-90 align-items-center" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="">
                  <a href="">Information</a>
                </div>
              </a>

              <div className="dropdown-menu menu-left" aria-labelledby="userDropdown">
                <a className="dropdown-item" href="/accommodation">
                  <i class="fas fa-home mr-2 text-secondary"> </i>
                  <Link to="/accommodation">Accommodation</Link>
                </a>
                <a className="dropdown-item" href="/restaurant">
                  <i class="fas fa-utensils mr-2 text-secondary"></i>
                  <Link to="/restaurant"> Restaurant</Link>
                </a>
                <a className="dropdown-item" href="/tourist-spot">
                  <i class="fas fa-map-marked mr-2 text-secondary"></i>
                  <Link to="/tourist-spot">Tourist Spot</Link>
                </a>
                <a className="dropdown-item" href="/usertransport">
                  <i class="fas fa-car-side mr-2 text-secondary"></i>
                  <Link to="/usertransport">Transport</Link>
                </a>
                <a className="dropdown-item" href="/usertransport">
                  <i class="fas fa-plane-departure mr-2 text-secondary"></i>
                  <Link to="/usertransport">Tours</Link>
                </a>
              </div>
            </li>
            {/* <li className="navItem">
              <Link to="/accommodation">Accommodation</Link>
            </li>

            <li className="navItem">
            <Link to="/restaurant">Restaurant</Link>
              
            </li>

            <li className="navItem">
            <Link to ="/usertransport">Transport</Link>
            </li> */}

            <li className="navItem">
              <a href="">About</a>
            </li>
            <li className="navItem dropdown no-arrow pl-4">
              <a className="nav-link dropdown-toggle d-flex justify-content-end w-90 align-items-center" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="">
                  <a href="">Contact</a>
                </div>
              </a>

              <div className="dropdown-menu menu-left" aria-labelledby="userDropdown">
                <a className="dropdown-item " href="/contact">
                  <i class="fas fa-address-card mr-2 text-secondary"></i>
                  <Link to="/contact">Contact</Link>
                </a>
                <a className="dropdown-item" href="/feedback">
                  <i class="fas fa-comments mr-2 text-secondary"></i> 
                  <Link to="/feedback">Feedback</Link>
                </a>
              </div>
            </li>
            {token == null ? (
              <li className="navItem  w-10">
                <a href="/login">Account</a>
              </li>
            ) : (
              <>
                <li className="nav-item dropdown no-arrow w-10 ">
                  <a className="  nav-link dropdown-toggle d-flex justify-content-end w-90 align-items-center" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img className="img-profile rounded-circle w-30 " src="/img/undraw_profile.svg" />
                    <div className="ml-1">
                      <a href="">Account</a>
                    </div>
                    {/* <i className="fa fa-angle-down"></i> */}
                  </a>

                  <div className="dropdown-menu menu-left" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                      Profile
                    </a>
                    <a className="dropdown-item" href="/my-booking">
                      <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                      My Booking
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                      Activity Log
                    </a>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={handleLogout} data-toggle="modal" data-target="#logoutModal">
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Logout
                    </button>
                  </div>
                </li>
              </>
            )}
            <li className="navItem border-start  border-dark ml-2">
              {/* <a href=""  className="btn text-white ">
                Cart
              </a> */}
              <button style={{ width: "2rem", height: "2rem", position: "relative" }} variant="outline-primary" className="rounded-circle" onClick={showModalCart}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                  <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                </svg>

                <div
                  className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                  style={{
                    color: "white",
                    width: "1.5rem",
                    height: "1.5rem",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    transform: "translate(25%, 25%)",
                  }}
                >
                  {cartQuantity}
                </div>
              </button>
            </li>
          </ul>
          <div onClick={closeNavbar} className="closeNavbar">
            <Cancel className="icon" />
          </div>
        </div>
        <div onClick={showNavigation} className="toggleNavbar">
          <Apps className="icon" />
        </div>
      </header>
    </section>
  );
};

export default Header;
