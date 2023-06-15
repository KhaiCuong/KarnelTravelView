import React, { useContext, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ModaBooking from "../User/Booking/ModalBooking";

import { Outlet } from "react-router-dom";
import ShoppingCartProvider from "../User/Context/ShoppingCartContext";
import SearchProvider from "../contexts/SearchContext";
// import CartProvider from "../User/Context/CartContext";

function MainLayout({ children }) {
  // const contextTour = useContext(TourContext);
  // const { itemTour } = contextTour;
  const [showModal, setShowModal] = useState(false);
  console.log("showModal", showModal);

  return (
    <>
      <ShoppingCartProvider>
        <SearchProvider>
          <ModaBooking setShowModal={setShowModal} showModal={showModal} />
          <div>
            <Header setShowModal={setShowModal} showModal={showModal} />

            <Outlet />

            <Footer />
          </div>
        </SearchProvider>
      </ShoppingCartProvider>
    </>
  );
}

export default MainLayout;
