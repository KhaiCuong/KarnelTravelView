import { React, useEffect, useState } from "react";
import "./header.css";
import { FlightOutlined, Cancel, Apps } from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ setShowModal, showModal }) => {
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
              <FlightOutlined className="icon" /> Karnel Travel{" "}
            </h1>
          </a>
        </div>

        <div className={active}>
          <ul className="navLists flex navbar-nav justify-content-end">
            <li className="navItem">
              <a href="">Home</a>
            </li>

            <li className="navItem">
              <Link to="/accommodation">Accommodation</Link>
            </li>

            <li className="navItem">
              <a href="">Shop</a>
            </li>

            <li className="navItem">
              <a href="">About</a>
            </li>

            <li className="navItem">
              <a href="">Pages</a>
            </li>

            <li className="navItem">
              <a href="">News</a>
            </li>

            <li className="navItem">
              <a href="" onClick={showModalCart}>
                Cart
              </a>
            </li>

            <li className="navItem">
              <a href="">Contacts</a>
            </li>
            {token == null ? (
              <button className="btn">
                <a href="/login">Login</a>
              </button>
            ) : (
              <>
                <li className="nav-item dropdown no-arrow w-10">
                  <a className="ml-3 nav-link dropdown-toggle d-flex justify-content-end w-90 align-items-center" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img className="img-profile rounded-circle " src="img/undraw_profile.svg" />
                    <i className="fa fa-angle-down"></i>
                  </a>

                  <div className="dropdown-menu menu-left" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                      Profile
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                      Settings
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
