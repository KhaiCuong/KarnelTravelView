import React, { useEffect, useState } from "react";

import "../Accommodation/css/Accommodation.css";
import { Room, ContentPaste } from "@mui/icons-material";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { getListTransport, getTransportByID } from "./Service/ApiService";
import { useShoppingCart } from "../Context/ShoppingCartContext";

function UserTransport() {
  const [Transport, setTransport] = useState([]);
  // const [accommodationImage, setAccommodationImages] = useState([]);
  const navigate = useNavigate();


  var today = new Date();
  const date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
  let times = {
    timeIn : date,
    timeOut : "09:00",

  }

  useEffect(() => {
    const fetchTransportData = async () => {
      try {
        const response = await getListTransport();
        if (response.status === 200) {
          setTransport(response.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchTransportData();
  }, []);

  // console.log("accommodationImage", accommodationImage);

  const handleDetailTransport = (id) => {
    navigate(`detail/${id}`);
  };

  
};

export default UserTransport;
