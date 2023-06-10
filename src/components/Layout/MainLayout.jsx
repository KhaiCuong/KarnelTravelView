import React, { useContext, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ModaBooking from "../User/Booking/ModalBooking";

import { Outlet } from "react-router-dom";
import { TourContext } from "../Admin/contexts/TourContext";
import CartProvider from "../User/Context/CartContext";

function MainLayout({ children }) {
  // const contextTour = useContext(TourContext);
  // const { itemTour } = contextTour;
  const [showModal, setShowModal] = useState(false);
  console.log("showModal", showModal);

  return (
    <>
      <CartProvider>
        <ModaBooking setShowModal={setShowModal} showModal={showModal} />
        <div>
          <Header setShowModal={setShowModal} showModal={showModal} />

          <Outlet />

          <Footer />
        </div>
      </CartProvider>
    </>
  );
}

export default MainLayout;
